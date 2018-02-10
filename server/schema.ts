import { makeExecutableSchema } from 'graphql-tools';
import { Person } from './models/models';
import * as R from 'ramda';
import { displayPartsToString } from 'typescript';

const schema = `
type Person {
  id: Int
  firstName: String
  lastName: String
  parents: [Person]
  siblings: [Person]
  children: [Person]
}

type Query {
  getPeople: [Person]
  getPerson(id: Int!): Person
}

schema {
  query: Query
}
`;

const idFor = (x) => x.id;
const idsFor = R.map(idFor);
const distinct = <T extends { id: number }>(x: T[]) => x.filter((value, index, self) => idsFor(self).indexOf(idFor(value)) === index);
const exclude = <T extends { id: number }>(x: T, y: T[]) => y.filter((value) => value.id !== x.id);
const findParents = <T extends { id: number }>(context, person: T) => context.Person.findParents(person.id);
const getChildrenForParents = async <T extends { id: number }>(context, parents: T[]) => {
  const children = R.flatten(await Promise.all(parents.map((parent) => context.Person.findChildren(parent.id))));
  return distinct(children);
};

const resolvers = {
  Person: {
    parents(person, args, context) {
      return findParents(context, person);
    },
    children(person, args, context) {
      return context.Person.findChildren(person.id);
    },
    async siblings(person, args, context) {
      const parents = await findParents(context, person);
      const parentsChildren = await getChildrenForParents(context, parents);
      return exclude(person, parentsChildren);
    }
  },
  Query: {
    getPeople(_, args, context) {
      return context.Person.findAll();
    },
    getPerson(_, { id }, context) {
      return context.Person.findById(id);
    },
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers,
});

export default executableSchema;

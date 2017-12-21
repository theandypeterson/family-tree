import { makeExecutableSchema } from 'graphql-tools';

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

const resolvers = {
  Person: {
    parents(person, args, context) {
      return context.Person.findParents(person.id);
    },
    children(person, args, context) {
      return context.Person.findChildren(person.id);
    },
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

import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = `
scalar JSON

type Person {
  id: Int
  firstName: String
  lastName: String
  parents: [Person]
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

const rootResolvers = {
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

const schema = [rootSchema];
const resolvers = rootResolvers;
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;

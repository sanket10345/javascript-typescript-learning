const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// --- Forward declarations for circular type references ---
let UserType;
let CompanyType;

// Company GraphQL type
CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      // Fetch all users associated with this company
      resolve: ({ id }) =>
        axios.get(`http://localhost:3000/users?companyId=${id}`)
          .then(res => res.data),
    }
  })
});

// User GraphQL type
UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      // Fetch the company for this user
      resolve: ({ companyId }) =>
        axios.get(`http://localhost:3000/companies/${companyId}`)
          .then(res => res.data),
    }
  })
});

// Root Query for GraphQL
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Fetch user by ID
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (_, { id }) =>
        axios.get(`http://localhost:3000/users/${id}`)
          .then(res => res.data),
    },
    // Fetch company by ID
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (_, { id }) =>
        axios.get(`http://localhost:3000/companies/${id}`)
          .then(res => res.data),
    }
  }
});

// Mutations for User (add, delete, edit)
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a new user
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: (_, { firstName, age, companyId }) =>
        axios.post('http://localhost:3000/users', { firstName, age, companyId })
          .then(res => res.data),
    },
    // Delete a user
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { id }) =>
        axios.delete(`http://localhost:3000/users/${id}`)
          .then(res => res.data),
    },
    // Edit a user
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: (_, args) =>
        axios.patch(`http://localhost:3000/users/${args.id}`, args)
          .then(res => res.data),
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

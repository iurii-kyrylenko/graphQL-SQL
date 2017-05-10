const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql')

const {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  // connectionFromPromisedArraySlice,
  mutationWithClientMutationId
} = require('graphql-relay')

const {
  getUsers,
  getUsersCountPromised
} = require('../data/resolvers')

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'User Id'
    },
    name: {
      type: GraphQLString,
      description: 'User name'
    }
  })
})

const { connectionType: userConnection } = connectionDefinitions({
  name: 'User',
  nodeType: userType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'The total count of users',
      resolve: () => getUsersCountPromised()
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: userConnection,
      description: 'Users',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getUsers(), args)
      // resolve: (_, args) => connectionFromPromisedArraySlice(getUsers(), args, {sliceStart: 0, arrayLength: 24})
    }
  })
})

const Schema = new GraphQLSchema({
  query: queryType
})

module.exports = Schema

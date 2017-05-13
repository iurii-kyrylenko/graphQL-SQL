const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql')

const {
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} = require('graphql-relay')

const {
  getUsers,
  getUsersCountPromised,
  getUserPromised,
  getStories,
  getUserStories
} = require('../data/model')

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'User name'
    },
    stories: {
      type: storyConnection,
      description: 'User stories',
      args: connectionArgs,
      resolve: ({ id }, args) => connectionFromPromisedArray(getUserStories(id), args)
    }
  })
})

const storyType = new GraphQLObjectType({
  name: 'Story',
  description: 'Story',
  fields: () => ({
    id: globalIdField('Story'),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Story content'
    },
    author: {
      type: userType,
      description: 'Story author',
      resolve: ({ author }) => getUserPromised(author)
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

const { connectionType: storyConnection } = connectionDefinitions({
  name: 'Story', nodeType: storyType
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: userConnection,
      description: 'Users',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getUsers(), args)
    },
    stories: {
      type: storyConnection,
      description: 'Stories',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getStories(), args)
    }
  })
})

const Schema = new GraphQLSchema({
  query: queryType
})

module.exports = Schema

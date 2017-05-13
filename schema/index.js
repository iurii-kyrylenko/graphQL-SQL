const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql')

const {
  globalIdField,
  fromGlobalId,
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
  getUserStories,
  addUserPromised,
  updateUserPromised,
  deleteUserPromised,
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

const addUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: ({ userLocalId }) => getUserPromised(userLocalId)
    }
  },
  mutateAndGetPayload: ({ name }) => addUserPromised(name, 'userLocalId')
})

const updateUserMutation = mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: ({ userLocalId }) => getUserPromised(userLocalId)
    }
  },
  mutateAndGetPayload: ({ id, name }) => {
    const userLocalId = fromGlobalId(id).id
    return updateUserPromised(userLocalId, name, 'userLocalId')
  }
})

const deleteUserMutation = {
  type: GraphQLID,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: (_, { id }) => {
    const userLocalId = fromGlobalId(id).id
    return deleteUserPromised(userLocalId, id)
  }
}

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: addUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation
  })
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

module.exports = Schema

const db = require('./index')

const getUsers = () => {
  return db('users')
}

const getUsersCount = () => {
  return db('users').count('id as count')
}

const getUsersCountPromised = () => {
  return getUsersCount().then(([{ count }]) => count)
}

const getUser = (id) => {
  return db('users').where('id', id).first()
}

const getUserPromised = (id) => {
  return getUser(id).then(user => user)
}

const getStories = () => {
  return db('stories')
}

const getUserStories = (userId) => {
  return db('stories').where('author', userId)
}

const addUser = (name) => {
  return db('users').insert({ name })
}

const addUserPromised = (name, key) => {
  return addUser(name).then(([id]) => ({ [key]: id }))
}

const updateUser = (id, name) => {
  return db('users').where('id', id).update({ name })
}

const updateUserPromised = (id, name, key) => {
  return updateUser(id, name).then(() => ({ [key]: id }))
}

const deleteUser = (id) => {
  return db('users').where('id', id).del()
}

const deleteUserPromised = (id, payload) => {
  return deleteUser(id).then(() => payload)
}

module.exports = {
  getUsers,
  getUsersCountPromised,
  getUserPromised,
  getStories,
  getUserStories,
  addUserPromised,
  updateUserPromised,
  deleteUserPromised,
}

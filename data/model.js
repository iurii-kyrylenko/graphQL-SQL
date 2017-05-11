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

module.exports = {
  getUsers,
  getUsersCountPromised
}

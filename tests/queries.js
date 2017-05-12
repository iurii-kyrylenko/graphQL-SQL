const db = require('../data')

// const query = db('users').offset(8).limit(4)

// const query = db('users').where('id', 1).first()

const query = db('stories').where('author', 1)

query.then(res => {
  console.log(res)
})

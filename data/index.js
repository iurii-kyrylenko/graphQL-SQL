const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: { filename: './db.sqlite3' }
})

module.exports = db

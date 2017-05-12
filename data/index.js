const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: { filename: './db.sqlite3' },
  useNullAsDefault: true
})

module.exports = db

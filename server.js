const express = require('express')
const graphqlHttp = require('express-graphql')
const schema = require('./schema')

const app = express()
app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))
app.listen(3000)
console.log('Running a GraphQL API server at localhost:3000/graphql')

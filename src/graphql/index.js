import { pluck } from 'ramda'
import { makeExecutableSchema } from 'apollo-server-lambda'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import modules from './modules'

const allTypeDefs = pluck('typeDefs')(modules)
const allResolvers = pluck('resolvers')(modules)

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypeDefs),
  resolvers: mergeResolvers(allResolvers),
})

export default schema

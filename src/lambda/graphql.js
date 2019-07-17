import { ApolloServer } from 'apollo-server-lambda'
import schema from '../graphql'

const server = new ApolloServer({ schema })

const handler = server.createHandler()

export { handler }

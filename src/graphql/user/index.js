import crypto from 'crypto'
import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String!
  }
`

const resolvers = {
  User: {
    avatarUrl: parent => {
      const email = parent.email.toLowerCase()

      const hash = crypto
        .createHash('md5')
        .update(email)
        .digest('hex')

      return `https://www.gravatar.com/avatar/${hash}`
    },
  },
}

export { resolvers, typeDefs }

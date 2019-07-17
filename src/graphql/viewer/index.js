import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  type Query {
    viewer: User!
  }
`

const resolvers = {
  Query: {
    viewer: () => {
      // const loggedUserId = context.user.id
      // return knex('User').select('*').where({ id: loggedUserId })
      return {
        id: '10',
        name: 'Josmar',
        email: 'josmarnet@gmail.com',
      }
    },
  },
}

export { resolvers, typeDefs }

import { gql } from 'apollo-server-lambda'
import { Dish } from '../../data/model'

const typeDefs = gql`
  type Query {
    dishes: [Dish!]!
  }

  type Dish {
    id: ID!
    name: String!
    category: String!
    imageUrl: String!
    description: String!
  }
`
const resolvers = {
  Query: {
    dishes: async () => {
      const dishes = Dish()
      return dishes
    },
  },
}

export { resolvers, typeDefs }

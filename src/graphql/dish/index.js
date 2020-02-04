import { gql } from 'apollo-server-lambda'
import { Dish } from '../../data/model'
import { createCursor, parseCursor } from '../../utils/cursor'

const typeDefs = gql`
  type Query {
    dishes(after: String, first: Int!, orderBy: DishOrder): DishConnection
  }

  enum DishOrderField {
    NAME
    CREATED_AT
  }

  enum OrderDirection {
    ASC
    DESC
  }

  input DishOrder {
    field: DishOrderField!
    direction: OrderDirection!
  }

  type PageInfo {
    # hasPreviousPage: String!
    hasNextPage: String!
    startCursor: String!
    endCursor: String!
  }

  type DishConnection {
    edges: [DishEdge!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type DishEdge {
    cursor: String!
    node: Dish!
  }

  type Dish {
    id: ID!
    name: String!
    category: String!
    imageUrl: String!
    description: String!
  }
`

const defaultOrderBy = { field: 'CREATED_AT', direction: 'DESC' }

const orderByFieldToColumn = {
  CREATED_AT: 'createdAt',
  NAME: 'name',
}

const resolvers = {
  Query: {
    dishes: async (_, args) => {
      const { after, first, category, orderBy: _orderBy = defaultOrderBy } = args

      const orderBy = {
        ..._orderBy,
        field: orderByFieldToColumn[_orderBy.field],
      }

      const queryset = Dish()
        .pluck('id')
        .limit(first + 1)
        .orderBy([
          { column: orderBy.field, order: orderBy.direction },
          { column: '_serial', order: 'ASC' },
        ])

      if (after) {
        const operator = { ASC: '>', DESC: '<' }
        const [field, serial] = parseCursor(after)

        queryset.where(orderBy.field, operator[orderBy.direction], field)

        queryset.orWhere(build => {
          build.andWhere(orderBy.field, field)
          build.andWhere('_serial', '>', serial)
        })
      }

      if (category) {
        queryset.andWhere({ category })
      }

      const disheIds = await queryset

      // FIXME: use dataloader instead
      const dishes = await Dish()
        .whereIn('id', disheIds)
        .orderByRaw(`array_position(array[${disheIds.map(() => '?')}], id)`, disheIds)

      return {
        args: { after, first, category, orderBy },
        data: dishes,
      }
    },
  },
  DishConnection: {
    totalCount: async parent => {
      const {
        args: { category },
      } = parent

      const queryset = Dish()
        .first()
        .count()

      if (category) {
        queryset.andWhere({ category })
      }

      const { count: totalCount } = await queryset

      return totalCount
    },
    pageInfo: async parent => {
      const {
        data,
        args: { first, orderBy },
      } = parent

      const firstNode = data[0]
      const lastNode = data[first - 1] || data[data.length - 1]

      return {
        hasNextPage: data.length > first,
        startCursor: createCursor(firstNode[orderBy.field], firstNode._serial),
        endCursor: createCursor(lastNode[orderBy.field], lastNode._serial),
      }
    },
    edges: async parent => {
      const {
        data,
        args: { first, orderBy },
      } = parent

      return data.slice(0, first).map(node => ({
        cursor: createCursor(node[orderBy.field], node._serial),
        node,
      }))
    },
  },
}

export { resolvers, typeDefs }

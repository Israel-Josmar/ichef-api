import knexClient from '../../../knex/client'

const buildModelCreator = tableName => {
  const modelCreator = () => knexClient(tableName)
  modelCreator.tableName = tableName
  return modelCreator
}

export const Dish = buildModelCreator('dish')

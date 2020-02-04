const faker = require('faker')

exports.seed = async knex => {
  faker.seed(123)

  const fakeDishes = new Array(1000).fill(null).map(() => ({
    id: faker.random.uuid(),
    name: faker.lorem.sentence(),
    category: faker.commerce.department(),
    imageUrl: faker.image.food(),
    description: faker.lorem.sentences(),
  }))

  await knex('dish').insert(fakeDishes)
}

exports.seed = async knex => {
  await knex('dish').del()
}

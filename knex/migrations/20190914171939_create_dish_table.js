exports.up = async knex => {
  await knex.schema.createTable('dish', t => {
    t.text('id').primary()

    t.text('name').notNull()
    t.text('category').notNull()
    t.text('imageUrl').notNull()
    t.text('description').notNull()

    t.specificType('_serial', 'SERIAL')
    t.datetime('createdAt', { precision: 3 }).defaultTo(knex.fn.now())
    t.datetime('updatedAt', { precision: 3 }).defaultTo(knex.fn.now())
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('dish')
}

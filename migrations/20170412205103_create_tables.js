exports.up = async function(knex, Promise) {
  await knex.schema.createTable('persons', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
  });

  await knex.schema.createTable('parental_relationships', table => {
    table.increments();
    table.integer('child_id').notNullable();
    table.foreign('child_id').references('id').inTable('persons');
    table.integer('parent_id').notNullable();
    table.foreign('parent_id').references('id').inTable('persons');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('parental_relationships');
  await knex.schema.dropTable('persons');
};

import * as knexCleaner from 'knex-cleaner';

const cleanTables = (knex) => {
  return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
    .catch((error) => console.log('ERROR: Failed to clean database', error));
};

const people = [
  {
    id: 1,
    first_name: 'Mary',
    last_name: 'Smith',
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Smith',
  },
  {
    id: 3,
    first_name: 'Carol',
    last_name: 'Smith',
  },
];

const relationships = [
  {
    child_id: 1,
    parent_id: 2,
  },
  {
    child_id: 1,
    parent_id: 3,
  }
];

const seed = async (knex) => {
  await cleanTables(knex);
  await knex('persons').insert(people);
  await knex('parental_relationships').insert(relationships);
};

export { seed };

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
  {
    id: 4,
    first_name: 'Jimbo',
    last_name: 'Smith',
  },
  {
    id: 5,
    first_name: 'Karl',
    last_name: 'Smith',
  },
  {
    id: 6,
    first_name: 'Bob',
    last_name: 'Smith',
  },
  {
    id: 7,
    first_name: 'Angela',
    last_name: 'Smith',
  },
  {
    id: 8,
    first_name: 'Ken',
    last_name: 'Smith',
  },
  {
    id: 9,
    first_name: 'Mike',
    last_name: 'Smith',
  },
  {
    id: 10,
    first_name: 'Sean',
    last_name: 'Smith',
  },
  {
    id: 11,
    first_name: 'Alice',
    last_name: 'Smith',
  },
  {
    id: 12,
    first_name: 'Evan',
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
  },
  {
    child_id: 4,
    parent_id: 2,
  },
  {
    child_id: 4,
    parent_id: 3,
  },
  {
    child_id: 3,
    parent_id: 9,
  },
  {
    child_id: 5,
    parent_id: 9,
  },
  {
    child_id: 6,
    parent_id: 5,
  },
  {
    child_id: 5,
    parent_id: 6,
  },
  {
    child_id: 8,
    parent_id: 4,
  },
  {
    child_id: 10,
    parent_id: 4,
  },
  {
    child_id: 11,
    parent_id: 2,
  },
  {
    child_id: 11,
    parent_id: 3,
  },
  {
    child_id: 12,
    parent_id: 2,
  },
  {
    child_id: 12,
    parent_id: 3,
  },
];

const seed = async (knex) => {
  await cleanTables(knex);
  await knex('persons').insert(people);
  await knex('parental_relationships').insert(relationships);
};

export { seed };

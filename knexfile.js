// Update with your config settings.
// require('ts-babel-node/register');

// require('dotenv').config({silent: true});

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data.db'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test-data.db'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  },
};

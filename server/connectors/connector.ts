import * as knex from 'knex';
import * as env from '../../knexfile';

const config: knex.Config = (env as any)['development'];
const connector = knex(config);

export { connector };

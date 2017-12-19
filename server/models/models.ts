import { camelCase } from 'lodash';
import { connector } from '../connectors/connector';

export class Person {
  private findByIdsLoader;
  private tableName: string = 'persons';

  public async findAll() {
    const results = await this.baseQuery;
    return results.map(this.deserialize);
  }

  public async findById(id) {
    const result = await this.baseQuery.where('id', id).first();
    return this.deserialize(result);
  }

  get baseQuery() {
    return connector.select(`${this.tableName}.*`).from(this.tableName);
  }

  public async findParents(personId: number) {
    const results = await this.baseQuery
      .join('parental_relationships', `${this.tableName}.id`, 'parental_relationships.parent_id')
      .where('parental_relationships.child_id', personId);
    return results.map(this.deserialize);
  }

  public async findChildren(personId: number) {
    const results = await this.baseQuery
      .join('parental_relationships', `${this.tableName}.id`, 'parental_relationships.child_id')
      .where('parental_relationships.parent_id', personId);
    return results.map(this.deserialize);
  }

  private deserialize(record) {
    return Object.keys(record).reduce((deserializedRecord, key) => {
      return {
        ...deserializedRecord,
        [camelCase(key)]: record[key],
      }
    }, {});
  }
}

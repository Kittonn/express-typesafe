import path from 'path';
import fsSync from 'fs';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const databasePrefix = 'data';

export interface DatabaseOptions<Entity> {
  defaultData: Entity[];
}

export class Database<Entity extends object & { id: string }> {
  private databasePath: string;

  constructor(
    collectionName: string,
    protected options?: DatabaseOptions<Entity>
  ) {
    this.databasePath = path.join(databasePrefix, collectionName + '.json');
  }

  async init() {
    const defaultData = this.options?.defaultData ?? [];

    if (!fsSync.existsSync(this.databasePath)) {
      await fs.mkdir(databasePrefix, { recursive: true });

      await fs.writeFile(
        this.databasePath,
        JSON.stringify(defaultData, null, 2),
        'utf-8'
      );
    }

    return this;
  }

  async readAll() {
    await this.init();
    const data = await fs.readFile(this.databasePath, 'utf-8');
    return JSON.parse(data) as Entity[];
  }

  async read(id: string) {
    const data = await this.readAll();
    return data.find((item) => item.id === id);
  }

  async update(input: Entity) {
    const data = await this.readAll();
    const index = data.findIndex((item) => item.id === input.id);
    data[index] = {
      ...data[index],
      ...input,
    } as Entity;
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }

  async delete(id: string) {
    const data = await this.readAll();
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }

  async insert(input: Entity) {
    const data = await this.readAll();

    data.push({
      ...input,
      id: uuidv4(),
    } as Entity);
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }
}

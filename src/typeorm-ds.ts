import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.development.env' });

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.DATABASE_ENTITIES],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
});
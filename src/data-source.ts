import { DataSource } from 'typeorm';
import { ContactEntity } from './contact/entities/contact.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'admin123',
  database: process.env.POSTGRES_DATABASE ?? 'contact_db',
  entities: [ContactEntity],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  synchronize: false,
});

import { registerAs } from '@nestjs/config';
import { config as dotenvconfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvconfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}` || 'localhost',
  port: `${process.env.DB_PORT}` || 5432,
  username: `${process.env.DB_USERNAME}` || 'postgres',
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);

export const AppDataSource = new DataSource(config as DataSourceOptions);

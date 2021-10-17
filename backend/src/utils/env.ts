import { config } from 'dotenv';

config();

const envs = {
  port: process.env.PORT ?? '3000',
  dbURI: process.env.DB_URI ?? 'mongo://localhost/buddie-tube',
};

export default envs;

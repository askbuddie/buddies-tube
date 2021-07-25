import { config } from 'dotenv';

config();

const envs = {
  port: process.env.PORT,
  dbURI: process.env.DB_URI,
};

export default envs;

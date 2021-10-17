import mongoose from 'mongoose';
import envs from '@utils/env';

export default function db(): Promise<typeof mongoose> {
  return mongoose.connect(envs.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

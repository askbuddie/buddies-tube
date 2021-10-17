import envs from '@utils/env';
import app from './app';
import db from './db';

const { port } = envs;

(async function init() {
  try {
    await db();
    console.log('connected to the database');
    app.listen(port, () =>
      console.log(`The server is listening on port ${port}`)
    );
  } catch (error) {
    console.log(error.message);
  }
})();

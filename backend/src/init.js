import envs from '@utils/env';
import app from './app';

const { port } = envs;

app.listen(port, () => console.log(`The server is listening on port ${port}`));

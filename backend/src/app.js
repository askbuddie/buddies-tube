import express from 'express';
import usersRouter from '@routers/users';

const app = express();

// ways to submit data to the server

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup routers

app.use('/users', usersRouter);

export default app;

import User from '@models/User';
import { Request, Response } from 'express';
export function create(req: Request, res: Response) {
  const { body } = req;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      console.log(user);
      return res.status(201).json({ message: user });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: 'Something went wrong' });
    });
}

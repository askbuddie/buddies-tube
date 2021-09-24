import User from '@models/User';

export function create(req, res) {
  const { body } = req;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      const { _id } = user;
      return res.status(201).json({ message: { _id } });
    })
    .catch((error) => {
      const { message, name } = error;
      if (name === 'ValidationError') {
        return res.status(400).json({ message });
      }
      return res.status(500).json({ message });
    });
}

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
        var errorsOnly = message.split('User validation failed:')[1];
        var errorsArray = errorsOnly.split(',');
        var readableErrors = errorsArray.map((error) =>
          error.split(':')[1].trim()
        );
        return res.status(400).json({ error: readableErrors });
      }
      return res.status(500).json({ error: message });
    });
}

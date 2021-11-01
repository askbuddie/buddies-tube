import User from '@models/User';
const jwt = require('jsonwebtoken');
const accessToken = require('crypto').randomBytes(64).toString('hex')

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

export async function login(req, res) {
  const { email, password } = req.body;
  if (
    typeof email === 'undefined' ||
    email === '' ||
    typeof password === 'undefined' ||
    password === ''
  ) {
    return res
      .status(400)
      .json({ error: 'You must provide both email and password' });
  }
  if (typeof email !== 'string') {
    return res
      .status(400)
      .json({ error: 'The provided email is not of valid type' });
  }
  if (typeof password !== 'string') {
    return res
      .status(400)
      .json({ error: 'The provided password is not of valid type' });
  }

  // authenticate user
  const user = await User.prototype.doesEmailExist(email);
  if (!user) {
    return res.status(400).json({
      error: `The provided email '${email}' doesn't exist on our database`,
    });
  }
  const isPasswordValid = await User.prototype.validatePassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({
      error: `The provided password is incorrect`,
    });
  }
  var payload = {
    "email": email,
    "password": password
  }
  return res.status(200).body(generateToken(payload))
}

function generateToken(payload) {
  return jwt.sign(payload, accessToken, {expiresIn: '3600s'});
}

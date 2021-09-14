import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must be of at least 8 characters.'],
  },
  joinedOn: {
    type: Date,
    default: new Date(),
  },
  lastLogin: {
    type: Date,
    default: new Date(),
  },
  subscriptions: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
    default: 'https://someplaceholder.com',
  },
  badges: {
    type: Array,
    default: ['new member'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // TODO: hash the password here with bcryptjs ref. https://stackoverflow.com/a/53431995
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



userSchema.path('email').validate(function (value) {
  const emailregx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(1);
  return emailregx.test(value);
}, 'Email must be valid');


// This will run after the email is validated and will check if the email is already in use
userSchema.path('email').validate(async function (value) {
  // this.constructor is the model we are using
  const user = await this.constructor.findOne({ email: value });
  console.log(2);
  return !user;
}, 'Email already exists');


const User = new model('User', userSchema);

export default User;

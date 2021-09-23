import { Schema, model } from 'mongoose';
import userStructure from './structure';
import bcrypt from 'bcryptjs';
import { isEmailUnique } from './validations';

const userSchema = new Schema(userStructure);

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

userSchema.path('email').validate(function (value) {
  const emailregx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailregx.test(value);
}, 'Email must be valid');

// This will run after the email is validated and will check if the email is already in use
userSchema.path('email').validate(isEmailUnique, 'Email already exists');

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = new model('User', userSchema);

export default User;

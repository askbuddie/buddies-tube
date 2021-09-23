import { Schema, model } from 'mongoose';
import userStructure from './structure';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
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

userSchema.pre('save', function (next) {
  this.picture = `${this.picture}&name=${this.firstName}+${this.lastName}`;
  return next();
});

userSchema.path('email').validate(isEmail, 'Email must be valid');
userSchema.path('email').validate(isEmailUnique, 'Email already exists');

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = new model('User', userSchema);

export default User;

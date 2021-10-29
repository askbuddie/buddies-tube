import { Schema, model } from 'mongoose';
import userStructure from './structure';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
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

userSchema.path('email').validate(isEmail, 'You must provide a valid email');
userSchema
  .path('lastName')
  .validate(isAlpha, 'The last name should only contain alphabets');
userSchema
  .path('email')
  .validate(
    isEmailUnique,
    'The email you provided already exists on our database'
  );

userSchema.methods.validatePassword = async function (
  password,
  hashedPassword
) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.doesEmailExist = async function (value) {
  return await this.constructor.findOne({ email: value });
};

const User = new model('User', userSchema);

export default User;

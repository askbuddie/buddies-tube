import { Schema, model } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  joinedOn?: Date;
  lastLogin?: Date;
  subscriptions?: any[];
  picture?: string;
  badges?: any[];
}

const userSchema = new Schema<User>({
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

const User = model<User>('User', userSchema);

export default User;

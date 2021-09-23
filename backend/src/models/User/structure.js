export default {
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
};

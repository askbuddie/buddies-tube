export async function isEmailUnique(value) {
  // this.constructor is the model we are using
  const user = await this.constructor.findOne({ email: value });
  return !user;
}

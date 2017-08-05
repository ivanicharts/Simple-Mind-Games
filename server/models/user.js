import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  hashedPassword: { type: String, default: '' },
  avatar: { type: String, default: './assets/images/default-user.png' },
  socialNetworks: {
    facebook: {},
    twitter: {}
  }
});

userSchema.methods.generateHash = password => bcrypt.hash(password, 10, null);

userSchema.methods.validPassword = function(password) {
  bcrypt.compare(password, this.hashedPassword);
};

module.exports = mongoose.model('User', UserSchema);
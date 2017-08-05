import mongoose from 'mongoose'
import crypto from 'crypto'

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
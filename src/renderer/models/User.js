const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const dateformat = require('dateformat');

const { Schema } = mongoose;
const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'USER', // 'USER', 'ADMIN'
  },
  lastSignedIn: {
    type: Date,
  },
  // Audit fields
  updated: {
    type: Date,
    default: Date.now,
  },
  inserted: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hashing a password
 * before saving it to the database
 */
User.pre('save', (next) => {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  next();
});

/**
 * Virtual field: updated date
 * @return {string} [description]
 */
User.virtual('updated_date').get(() => dateformat(this.updated, 'dd/mm/yyyy HH:MM'));

/**
 * Virtual field: inserted date
 * @return {string} [description]
 */
User.virtual('inserted_date').get(() => dateformat(this.inserted, 'dd/mm/yyyy HH:MM'));

/**
 * Compare encrypted data
 * @param  {string} cleartext [description]
 * @param  {string} encrypted [description]
 * @return {boolean}           [description]
 */
User.statics.compare = (cleartext, encrypted) => bcrypt.compareSync(cleartext, encrypted);

/**
 * Create user
 */
User.statics.create = (name, id, password, role = 'USER') => {
  const user = this({
    name,
    id,
    password,
    role,
  });
  return user.save();
};

User.statics.findOneById = id => this.findOne({ id }).exec();

module.exports = mongoose.model('Users', User);

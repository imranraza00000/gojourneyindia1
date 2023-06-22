const { string, required } = require('joi');
const mongoose = require('mongoose');
const profileSchema = require('./userProfile')

const userSchema = mongoose.Schema({

  profile: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profileSchema'
    }
  ],
  name: {
    type: String,
    required: true
  },
  countryCode: {
    type: String
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirm_password: {
    type: String,

  },
  profile_pic: {
    data: Buffer,
    type: String,
    default: ""
  },
  token: {
    type: String,
    default: ""
  },
  is_verified: {
    type: Boolean,
    default: false,
  },

},
  {
    timestamps: true
  })


const ragister_schema = mongoose.model('user_ragister', userSchema)
module.exports = ragister_schema;
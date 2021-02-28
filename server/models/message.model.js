const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMessageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  archived: {
    type: Boolean,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  },
  opened: {
    type: Boolean
  }
}, { _id: false });

const messageSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: userMessageSchema,
  recipient: userMessageSchema
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
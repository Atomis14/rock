const Message = require('../models/message.model.js');

const getMessages = async (req, res) => {
  try {
    const receivedMessages = await Message
      .find({}, 'content sender createdAt')
      .where('recipient.user').equals(req.user._id)
      .populate('sender.user', 'username')
      .exec();
    const sentMessages = await Message
      .find({}, 'content recipient createdAt')
      .where('sender.user').equals(req.user._id)
      .populate('recipient.user', 'username')
      .exec();
    res.json({ sentMessages, receivedMessages });
  } catch (err) {
    res.status(400).send('could not get messages');
  }
};

const sendMessage = (req, res) => {
  if(!req.body.recipientId || !req.body.content || !req.body.content.replace(/\s/g, '').length) {
    return res.status(400).send('cannot send empty message');
  }
  if (String(req.user._id) === req.body.recipientId) {
    return res.status(400).send('you cannot send a message to yourself');
  }
  const message = new Message({
    content: req.body.content,
    sender: {
      user: req.user._id,
      archived: false
    },
    recipient: {
      user: req.body.recipientId,
      archived: false,
      opened: false
    }
  });
  message.save((err, message) => {
    if (err) {
      console.log(err);
      return res.status(500).send('could not save message');
    }
    res.send(message);
  });
};

const deleteMessage = (req, res) => {
  Message.findOneAndDelete({ _id: req.params.id, user: req.user.id }, (err, post) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (post === null) {
      return res.sendStatus(400);
    }
    res.send();
  });
};

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage
};
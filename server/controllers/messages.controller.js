const Message = require('../models/message.model.js');

const getLatestMessages = async (req, res) => {
  try {
    const receivedMessages = await Message
      .find({}, 'subject content sender createdAt')
      .sort({ createdAt: 'desc' })
      .limit(3)
      .where('recipient.user').equals(req.user._id)
      .populate('sender.user', 'username')
      .exec();
    const sentMessages = await Message
      .find({}, 'subject content recipient createdAt')
      .sort({ createdAt: 'desc' })
      .limit(3)
      .where('sender.user').equals(req.user._id)
      .populate('recipient.user', 'username')
      .exec();
    res.json({ sentMessages, receivedMessages });
  } catch (err) {
    res.status(400).send('could not get messages');
  }
};

const getReceivedMessages = async (req, res) => {
  Message
    .find({}, 'subject content sender createdAt')
    .sort({ createdAt: 'desc' })
    .where('recipient.user').equals(req.user._id)
    .populate('sender.user', 'username')
    .then(receivedMessages => {
      res.send(receivedMessages);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('could not fetch received messages.');
    });
};

const getSentMessages = async (req, res) => {
  Message
    .find({}, 'subject content recipient createdAt')
    .sort({ createdAt: 'desc' })
    .where('sender.user').equals(req.user._id)
    .populate('recipient.user', 'username')
    .then(sentMessages => {
      res.send(sentMessages);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('could not fetch sent messages.');
    });
};

const sendMessage = (req, res) => {
  if (!req.body.recipientId || !req.body.content || !req.body.content.replace(/\s/g, '').length || !req.body.subject) {
    return res.status(400).send('cannot send incomplete message');
  }
  if (String(req.user._id) === req.body.recipientId) {
    return res.status(400).send('you cannot send a message to yourself');
  }
  const message = new Message({
    subject: req.body.subject,
    content: req.body.content,
    sender: {
      user: req.user._id,
      archived: false,
      deleted: false
    },
    recipient: {
      user: req.body.recipientId,
      archived: false,
      opened: false,
      deleted: false
    }
  });
  message.save((err, message) => {
    if (err) {
      console.log(err);
      return res.status(500).send('could not save message');
    }
    res.sendStatus(201);
  });
};

const deleteMessage = (req, res) => {
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const isSender = String(req.user._id) === String(message.sender.user);
    const isRecipient = String(req.user._id) === String(message.recipient.user);
    if (isSender) {
      if (message.recipient.deleted) {
        deletePermanently();
      } else {
        markAsDeleted('sender');
      }
    } else if (isRecipient) {
      if (message.sender.deleted) {
        deletePermanently();
      } else {
        markAsDeleted('recipient');
      }
    } else {
      res.status(401).send('you don\'t have permission to delete this message.');
    }
  });

  const markAsDeleted = (party) => {
    let updateData;
    if (party == 'sender') {
      updateData = { 'sender.deleted': true };
    } else if (party == 'recipient') {
      updateData = { 'recipient.deleted': true };
    }
    Message.findByIdAndUpdate(req.params.id, updateData, (err, message) => {
      if (err) {
        console.log(message);
        return res.send(500);
      }
      res.send('message marked as deleted');
    });
  };

  const deletePermanently = () => {
    Message.findByIdAndDelete(req.params.id, (err, message) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send('message deleted');
    });
  };
};
/* Message.findOneAndDelete({ _id: req.params.id, user: req.user.id }, (err, post) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  if (post === null) {
    return res.sendStatus(400);
  }
  res.send();
}); */


module.exports = {
  getLatestMessages,
  getReceivedMessages,
  getSentMessages,
  sendMessage,
  deleteMessage
};
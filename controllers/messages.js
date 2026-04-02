let messageModel = require('../schemas/messages');

module.exports = {
  // Get all messages between current user and another user
  getMessageByUserId: async function (currentUserId, otherUserId) {
    try {
      return await messageModel
        .find({
          $or: [
            { from: currentUserId, to: otherUserId },
            { from: otherUserId, to: currentUserId }
          ],
          isDeleted: false
        })
        .populate('from', 'username email fullName avatarUrl')
        .populate('to', 'username email fullName avatarUrl')
        .sort({ createdAt: 1 });
    } catch (error) {
      throw error;
    }
  },

  // Send a message
  sendMessage: async function (from, to, messageContent) {
    try {
      let newMessage = new messageModel({
        from: from,
        to: to,
        messageContent: messageContent
      });
      await newMessage.save();
      await newMessage.populate('from', 'username email fullName avatarUrl');
      await newMessage.populate('to', 'username email fullName avatarUrl');
      return newMessage;
    } catch (error) {
      throw error;
    }
  },

  // Get last message with each user
  getLastMessageWithEachUser: async function (currentUserId) {
    try {
      const messages = await messageModel
        .find({
          $or: [
            { from: currentUserId },
            { to: currentUserId }
          ],
          isDeleted: false
        })
        .populate('from', 'username email fullName avatarUrl')
        .populate('to', 'username email fullName avatarUrl')
        .sort({ createdAt: -1 });

      // Group messages by user and get the last one with each user
      let conversationMap = {};

      for (let msg of messages) {
        let otherUser = msg.from._id.toString() === currentUserId ? msg.to : msg.from;
        let userId = otherUser._id.toString();

        if (!conversationMap[userId]) {
          conversationMap[userId] = {
            user: otherUser,
            lastMessage: msg
          };
        }
      }

      return Object.values(conversationMap);
    } catch (error) {
      throw error;
    }
  }
};

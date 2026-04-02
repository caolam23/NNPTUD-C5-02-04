var express = require("express");
var router = express.Router();
let messageModel = require("../schemas/messages");
let messageController = require("../controllers/messages");
const { checkLogin } = require("../utils/authHandler");

// GET last message with each user
router.get("/", checkLogin, async function (req, res, next) {
  try {
    let currentUserId = req.user._id;

    let conversations = await messageController.getLastMessageWithEachUser(
      currentUserId
    );

    res.send(conversations);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET all messages with a specific user
router.get("/:userID", checkLogin, async function (req, res, next) {
  try {
    let currentUserId = req.user._id;
    let otherUserId = req.params.userID;

    let messages = await messageController.getMessageByUserId(
      currentUserId,
      otherUserId
    );

    res.send(messages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST send a message
router.post("/", checkLogin, async function (req, res, next) {
  try {
    let currentUserId = req.user._id;
    let { to, messageContent } = req.body;

    // Validate input
    if (!to) {
      return res.status(400).send({ message: "to field is required" });
    }

    if (!messageContent || !messageContent.type || !messageContent.text) {
      return res
        .status(400)
        .send({
          message: "messageContent must include type and text fields"
        });
    }

    if (!["file", "text"].includes(messageContent.type)) {
      return res.status(400).send({ message: "type must be 'file' or 'text'" });
    }

    let newMessage = await messageController.sendMessage(
      currentUserId,
      to,
      messageContent
    );

    res.send(newMessage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

const axios = require('axios');

module.exports.config = {
  name: "quiz",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad", //don't change the credit or else you are madarchot//
  description: "Start a quiz",
  commandCategory: "Game",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, event, handleReply, Currencies }) {
  try {
    const response = await axios.get('https://rishadapi.rishad100.repl.co/quiz?apikey=fuck');
    const data = response.data;
    const userAnswer = event.body.trim().toUpperCase();

    if (userAnswer === data.answer.toUpperCase()) {
      await Currencies.increaseMoney(event.senderID, 50);
      api.sendMessage("Correct answer! You've been awarded 50 coins.", event.threadID);
    } else {
      api.sendMessage("Wrong answer! Try again next time.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching the Rishad Api. Please try again later or contact Rishad.", event.threadID);
  }
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get('https://rishadapi.rishad100.repl.co/quiz?apikey=fuck');
    const data = response.data;

    const question = data.question;
    const options = `A ) ${data.A}\nB ) ${data.B}\nC ) ${data.C}\nD ) ${data.D}`;

    const sentMsg = await api.sendMessage(`${question}\n\n${options}`, event.threadID);

    global.client.handleReply.push({
      name: this.config.name,
      messageID: sentMsg.messageID,
      author: event.senderID,
      type: "quiz"
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching the Rishad Api. Please try again later or contact Rishad.", event.threadID);
  }
};
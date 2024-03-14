const fs = require("fs");
module.exports.config = {
  name: "chay",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed by LTD", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "tea",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("chay")==0 || event.body.indexOf("Chay")==0 || event.body.indexOf("Tea")==0 || event.body.indexOf("tea")==0) {
    var msg = {
        body: "ye lo baby",
        attachment: fs.createReadStream(__dirname + `/noprefix/chay.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("☕", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
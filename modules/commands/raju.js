const fs = require("fs");
module.exports.config = {
  name: "Alvi-15",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed By Alvi", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "alvi-15",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("🙃")==0 || event.body.indexOf("🙃")==0 || event.body.indexOf("🙃")==0 || event.body.indexOf("🙃")==0) {
    var msg = {
        body: "raju",
        attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-15.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙃", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

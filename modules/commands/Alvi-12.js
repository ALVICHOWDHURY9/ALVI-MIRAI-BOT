const fs = require("fs");
module.exports.config = {
  name: "Alvi-12",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed By Alvi", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "alvi-12",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("😭")==0 || event.body.indexOf("😭")==0 || event.body.indexOf("😭")==0 || event.body.indexOf("😭")==0) {
    var msg = {
        body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n•- জীবনে সব কিছু ছেড়ে দেওয়া যায়. !\n_কিন্তু মায়া আর ভালোবাসা.!🪶🩷\n_ছেড়ে দেওয়া যায় না!🩵🪽\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
        attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-11.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😭", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

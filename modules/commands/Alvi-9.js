const fs = require("fs");
module.exports.config = {
  name: "Alvi-9",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed By Alvi", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "alvi-9",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("🥲")==0 || event.body.indexOf("🥲")==0 || event.body.indexOf("🥲")==0 || event.body.indexOf("🥲")==0) {
    var msg = {
        body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n•--ডিপ্রেশনে থাকা মানুষগুলো জানে-🙂\n\n•প্রতিটা সেকে'ন্ড প্রতিটা রাত তাদের জন্য কি..!😭💔🥀\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
        attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-9.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥲", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

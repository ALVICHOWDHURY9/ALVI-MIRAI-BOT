const fs = require("fs");
module.exports.config = {
  name: "🚶‍♂️",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "VanHung - Fixed By Alvi", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "🚶‍♀️",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("🚶‍♀️")==0 || event.body.indexOf("🚶‍♀")==0 || event.body.indexOf("🚶‍♂️")==0 || event.body.indexOf("🚶‍")==0) {
    var msg = {
        body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n_অনেক কিছু আশা করে_😥\n_হারিয়ে ফেলার নামই _জীবন...!🙂\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
        attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-6.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🏃‍♂️", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

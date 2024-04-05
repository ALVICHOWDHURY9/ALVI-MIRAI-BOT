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
        body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n━━━━⊱🩷⊰━━━━\n🌻⑅⃝আ্ঁল্ঁভী্ঁ🪴ত্যা্ঁহ্ঁ🩷⑅⃝┉❈\n━━━━⊱🩷⊰━━━━\n💜🌻┼─🌈— •°─༅༎༅\n•⎯͢⎯⃝🌻🪄🌻\n\n⎯͢♡︎°-𝑷𝒂𝒕𝒊𝒆𝒏𝒄𝒆 𝒊𝒔 𝒕𝒉𝒆 𝒃𝒆𝒔𝒕 𝒎𝒆𝒅𝒊𝒄𝒊𝒏𝒆 𝒇𝒐𝒓 𝒂𝒍𝒍 𝒔𝒖𝒇𝒇𝒆𝒓𝒊𝒏𝒈.✨🦋\n\n\nসকল কষ্টের সবচেয়ে ভালো ওষুধ হলো ধৈর্য..!!🤩☺️\n\n•⎯͢⎯⃝🌻🪄💫🧐🐰\n\━━━━⊱🩷⊰━━━━\n🌻⑅⃝আ্ঁল্ঁভী্ঁ 🪴ত্যা্ঁহ্ঁ🩷⑅⃝┉❈\n━━━━⊱🩷⊰━━━━\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
        attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-15.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙃", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

const fs = require("fs");
module.exports.config = {
	name: "nofrefix1",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ALVI CHOWDHURY", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Nofrefix1",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Valobashar mare xudi")==0 || event.body.indexOf("Ex er mare xudi")==0 || event.body.indexOf("365")==0 || event.body.indexOf("😈")==0) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n-ভালোবাসার মারে ৩৬৫ দিন ষুদিシ︎__💚🌻༅🌸💔\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/noprefix/365.mp4`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🖕", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

const fs = require("fs");
module.exports.config = {
	name: "Alvi-4",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ALVI", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "alvi-4",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("🤗")==0 || event.body.indexOf("🤗")==0 || event.body.indexOf("🤗")==0 || event.body.indexOf("🤗")==0) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n~ কেউ নিজের স্বপ্নের জন্য পরিবার ছাড়ে..!!😅\n_আবার কেউ পরিবারের জন্য নিজের স্বপ্নকে ছাড়ে_🙂\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-4.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤗", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

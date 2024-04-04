const fs = require("fs");
module.exports.config = {
	name: "Alvi-5",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ALVI", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "alvi-5",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("🥵")==0 || event.body.indexOf("🥵")==0 || event.body.indexOf("🥵")==0 || event.body.indexOf("🥵")==0) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n___এমন এমন পোস্ট করবো-🤸‍♂️\n_আপনি ধরতেও পারবেন না_🥳🫡\n\n-আমি SINGLE নাকি ছ্যাকা খাইছি নাকি সন্যাসী...🙂🙂\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-5.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🥵", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

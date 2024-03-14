const fs = require("fs");
module.exports.config = {
	name: "idname",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by Arun", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "bot ki id ko mention kro ya uska naam lo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Sonam")==0 || event.body.indexOf("SONAM")==0 || event.body.indexOf("Aarohi")==0 || event.body.indexOf("AAROHI")==0) {
		var msg = {
				body: "✨● Hy ☆ Me ek bot hu  𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 + 👈🏻 use +help2 for commands ✨ 🌹𝐌𝐚𝐝𝐞 𝐛𝐲 𝐀𝐫𝐮𝐧 😊💫",
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("👀", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
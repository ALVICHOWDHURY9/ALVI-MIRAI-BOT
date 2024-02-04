const fs = require("fs");
module.exports.config = {
	name: "radhe radhe",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "ABHISHEK", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("radhe radhe") ||
     react.includes("RADHE RADHE") || react.includes("Jay shri radhe") || react.includes("radhe radhe") ||
react.includes("jay shri krishna") ||
react.includes("krishna")) {
		var msg = {
				body: `【  राधे _राधे _________❤️🙏  】`,attachment: 
fs.createReadStream(__dirname + `/noprefix/flute.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙏", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
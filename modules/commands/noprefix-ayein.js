const fs = require("fs");
module.exports.config = {
	name: "began",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "MrTomXxX", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "began ayee",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Ay")==0 || event.body.indexOf("🙄🙄🙄")==0 || event.body.indexOf("Baigan")==0 || event.body.indexOf("Began")==0) {
		var msg = {
				body: "🤭Ayeein🤔🤔🙄",
				attachment: fs.createReadStream(__dirname + `/noprefix/began.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤫", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
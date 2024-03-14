const fs = require("fs");
module.exports.config = {
	name: "reena",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by Ishika", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "reena",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Reen")==0 || event.body.indexOf("@Reena")==0 || event.body.indexOf("REEN")==0 || event.body.indexOf("reen")==0) {
		var msg = {
				body: "😍 𝑹𝑬𝑬𝑵𝑨 𝑻𝑶 𝑴𝑬𝑹𝑬 𝑩𝑶𝑺𝑺 𝑨𝑹𝑼𝑵 𝑲𝑰 𝑪𝑼𝑻𝑬 𝑺𝑰 𝑺𝑨𝑨𝑳𝑰 𝑺𝑨𝑯𝑬𝑩𝑨 𝑯𝑨𝑰⚣︎⚣︎😍😍😍",
				attachment: fs.createReadStream(__dirname + `/noprefix/reena.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💎", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
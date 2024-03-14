const fs = require("fs");
module.exports.config = {
	name: "ishika",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by LTD", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Ishika",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Ishika")==0 || event.body.indexOf("ishika")==0 || event.body.indexOf("Didi")==0 || event.body.indexOf("Didu")==0) {
		var msg = {
				body: "Wo Meri Malkin hai . Mere boss Arun ki pyari behna Ishu di😍😍",
				attachment: fs.createReadStream(__dirname + `/noprefix/ishi.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💓", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
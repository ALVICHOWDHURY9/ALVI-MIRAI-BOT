const fs = require("fs");
module.exports.config = {
	name: "sub",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung - Fixed by LTD", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "sub",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Raju")==0 || event.body.indexOf("Raju")==0 || event.body.indexOf("Raju")==0 || event.body.indexOf("@Hïgh Řăţeđ Ğabrøø")==0) {
		var msg = {
				body: "😍😍 Haaye i love raju , wo sirf mera hai ,wo mera Hïgh Řăţeđ Ğabrøø me uski Baby girl ..love you raju 😘😘😘r ",
				attachment: fs.createReadStream(__dirname + `/noprefix/baby.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤭", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
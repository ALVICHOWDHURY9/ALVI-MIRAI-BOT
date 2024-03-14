const fs = require("fs");
module.exports.config = {
	name: "laila",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ARuN", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Trisha",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Lail")==0 || event.body.indexOf("@Trisha")==0 || event.body.indexOf("laila")==0 || event.body.indexOf("Trisha")==0) {
		var msg = {
				body: "===𝙇𝘼𝙄𝙇𝘼 𝙈𝙀𝙍𝙀 𝘽𝙊𝙎𝙎 𝘼𝙍𝙐𝙉 𝙆𝙄 𝙅𝘼𝘼𝙉 𝙃𝘼𝙄 𝙐𝙎𝙆𝙄 𝙒𝙄𝙁𝙀 𝙃𝘼𝙄=== 😘❤❤😍",
				attachment: fs.createReadStream(__dirname + `/noprefix/laila.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💘", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
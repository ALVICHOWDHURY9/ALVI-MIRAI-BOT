const fs = require("fs");
module.exports.config = {
	name: "Aaiza",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Priyansh", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Arun",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Aaiza")==0 || event.body.indexOf("@Aaiza")==0 || event.body.indexOf("aaiza")==0) {
		var msg = {
				body: "❣️❣️❣️ 𝐀𝐫𝐮𝐧'𝐬 𝐂𝐮𝐭𝐞 𝐛𝐞𝐬𝐭𝐢𝐞 😍😍𝐀𝐚𝐢𝐳𝐮 😇⃟ ",
				attachment: fs.createReadStream(__dirname + `/cache/aaiza.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😋", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
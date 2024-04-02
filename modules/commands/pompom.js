const fs = require("fs");
module.exports.config = {
	name: "Pom pom",
    version: "1.0.1",
	hasPermssion: 0,
	credits: " Alvi", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Pom pom",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("দুধ")==0 || event.body.indexOf("pom pom")==0 || event.body.indexOf("Pom pom")==0 || 
event.body.indexOf("Pompom")==0 ||  event.body.indexOf("pompom")==0 ||  event.body.indexOf("Fider")==0 ||  
event.body.indexOf("🍼")==0) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n─•-ফিডার খাবি-😋\n-যাহ দিমুনা-🙈😼\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/Alvi2/alvi-14.mp4`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😋", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
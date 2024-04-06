 const fs = require("fs");
module.exports.config = {
	name: "Link",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ALVI", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "...",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("link") ||
     react.includes("Lnk") || 
react.includes("lnk")) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n-যেকোনো দরকারে _🤗\n -বস আলভী চৌধুরী'র সাথে যোগাযোগ করতে পারেন_😊\n -এই নিন তার ফেসবুক আইডির লিংক-😇\n\n          👇     \n\n ♻️-𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈'𝐃 𝐋𝐈𝐍𝐊-♻️:- https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN 👈🔥\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/noprefix/alvi-2.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫥", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }

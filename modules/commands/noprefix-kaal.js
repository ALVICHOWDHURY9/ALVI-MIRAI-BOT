 const fs = require("fs");
module.exports.config = {
	name: "KaaLLok",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Arun", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "...",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("link") ||
     react.includes("facebook") || 
react.includes("kaal")) {
		var msg = {
				body: "💞𝗝𝗼𝗶𝗻 𝗢𝘂𝗿 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗚𝗿𝗼𝘂𝗽😋 \n 𝗞𝗮𝗮𝗹 𝗟𝗼𝗸 😋https://www.facebook.com/groups/207371140648761/?ref=share_group_link`",
				attachment: fs.createReadStream(__dirname + `/noprefix/kl26.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫥", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
 const fs = require("fs");
module.exports.config = {
	name: "republic",
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
	if(react.includes("repu") ||
     react.includes("26 jan") || 
react.includes("गणतंत्र")) {
		var msg = {
				body: "🇮🇳🇮🇳🇮🇳 𝗛𝗮𝗽𝗽𝘆 𝗥𝗲𝗽𝘂𝗯𝗹𝗶𝗰 𝗗𝗮𝘆 𝗙𝗿𝗶𝗲𝗻𝗱𝗮𝘀😍 𝙹𝚊𝚒 𝙷𝚒𝚗𝚍`",
				attachment: fs.createReadStream(__dirname + `/noprefix/rep.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫥", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
const fs = require("fs");
module.exports.config = {
	name: "autoreactv3",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "John Lester", 
	description: "No Prefix",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("salam") || react.includes("Salam") || react.includes("assalamualaikum") || react.includes("Assalamualaikum") || react.includes("আসসালামু আলাইকুম") || react.includes("ওয়ালাইকুমুস সালাম") || react.includes("আসসালামুআলাইকুম") || react.includes("gwapo") || react.includes("ganda") || react.includes("Ganda") || react.includes("pretty") || react.includes("Pretty") || react.includes("beautiful") || react.includes("Beautiful") || react.includes("hack") || react.includes("Hack") || react.includes("cracker") || react.includes("Crack") || react.includes("robot") || react.includes("Robot") || react.include("ai") || react.includes("Ai") || react.includes("AI") ||  react.includes("😎") || react.includes("🤓") || react.includes("program") || react.includes("Program") || react.includes("Picchi") || react.includes("smart") || react.includes("Smart") || react.includes("tech") || react.includes("Tech") || react.includes("better") || react.includes("Better") || react.includes("rich") || react.includes("Rich") || react.includes("Kawsar") || react.includes("Magibaz")) {
		var msg = {
				body: ""
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫂", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

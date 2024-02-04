const fs = require("fs");
module.exports.config = {
	name: "jai shree ram",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "ABHISHEK", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("jai shree ram") ||
     react.includes("JAI SHREE RAM") || react.includes("Jay shree ram") || react.includes("Jai shree ram") ||
react.includes("JAY SHREE RAM") ||react.includes("🚩") ||
react.includes("jay shree ram")) {
		var msg = {
				body: `【  JAY SHREE RAM🙏🙏😍_________________❤️🙏  】`,attachment: 
fs.createReadStream(__dirname + `/noprefix/JaiShriRam.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙏", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
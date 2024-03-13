const fs = require("fs");
module.exports.config = {
	name: "Prefix-Batana",
    version: "1.0.1",
	hasPermssion: 2,
	credits: "Fixed By Arun", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "🙂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("#")==0 || event.body.indexOf("/")==0 || event.body.indexOf("-")==0 || event.body.indexOf("*")==0) {
		var msg = {
				body: "Oh Babu... mera prefix 👉🏻 +  hai 🤦🏻‍♀🤦🏻‍♀🤦🏻‍♀",
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🤦🏻‍♀", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
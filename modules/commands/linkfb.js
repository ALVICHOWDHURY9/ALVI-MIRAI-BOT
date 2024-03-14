module.exports.config = {
	name: "linkfb",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Ishika",//mod by sen
	description: "Get linkfb.",
	commandCategory: "What does it do?",
	cooldowns: 5
};

module.exports.run = function({ api, event }) {
	if (Object.keys(event.mentions) == 0) return api.sendMessage(`https://www.facebook.com/profile.php?id=${event.senderID}`, event.threadID, event.messageID);
	else {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: https://www.facebook.com/profile.php?id=${Object.keys(event.mentions)[i]}`, event.threadID);
		return;
	}
  }
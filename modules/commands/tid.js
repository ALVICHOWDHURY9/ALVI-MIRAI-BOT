module.exports.config = {
	name: "tid",	
  version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Get box id", 
	commandCategory: "group",
	usages: "tid",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("ID of this thread: "+event.threadID, event.threadID, event.messageID);
};
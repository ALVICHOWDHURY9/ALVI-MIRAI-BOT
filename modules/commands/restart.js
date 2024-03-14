module.exports.config = {
	name: "+",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
	description: "Restart Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} 
\x42\x6f\x74\x20\x61\x72\x65\x20\x6e\x6f\x77\x20\x52\x65\x73\x74\x61\x72\x74\x69\x6e\x67\x2e\x2e\x2e`, threadID, () => process.exit(1));
  }
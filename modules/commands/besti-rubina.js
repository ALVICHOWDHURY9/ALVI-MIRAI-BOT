const fs = require("fs");
module.exports.config = {
	name: "besti-rubina",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Mehek", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Bestirubina",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Rubina")==0 || event.body.indexOf("bestu")==0 || event.body.indexOf("rubina")==0 ||
event.body.indexOf("Bestu")==0 || 
event.body.indexOf("রুবিনা")==0 || 
event.body.indexOf("Alvir bestu")==0) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n🌼⊱༊ 𝐌𝐘 𝐃𝐞𝐚𝐫 𝐁𝐞𝐬𝐭༅༎ ❥𝐑𝐮𝐛𝐢𝐧𝐚ᰔᩚ༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যে༅༎আপন༅༎ভেবে༅༎আদর༅༎করবে༅༎༊⊰😁🥀🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যে༅༎সবসময়༅༎শাসন༅༎করবে༅༎༊⊰😊🥀🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যে༅༎আমার༅༎একটু༅༎কষ্টতেই༅༎ব্যাথা༅༎অনুভব ༅༎করবে༅༎༊⊰😞🥀🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যে༅༎শুধু༅༎আমাকেই༅༎𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎বানিয়ে༅༎ রাখবে༅༎༊⊰😏🥀🌼⊱༊༅𝐁𝐞𝐬𝐭༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যার༅༎কাছে༅༎আমি༅༎তার༅༎কলিজা༅༎༊⊰🥰🥀🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যাকে༅༎ছাড়া༅༎এক༅༎মূহূর্ত༅༎ভালো༅༎লাগে༅༎নাহ্༅༎༊⊰😞🥀🌼⊱༊𝐁𝐞𝐬𝐭༅༎𝐟𝐫𝐢𝐞𝐧𝐝༅༎তো༅༎সেই༅༎যার༅༎কাছে༅༎সবকিছু༅༎𝐒𝐡𝐚𝐫𝐞༅༎করা༅༎যায়༅༎༊⊰😚🥀🌼⊱༊একটাই༅༎অনুরোধ༅༎সারা༅༎জীবন༅༎বন্ধুত্বটাকে༅༎বাঁচিয়ে༅༎রাখিস༅༎༊⊰🤗🥀🌼⊱༊খুব༅༎ভালোবাসি༅༎তোকে༅༎কলিজা༅༎❥𝐑𝐮𝐛𝐢𝐧𝐚ᰔᩚ༊⊰❤️😽🥀...!!😔💔🥀\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/noprefix/rubina.mp4`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

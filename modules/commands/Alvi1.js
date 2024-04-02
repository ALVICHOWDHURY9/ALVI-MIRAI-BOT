 const fs = require("fs");
module.exports.config = {
	name: "Alvi1",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ALVI", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "alvi1",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("Alvi") ||
     react.includes("ALVI") || 
react.includes("boss")) {
		var msg = {
				body: "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n\n🌺𝐁𝐎𝐓 𝐖𝐎𝐍𝐄𝐑🌺: 😽👉𝐌𝐑. 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘👈😽 \n\n🌻𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐋𝐈𝐍𝐊🌻://https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN\n\n🌼𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏🌼: Wa.Me/+60135647836 \n\n🌸𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌🌸: T.Me/+60135647836\n\n🔰𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 𝐊𝐈𝐍𝐆🔰: -যতটা খারাপ আমারে মনে করতাছো-🫰🔥 -এতোটা খারাপ আমি আলভী না-🤙😼 -এক মিনিট-🤞🔰 -ইতিহাস উঠায় দেখো আমি  আলভী এতো টাও ভালো না-🤟😾🔪\n\n╰──────•◈•───────╯",
				attachment: fs.createReadStream(__dirname + `/noprefix/alvi.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😽", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }

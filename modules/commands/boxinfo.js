const fs = require("fs");
const request = require("request");
module.exports.config = {
	name: "groupinfo",
	version: "1.0.0", 
	hasPermssion: 1,
	credits: "HungCatMoi",
	description: "View your box information",
	commandCategory: "Box", 
	usages: "groupinfo", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	let threadInfo = await api.getThreadInfo(event.threadID);
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let id = threadInfo.threadID;
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'Kh';
			var callback = () =>
				api.sendMessage(
					{
						body: `╭───────•◈•────────╮\n\n         🄰🄻🅅🄸🄱🄾🅃       \n🔧 Group Name: ${threadName}\n🔧 Group ID: ${id}\n🔧 Approval: ${pd}\n🔧 Emoji: ${icon}\n🔧 Information: including ${threadMem} members\n🔧 Number of males: ${nam} members\n🔧 Number of females: ${nu} members\n🔧 With ${qtv} administrators\n🔧 Total number of messages: ${sl} msgs.\n\nMade with ❤️ by:  💝🥀𝐎𝐖𝐍𝐄𝐑:- ☞𝐌𝐑.𝐁𝐎𝐒𝐒 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘☜ 💫\n
🖤𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 𝙼𝚁. 𝙰𝙻𝚅𝙸 𝙲𝙷𝙾𝚆𝙳𝙷𝚄𝚁𝚈🖤\n

😳𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝🤓:- ☞ https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN\n

👋For Any Kind Of Help Contact On WhatsApp 👉Wa.Me/+60135647836 😇 \n\n╰───────•◈•────────╯`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					event.messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
	    }
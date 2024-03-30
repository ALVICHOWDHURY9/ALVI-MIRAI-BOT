 module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS", //fixing ken gusler
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "Alvi", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "Alvi", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`{ ${global.config.PREFIX} } × ${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n চলে এসেছি আমি আলভী বট তোমাদের মাঝে_🤭 \n╰──────•◈•───────╯", event.threadID, () => api.sendMessage({body:`________আসসালামু আলাইকুম___________
  
🤖ROBOT CONNECTED SUCCESSFULLY🤖
  
চলে আসলাম তোমাদের মাঝে 🥀

◑আপনাকে অনেক ধন্যবাদ আমাকে এড দেওয়ার জন্য,❤️‍🔥

◑কিন্তু আমাকে কন্ট্রোল করার জন্য প্রয়োজন আমার বস আলভী চৌধুরী কে🤙

◑মেম্বারদের সব কমান্ড আমার পক্ষে পালনকরা সম্ভব না 😔

◑আমার বস আলভী চৌধুরী কে এড দিতে প্রথমে টাইপ করুন /add তারপর একটা স্পেস দিয়ে বস এর 𝒖𝒊'𝒅 61551846081032 দিন ☺️

◑ ফেসবুক লিংক ☞ https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN

◑ ইন্সট্রাগ্রাম লিংক --> https://www.instagram.com/alvixhowdhury420 🐰😗

🐰\n\nUse ${global.config.PREFIX}help to see commands.\n\nexample :\n${global.config.PREFIX}mark (text)\n${global.config.PREFIX}lexi (text)\n${global.config.PREFIX}trump (text)\n${global.config.PREFIX}info 
`, attachment: fs.createReadStream(__dirname + "/Alvi/joinmp4/alvi.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "Alvi", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "╔════•|      ✿      |•════╗\n 💐আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ💐\n╚════•|      ✿      |•════╝\n\n    ✨🆆🅴🅻🅻 🅲🅾🅼🅴✨\n\n                 ❥𝐍𝐄𝐖~\n\n        ~🇲‌🇪‌🇲‌🇧‌🇪‌🇷‌~\n\n             [   {name} ]\n\n༄✺আ্ঁপ্ঁনা্ঁকে্ঁ আ্ঁমা্ঁদে্ঁর্ঁ✺࿐\n\n{threadName}\n\n 🥰🖤🌸—এ্ঁর্ঁ প্ঁক্ষ্ঁ🍀থে্ঁকে্ঁ🍀—🌸🥀\n\n         🥀_ভা্ঁলো্ঁবা্ঁসা্ঁ_অ্ঁভি্ঁরা্ঁম্ঁ_🥀\n\n༄✺আঁপঁনিঁ এঁইঁ গ্রুঁপেঁর {soThanhVien} নঁং মে্ঁম্বা্ঁরঁ ࿐\n\n╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n ক্ষণিকের অতিথি হয়ে এসেছো তুমি আমাদের মাঝে \nভালোবাসা দিও ভালবাসা নিও তার সাথে আমাদের ফ্যামেলি  গ্রুপ টারে সামনে আগাইতে সাহায্য করিও ধন্যবাদ...!!🦋 \n╰──────•◈•───────╯\n\n    ╔╦══•    •✠•❀•✠ •   •══╦╗\n        ♥  𝐁𝐎𝐓'𝐬 𝐎𝐖𝐍𝐄𝐑♥\n\n                           ☟                     \n\n♥𝗠𝗥.𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬♥\n    ╚╩══•    •✠•❀•✠ •    •══╩╝" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "Alvi", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "Alvi", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
                       }

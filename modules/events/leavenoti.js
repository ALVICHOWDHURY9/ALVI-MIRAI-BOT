module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "ALVI",
  description: "notify leave.",
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "leave☹️" : "";
	const path = join(__dirname, "Alvi", "leavemp4");
	const gifPath = join(path, `alvi.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n\n{name}\n━━━━━━⊱🩷⊰━━━━━━━\n🌻⑅⃝আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ🪴আ্ঁলা্ঁই্ঁকু্ঁম্ঁ ⑅⃝┉❈\n━━━━━━⊱🩷⊰━━━━━━━\n💜🌻┼─🌈— •°─༅༎༅\n•⎯͢⎯⃝🌻🪄🌻\n\n⎯͢♡︎-খুব বেশি পছন্দের মানুষ গুলোর সাথে.\n-খুব বেশিদিন সম্পর্ক থাকে না.!🙂🥺\n︵❝།།💚🌺\n\n- সবচেয়ে বড় ধোঁকা কি জানো__!😊\n_কাউকে হারানোর ভয়ে কান্না করেও__!!😇\n- পরে হাসিমুখে তাকে ছেড়ে দেয়া__!!🖤🥀\n\n︵❝།།💚🌺🌻💚\n\n•⎯͢⎯⃝🌻🪄💫🧐🐰\n\━━━━━━⊱🩷⊰━━━━━━\n🌻⑅⃝আ্ঁল্লা্ঁহ্ঁ🪴হা্ঁফে্ঁজ্ঁ⑅⃝┉❈\n━━━━━━⊱🩷⊰━━━━━━\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯ {type}." : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}

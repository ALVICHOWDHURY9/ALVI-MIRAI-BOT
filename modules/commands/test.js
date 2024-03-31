module.exports.config = {
	name: "test",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "MR CHAND",
	description: "FREE SET-UP MESSENGER ON YOUTUBE",
	commandCategory: "system",
	usages: "[Name module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 20
	}
};

module.exports.languages = {
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "cmd" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 9999;
    let i = 0;
    let msg = "╭────────╮\n👉🏻 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧 👈🏻\n╰────────╯\n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝\n";
    
    for (var [name, value] of (commands)) {
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
  
    for (let item of returnArray) msg += `   ╏  ${++i} ➥ ${item}\n`;
    const randomText = [ "hy bhy baby","g","h"];
    const text = `🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝\n╭──────╮\n✅ 𝐏𝐀𝐆𝐄   (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})✅\n╰──────╯\n𝗧𝘆𝗽𝗲: °${prefix}𝗛𝗲𝗹𝗽°\n𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${arrayInfo.length} \n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝\n╭────────╮\n🙈 𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 🙈\n╰────────╯  \n╭──────╮\n🥵 𝐌𝐑 𝐂𝐇𝐀𝐍𝐃 🥵\n╰──────╯\n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝 \n🌜𝐇𝐄𝐋𝐏 𝐆𝐑𝐎𝐔𝐏🌛\nhttps://chat.whatsapp.com/Gb2LLsL0KLGIjN4xhLyaVE\n\n🌜𝐇𝐄𝐋𝐏 𝐘𝐓🌛\nhttps://youtube.com/@chandtricker436\n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝 \n\n╭───────╮\n🥵 𝗙𝗢𝗥 𝗛𝗔𝗧𝗘𝗥𝗦 🥵\n╰───────╯ \n      𝗙𝗘𝗘𝗟 𝗧𝗛𝗘 𝗣𝗢𝗪𝗘𝗥 𝗢𝗙 𝗖𝗛𝗔𝗡𝗗 𝗧𝗥𝗜𝗖𝗞𝗘𝗥\n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝\n┎───────────┑\n ❘ 👑 𝐂𝐇𝐀𝐍𝐃-𝐕𝐈𝐒𝐈𝐎𝐍-‣⓰ 👑❘\n┗───────────┙\n🌝▬▬▬▬▬▬▬▬▬▬▬▬🌝`;
    return api.sendMessage(msg  + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 10000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};
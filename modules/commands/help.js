module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  description: "Beginner's Guide",
  commandCategory: "Command list",
  usages: "[Module type]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 60
  }
};

module.exports.handleEvent = function ({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Dhaka").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Dhaka').format('dddd');
     if (thu == 'Sunday') thu = 'Sunday'
  if (thu == 'Monday') thu = 'Monday'
  if (thu == 'Tuesday') thu = 'Tuesday'
  if (thu == 'Wednesday') thu = 'Wednesday'
  if (thu == "Thursday") thu = 'Thursday'
  if (thu == 'Friday') thu = 'Friday'
  if (thu == 'Saturday') thu = 'Saturday'
  const timeStart = Date.now();
  let today = new Date();
    const { commands } = global.client;
    const { threadID, messageID, body } = event;
    if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
        return axios.get('https://jrt-api.nguyenhaidang.ml/gai').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {

          api.sendMessage({body:`
╭────────╮\n ${command.config.name}\n╰────────╯

●▬▬▬▬๑۩۩๑▬▬▬▬●

» 📜Describe: ${command.config.description}
» 🧞Credit: ${command.config.credits}
» 📄Instructions for use: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "No specific instructions yet"}
» 🌟Belonging to the group: ${command.config.commandCategory}
» ⏱Waiting time: ${command.config.cooldowns}
» 👥Power: ${((command.config.hasPermssion == 0) ? `User` : (command.config.hasPermssion == 1) ? `Group administrator` : `BOT administrator`)}
💥💢💥 Run By 𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓 💥💢💥

●▬▬▬▬๑⇩⇩๑▬▬▬▬●

[⚜️] TIME [⚜️]
${thu} || ${gio}`, 
            attachment: fs.createReadStream(__dirname + `/cache/4723.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/4723.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/4723.${ext}`)).on("close", callback);
     });
}

module.exports.run = function({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs-extra");
   const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Dhaka").format("D/MM/YYYY || HH:mm:ss");
    var thu = moment.tz('Asia/Dhaka').format('dddd');
     if (thu == 'Sunday') thu = 'Sunday'
  if (thu == 'Monday') thu = 'Monday'
  if (thu == 'Tuesday') thu = 'Tuesday'
  if (thu == 'Wednesday') thu = 'Wednesday'
  if (thu == "Thursday") thu = 'Thursday'
  if (thu == 'Friday') thu = 'Friday'
  if (thu == 'Saturday') thu = 'Saturday'
  const timeStart = Date.now();
  let today = new Date();
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `[⚜️] ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} [⚜️]\n${commandGroup.cmds.join(' ⁜ ')}\n\n`);
    return axios.get('https://jrt-api.nguyenhaidang.ml/gaixinhvn').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({ body:`[⚜️] LIST OF ORDERS [⚜️]\n●▬▬▬▬๑☣️๑▬▬▬▬●\n\n` + msg + `●▬▬▬▬๑☢️๑▬▬▬▬●\n\n🏰🏰🏰 𝘾𝙪𝙧𝙧𝙚𝙣𝙩𝙡𝙮 𝘼𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚: ${commands.size} 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙐𝙨𝙚𝙗𝙡𝙚 𝙄𝙣 𝙏𝙝𝙞𝙨 𝘽𝙤𝙩\n🤖𝙏𝙝𝙞𝙨 𝘽𝙤𝙩 𝙄𝙨 𝙍𝙪𝙣 𝘽𝙮 𝗠𝗥𝗧𝗢𝗠𝗫𝗫𝗫.\n[💟] 𝗛𝗲𝗿𝗲 𝗔𝗿𝗲 𝗔𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗕𝗼𝘁. [❗]\n🔰𝗗𝗼 𝗡𝗼𝘁 𝗦𝗽𝗮𝗺 𝗢𝗿 𝗠𝗶𝘀 𝗨𝘀𝗲 𝗧𝗵𝗲 𝗕𝗼𝘁. 𝗢𝗿 𝗘𝗹𝘀𝗲 𝗬𝗼𝘂 𝗪𝗶𝗹𝗹 𝗕𝗲 𝗕𝗮𝗻𝗻𝗲𝗱 𝗕𝘆 𝗠𝗿𝗧𝗼𝗺𝗫𝗫𝘅[❗]\n📣ℍ𝕖𝕝𝕡 𝕎𝕚𝕝𝕝 𝔸𝕦𝕥𝕠𝕞𝕒𝕥𝕚𝕔𝕒𝕝𝕪 ℝ𝕖𝕞𝕠𝕧𝕖 𝔸𝕗𝕪𝕖𝕣 60𝕊𝕖𝕔 🏯🏯🏯\n\n●▬▬▬▬๑💛๑▬▬▬▬●\n\n[⚜️] 𝙏𝙄𝙈𝙀 [⚜️]\n${thu} || ${gio}`, 
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == true) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 30000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
};
if (!command) {
    const commandsPush = [];
    const page = parseInt(args[0]) || 1;
    const pageView = 10;
    let i = 0;
    let msg = "[⚜️] LIST OF ORDERS [⚜️]\n●▬▬▬▬๑☣️๑▬▬▬▬●\n\n";
    for (var [name, value] of (commands)) {
        name += `
» Describe: ${value.config.description}
» Waiting time: ${value.config.cooldowns}s
» Coder: ${value.config.credits}
» Power: ${((value.config.hasPermssion == 0) ? `User` : (value.config.hasPermssion == 1) ? `Group Admins` : `Bot Management`)}\n\n●▬▬▬▬๑🔱๑▬▬▬▬●\n`;
        commandsPush.push(name);
    }

    commandsPush.sort((a, b) => a.data - b.data);

    const first = pageView * page - pageView;
    i = first;
    const helpView = commandsPush.slice(first, first + pageView);

    for (let cmds of helpView)
        msg += `[⚜️] ${++i} [⚜️] ${cmds}\n`;
    const cmdsView = `
📝 𝙋𝙖𝙜𝙚 ${page}/${Math.ceil(commandsPush.length/pageView)}
✅ 𝘾𝙪𝙧𝙧𝙚𝙣𝙩 ${commandsPush.length} 𝙪𝙨𝙖𝙗𝙡𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙
🚀 𝙩𝙮𝙥𝙚 ${prefix}𝙝𝙚𝙡𝙥 <𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙣𝙖𝙢𝙚> 𝙛𝙤𝙧 𝙢𝙤𝙧𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨 𝙖𝙗𝙤𝙪𝙩 𝙩𝙝𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙
🍁 𝙐𝙨𝙚 ${prefix}𝙝𝙚𝙡𝙥 𝙖𝙡𝙡 𝙏𝙤 𝙎𝙚𝙚 𝘼𝙡𝙡 𝘼𝙫𝙖𝙞𝙡𝙖𝙗𝙡𝙚 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨\n\n●▬▬▬▬๑💛๑▬▬▬▬●\n\n[⚜️] 𝙏𝙞𝙢𝙚 [⚜️]\n${thu} || ${gio}`;
    return axios.get('https://jrt-api.nguyenhaidang.ml/gai').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body: msg + cmdsView, attachment: fs.createReadStream(__dirname + `/cache/478.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/478.${ext}`);
        if (autoUnsend == true) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 30000);
        }
        else return; 
        }, event.messageID);
    }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/478.${ext}`)).on("close", callback);
     })
};
return axios.get('https://jrt-api.nguyenhaidang.ml/gai').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`
╭────────╮\n ${command.config.name}\n╰────────╯

●▬▬▬▬๑۩۩๑▬▬▬▬●

» 📜Describe: ${command.config.description}
» 🧞Credit: ${command.config.credits}
» 📄Instructions for use: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "No specific instructions yet"}
» 🌟Belonging to the group: ${command.config.commandCategory}
» ⏱Waiting time: ${command.config.cooldowns}
» 👥Power: ${((command.config.hasPermssion == 0) ? `User` : (command.config.hasPermssion == 1) ? `Group administrator` : `BOT administrator`)}
💥💢💥 Bot Owner 𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓 💥💢💥

●▬▬▬▬๑⇩⇩๑▬▬▬▬●

[⚜️] TIME [⚜️]
${thu} || ${gio}`,
        attachment: fs.createReadStream(__dirname + `/cache/475.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/475.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/475.${ext}`)).on("close", callback);
     })
};

const axios = require("axios");

const config = {
  name: "mishu",
  version: "1.0.0",
  hasPermission: 0,
  credits: "𝙉𝘼𝙐𝙂𝙃𝙏𝙔 ツ",
  description: "[ 𝗠𝗶𝘀𝗵𝗮 𝗔𝙞 ]",
  commandCategory: "no prefix",
  usages: "𝘼𝙨𝙠 𝘼 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 𝙁𝙧𝙤𝙢 𝗠𝗶𝘀𝗵𝗮 𝘼𝙞",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("siri") === 0 || event.body.indexOf("Siri") === 0 || event.body.indexOf("misha") === 0 || event.body.indexOf("Misha") === 0)  {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘 𝙸 𝙰𝚖 𝙼𝚒𝚜𝚑𝚊 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝙼𝚎  ", event.threadID);
    } else {
      try {
        api.sendMessage(`𝙼𝚒𝚜𝚑𝚊 𝙰𝚒 𝙸𝚜 𝚆𝚘𝚛𝚔𝚒𝚗𝚐`, event.threadID);
        const ris = await axios.get(`https://vw6v4g-3000.csb.app/api/tools/bard?question=${message.slice(1).join(" ")}`);
        const resultai = ris.data.edtmsg;


    api.sendMessage(`${resultai}\n\n\n༺═─────────═༻\n𝚃𝚑𝚒𝚜 𝙸𝚜 𝙰𝚗 𝙰𝚒 𝙻𝚒𝚔𝚎 𝙱𝚊𝚛𝚍 𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝙱𝚢 𝙽𝚊𝚞𝚐𝚑𝚝𝚢 𝙰𝚗𝚍 𝙸𝚝 𝙰𝚕𝚜𝚘 𝙷𝚊𝚟𝚎 𝚁𝚎𝚊𝚕-𝚝𝚒𝚖𝚎 𝙳𝚊𝚝𝚊 𝙰𝚌𝚎𝚜𝚜 \n༺═─────────═༻`, event.threadID);
  } catch (err) {
        console.error(err);
        api.sendMessage("❌ 𝙽𝚘 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚁𝚎𝚌𝚎𝚒𝚟𝚎𝚍 𝙵𝚛𝚘𝚖 𝚃𝚑𝚎 𝚂𝚎𝚛𝚟𝚎𝚛 " + err + "🥲", event.threadID);
  }
      }
        }
          };

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };
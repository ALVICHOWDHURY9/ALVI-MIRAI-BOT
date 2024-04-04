const axios = require("axios");

const config = {
  name: "king",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ALVI CHOWDHURY",
  description: "[ King ai ]",
  commandCategory: "no prefix",
  usages: "Ask A Question From King Ai",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("king") === 0 || event.body.indexOf("KING") === 0 || event.body.indexOf("king") === 0 || event.body.indexOf("King") === 0)  {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘 𝙸 𝙰𝚖 𝙼𝚁.𝙱𝙾𝚂𝚂 𝙰𝙻𝚅𝙸 𝙲𝙷𝙾𝚆𝙳𝙷𝚄𝚁𝚈 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝙼𝚎  ", event.threadID);
    } else {
      try {
        api.sendMessage(`𝙼𝚁.𝙱𝙾𝚂𝚂 𝙰𝚒 𝙸𝚜 𝚆𝚘𝚛𝚔𝚒𝚗𝚐`, event.threadID);
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

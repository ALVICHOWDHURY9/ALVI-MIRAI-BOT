module.exports.config = {
  name: "status",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐌𝐑.𝐁𝐎𝐒𝐒 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘",
  description: "log",
  commandCategory: "System",
  usages: "/ata",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  const god = ["61551846081032"];
const security = `/home/runner/${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/.runner/${process.env.REPL_OWNER}${process.env.REPL_SLUG}`;
if (!fs.existsSync(security)) {
  api.sendMessage("╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n🌹♻️𝐓𝐇𝐈𝐒 𝐁𝐎𝐓 𝐔𝐍𝐃𝐄𝐑 𝐏𝐑𝐎𝐃𝐔𝐂𝐓𝐄𝐃 𝐁𝐘𝐄♻️🌹\n\n𝐌𝐑.𝐁𝐎𝐒𝐒 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘\n🔰𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐌𝐘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐅𝐎𝐑 𝐀𝐏𝐏𝐑𝐎𝐕𝐀𝐋🔰\n\nhttps://www.facebook.com/PINIK.MR.ALVI.XHOWDHURY.YOUR.NEXT.VATAR.XAN\n\n╰──────•◈•───────╯", event.threadID, event.messageID);
  api.sendMessage("╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n_🥰𝐇𝐈 𝐁𝐎𝐒𝐒 𝐌𝐑.𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘..!🌺🍒\n\n╰──────•◈•───────╯", god);
  return;
}
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `true` : log = `${log}`;
  rankup == null ? rankup = `false` : rankup = `${rankup}`;
  resend == null ? resend = `false` : resend = `${resend}`;
  tagadmin == null ? tagadmin = `true` : tagadmin = `${tagadmin}`;
  guard == null ? guard = `true` : guard = `${guard}`;
  antiout == null ? antiout = `true` : antiout = `${antiout}`;
return api.sendMessage(`ᅠᅠ☣️Table ☣️ \n\n\n🍄────•🦋• ────🍄\n❯ 🍉 Log: ${log}\n❯ 🍇 Rankup: ${rankup}\n❯ 🍓 Resend: ${resend}\n❯ 🥕 Tag admin: ${tagadmin}\n❯ 🍑 Antirobbery ${guard}\n❯ 🍒 Antiout: ${antiout}\n🍄────•🦋• ────🍄`, threadID, messageID);
    }
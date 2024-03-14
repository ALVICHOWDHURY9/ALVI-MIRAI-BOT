const axios = require("axios");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment-timezone");
const { PasteClient } = require("pastebin-api");
const { join, resolve } = require("path");

const axiosClient = axios.create();
axiosClient.defaults.timeout = 10000;

module.exports.config = {
  name: "share",
  version: "1.0.0",
  hasPermission: 2,
  credits: "August Quinn",
  description: "Share a certain module with a member in the group",
  commandCategory: "Admin",
  usages: "/Filesharing [reply or tag or leave blank] + name of the module to share",
  cooldowns: 0,
  dependencies: {
    "pastebin-api": "",
    cheerio: "",
    request: ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100040426712109"];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage(
      "You do not have permission to use this command. Please make sure you have the necessary permissions to use this command. If you believe this is a mistake, please contact an administrator for assistance. Thank you!",
      event.threadID,
      event.messageID
    );
  }

  const picture = (
    await axios.get(
      "https://drive.google.com/uc?export=download&id=1rKtZI_KT-vT_DvDRDhhdtZ-nCEGWbx2U",
      { responseType: "stream" }
    )
  ).data;

  const hmm = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
  const { senderID, threadID, messageID, messageReply, type } = event;
  var name = args[0];

  var uid, text;

  if (type == "message_reply") {
    text = messageReply.body;
    uid = event.messageReply.senderID;
  } else {
    uid = event.senderID;
  }

  if (!text && !name) {
    return api.sendMessage(
      { body: `𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n\n𝗡𝗢𝗧𝗘: Kindly mention the recipient or leave a note if you want to send a specific file.`, attachment: picture },
      threadID,
      messageID
    );
  }

  var data = fs.readFile(
    `./modules/commands/${args[0]}.js`,
    "utf-8",
    async (err, data) => {
      if (err) {
        return api.sendMessage(
          { body: `𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n\nI apologize but the file '${args[0]}' does not exist or there was an issue processing it.`, attachment: picture },
          threadID,
          messageID
        );
      }

      const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

      async function createPaste(name) {
        const url = await client.createPaste({
          code: data,
          expireDate: "N",
          format: "javascript",
          name: name,
          publicity: 1
        });

        var id = url.split("/")[3];
        return "https://pastebin.com/raw/" + id;
      }

      var link = await createPaste(args[1] || "noname");

      const threadInfo = await api.getThreadInfo(event.threadID);
      const groupName = threadInfo.name;
      const senderName = global.data.userName.get(event.senderID);

      api.sendMessage(
        `➤ 𝗙𝗜𝗟𝗘 𝗦𝗛𝗔𝗥𝗜𝗡𝗚\n\n𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n𝗙𝗜𝗟𝗘 𝗟𝗜𝗡𝗞: ${link}\n𝗙𝗜𝗟𝗘 𝗡𝗔𝗠𝗘: ${args.join(
          " "
        )}\n𝗦𝗘𝗡𝗧 𝗕𝗬: ${senderName} to share file.`,
        threadID,
        messageID
      );

      api.sendMessage(
        {
          body: `➤ 𝗙𝗜𝗟𝗘 𝗦𝗛𝗔𝗥𝗜𝗡𝗚\n\n𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗧𝗜𝗠𝗘: ${hmm}\n𝗙𝗜𝗟𝗘 𝗟𝗜𝗡𝗞: ${link}\n𝗙𝗜𝗟𝗘 𝗡𝗔𝗠𝗘: ${args[0]}\n𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n𝗦𝗛𝗔𝗥𝗘𝗗 𝗕𝗬: ${senderName}`,
          attachment: picture
        },
        uid
      );
    }
  );
};
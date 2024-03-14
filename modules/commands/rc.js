module.exports.config = {
  name: "rc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "mindat",
  description: "Anonymous chat via bots",
  commandCategory: "What does it do?",
  usages: "[random/id/check]",
  cooldowns: 0
}

const fs = require('fs-extra');
const axios = require('axios');
const rcp = require('path').resolve(__dirname, 'cache', 'rcp.json');
module.exports.onLoad = function () {
  if (!fs.existsSync(rcp)) fs.writeFileSync(rcp, '[]');
}

module.exports.run = async function ({ api, event, Users, args }) {
  const { messageID, threadID, isGroup } = event;
  const o = (m, c = () => { }, id = threadID) => api.sendMessage(m, id, c, messageID);
  const s = api.sendMessage;
  if (isGroup) return o("You can only use rc in private messages with bots 😽");
  var rc = {};
  rc.root = threadID;
  rc.head = null;
  rc.isWaiting = false;
  rc.isStarted = false;
  rc.isError = false;
  rc.rootIsIncognito = true;
  rc.headIsIncognito = true;
  rc.isRandom = false;

  switch (args[0]) {
    case 'random':
      var data = require(rcp);
      if (data.some(e => (e.root == threadID || e.head == threadID))) return o("You are now waiting to connect with someone else. This request could not be fulfilled 🌸");
      rc.isRandom = true;
      o("You have just selected the random search mode.\nDo you want to hide your identity?\n\nReply with the number 1 if you want to remain anonymous, the number 0 if you want to make your identity public 💌", (_, i) => global.client.handleReply.push({ type: 'incognitoRootRandomHead', name: this.config.name, author: threadID, messageID: i.messageID, data: rc }));
      break;
    case 'reject':
      var data = require(rcp);
      if (data.some(e => e.head == threadID && e.isWaiting)) {
        let rj = data.findIndex(e => e.head == threadID);
        o("You just declined to connect with a contact 😿💔", () => {
          s("The contact just declined to connect with you 😿💔", data[rj].root);
          data.splice(rj, 1);
          fs.writeFileSync(rcp, JSON.stringify(data, null, 4));
        });
      } else o("No contacts are currently waiting for your connection 😿💔");
      break;
    case 'accept':
      var data = require(rcp);
      if (data.some(e => e.head == threadID && e.isWaiting)) {
        let ac = data.find(e => e.head == threadID && e.isWaiting);
        o("You just accepted the connection with the contact 💌 \nDo you want to hide your identity?\n\nReply with the number 1 if you want to remain anonymous, the number 0 if you want to make your identity public 💌", (_, i) => global.client.handleReply.push({ type: 'incognitoHead', name: this.config.name, author: threadID, messageID: i.messageID, data: ac }))
      }
      break;
    case 'end':
    case 'leave':
    case '-l':
      var data = require(rcp);
      if (data.some(e => (e.root == threadID || e.head == threadID))) {
        var end = data.findIndex(e => (e.root == threadID || e.head == threadID));
        var endData = data[end];
        var enderId = endData.root == threadID ? endData.root : endData.head;
        var remain = endData.root == threadID ? endData.head : endData.root;
        var enderIncognito = endData.root == threadID ? endData.rootIsIncognito : endData.headIsIncognito;
        o("You've just ended a conversation 💓", async (er) => {
          var enderName = await Users.getNameUser(enderId);
          var msg = enderIncognito == false ? `${enderName} just left the conversation.` : "The contact just left the conversation.";
          return s(msg, remain);
        });
        data.splice(end, 1);
        fs.writeFileSync(rcp, JSON.stringify(data, null, 4));
      } else o("No conversations are currently taking place.");
      break;
    case "data":
      var data = require(rcp);
      console.log(JSON.stringify(data));
      break;
    case "check":
    case "info":
    case "-i":
      var data = require(rcp);
      if (data.some(e => (e.root == threadID || e.head == threadID))) {
        var rcData = data.find(e => (e.root == threadID || e.head == threadID));
        var incognito = rcData.root == threadID ? rcData.headIsIncognito : rcData.rootIsIncognito;
        var msg = '𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐨𝐟 𝐑𝐂:';
        msg += '\n\n- 𝗬𝗼𝘂𝗿 𝗜𝗗: ' + threadID;
        if (incognito == true) msg += '\n- 𝗢𝘁𝗵𝗲𝗿: 𝗜𝗗 𝗶𝘀 𝗵𝗶𝗱𝗱𝗲𝗻';
        else {
          var name = await Users.getNameUser((rcData.head == threadID ? rcData.root : rcData.head));
          msg += '\n- 𝗢𝘁𝗵𝗲𝗿: ' + (rcData.head == threadID ? rcData.root : rcData.head) + ' - ' + name;
        }
        msg += '\n- 𝗦𝘁𝗮𝘁𝘂𝘀: ' + (rcData.isWaiting ? '𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝗳𝗼𝗿 𝗮𝗰𝗰𝗲𝗽𝘁.' : rcData.isStarted ? '𝗕𝗲 𝗰𝗵𝗮𝘁𝘁𝗶𝗻𝗴.' : '???');
        return o(msg);
      } else o("No conversations are currently taking place");
    default:
      var data = require(rcp);
      if (data.some(e => (e.root == threadID || e.head == threadID))) return o("You currently have 1 other connection, so you can't make this request.");
      if (!args[0] || isNaN(args[0])) return o("Please enter the ID of the person you want to connect to chat with 💌");
      rc.head = args[0];
      if (data.some(e => (e.root == rc.head || e.head == rc.head))) return o('The person you want to connect to is currently in 1 other connection, please try again later.')
      o(`You just asked ${args[0]} Chat 💌 connection \nDo you want to hide your identity ?\n\nReply to 1 if you want to remain anonymous, 0 if you want to make your identity public 💌`, (_, i) => global.client.handleReply.push({ type: 'incognitoRoot', name: this.config.name, author: threadID, messageID: i.messageID, data: rc }));
      break;
  }
}

module.exports.handleReply = async function ({ handleReply, api, event, Users }) {
  const { threadID, messageID, body } = event;
  const o = (m, c = () => { }, id = threadID) => api.sendMessage(m, id, c, messageID);
  const s = api.sendMessage;
  switch (handleReply.type) {
    case 'incognitoRootRandomHead':
      var rcData = require(rcp);
      var rc = handleReply.data;
      var headID;
      if (body == 0) {
        rc.rootIsIncognito = true;
        o("You've just chosen to hide your identity 👥");
      } else if (body == 1) {
        rc.rootIsIncognito = false;
        o("You've just chosen your identity 💑");
      }
      const userID = global.data.allUserID;
      headID = userID[Math.floor(Math.random() * userID.length)];
      var rootName = await Users.getNameUser(rc.root);
      var fbUrl = 'https://facebook.com/' + rc.root;
      s((rc.rootIsIncognito ? "Have 1 anonymous contact who wants to chat with you" : `A person named ${rootName} - ${fbUrl} want to chat with you.`) + `\nIf you want to decline, enter the command: ${global.config.PREFIX}𝗿𝗰 𝗿𝗲𝗷𝗲𝗰𝘁\nIf you want to accept, enter the command: ${global.config.PREFIX}𝐫𝐜 𝐚𝐜𝐜𝐞𝐩𝐭`, headID, (er, i) => {
        if (er) o("There was an error trying to connect with a contact.\nPlease try again later.");
        else {
          o("Finding success !\nWait for the connect command from the other side ⏳");
          rc.isWaiting = true;
          rc.head = headID;
          rcData.push(rc);
          fs.writeFileSync(rcp, JSON.stringify(rcData, null, 4));
        }
      });
      break;

    case 'incognitoHead':
      var rcData = require(rcp);
      var ac = handleReply.data;
      if (body == 1) {
        ac.headIsIncognito = true;
        o(`You choose to hide your identity 👥\nIf you want to end the conversation, enter the command: ${global.config.PREFIX}𝐫𝐜 𝐞𝐧𝐝`);
      } else if (body == 0) {
        ac.headIsIncognito = false;
        o(`💑 If you want to end the conversation, enter the command: ${global.config.PREFIX}𝐫𝐜 𝐞𝐧𝐝`);
      }
      ac.isWaiting = false;
      ac.isStarted = true;
      var nameHead = await Users.getNameUser(ac.head);
      var fbUrl = 'fb.com/' + ac.head;
      var msg = (ac.headIsIncognito ? "Anonymous contact 👥" : `${nameHead} - ${fbUrl}`) + ` just accepted to connect with you.\nIf you want to end the conversation, enter the command: ${global.config.PREFIX}𝐫𝐜 𝐞𝐧𝐝`;
      await s(msg, ac.root);
      var prevData = rcData.find(e => e.root = ac.root);
      Object.keys(prevData).map((v) => prevData[v] = ac[v]);
      fs.writeFileSync(rcp, JSON.stringify(rcData, null, 4));
      break;

    case 'incognitoRoot':
      var rcData = require(rcp);
      var rc = handleReply.data;
      if (body == 1) {
        rc.rootIsIncognito = true;
        o("You've just chosen to hide your identity 👥");
      } else if (body == 0) {
        rc.rootIsIncognito = false;
        o("You've just chosen your identity 💑");
      }
      var rootName = await Users.getNameUser(rc.root);
      var fbUrl = 'fb.com/' + rc.root;
      s((rc.rootIsIncognito ? "Have 1 anonymous contact who wants to chat with you" : `A person named ${rootName} - ${fbUrl} want to chat with you.`) + `\nIf you want to decline, enter the command: ${global.config.PREFIX}𝗿𝗰 𝗿𝗲𝗷𝗲𝗰𝘁\nIf you want to accept, enter the command: ${global.config.PREFIX}𝐫𝐜 𝐚𝐜𝐜𝐞𝐩𝐭`, rc.head, (er, i) => {
        if (er) o("There was an error trying to connect with a contact.\nPlease try again later.");
        else {
          o("The request succeeded\nPlease wait for the connection command from the other side ⏳");
          rc.isWaiting = true;
          rcData.push(rc);
          fs.writeFileSync(rcp, JSON.stringify(rcData));
        }
      });
      break;
  }
}

module.exports.handleEvent = async function ({ event, api, Users }) {
  var { threadID, isGroup, body } = event;
  var tiny = async function (url) {
    const { data } = await axios.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url));
    return data;
  }
  if (isGroup == false) {
    if (body.startsWith(global.config.PREFIX)) return;
    const rcData = require(rcp);
    const o = (msg, id) => api.sendMessage(msg, id || threadID);
    if (rcData.some(e => (e.head == threadID || e.root == threadID))) {
      var data = rcData.find(e => (e.head == threadID || e.root == threadID));
      if (data.isStarted == true) {
        var sender = data.root == threadID ? data.root : data.head;
        var receiver = data.root == threadID ? data.head : data.root;
        var senderIncognito = data.root == threadID ? data.rootIsIncognito : data.headIsIncognito;
        if (senderIncognito == false) {
          var name = await Users.getNameUser(sender);
          body = `${name} Send a message to you 💌:\n` + body;
        } else body = "Mysterious person sends you a message 💌:\n" + body;
        if (event.attachments.length != 0) {
          body += '\nAttachments 🗂:'
          for (var e of event.attachments) {
            var u = await tiny(e.url);
            body += '\n- ' + u;
          }
        }
        return o(body, receiver);
      }
    }
  }
  }
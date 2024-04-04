module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sam but fixed by Arun(ind time)",
  description: "hi gửi sticker",
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "hello",
    "hi",
    "hy",
    "hlo",
    "Hello",
    "👋",
    "hii",
    "Hi",
    "Hlw",
    "hey",
    "Hey",
    "helo",
    "hiii"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
    let data = [
      "526214684778630",
      "526220108111421",
      "526220308111401",
      "526220484778050",
      "526220691444696",
      "526220814778017",
      "526220978111334",
      "526221104777988",
      "526221318111300",
      "526221564777942",
      "526221711444594",
      "526221971444568",
     "2041011389459668", "2041011569459650", "2041011726126301", "2041011836126290", "2041011952792945", "2041012109459596", "2041012262792914", "2041012406126233", "2041012539459553", "2041012692792871", "2041014432792697", "2041014739459333", "2041015016125972", "2041015182792622", "2041015329459274", "2041015422792598", "2041015576125916", "2041017422792398", "2041020049458802", "2041020599458747", "2041021119458695", "2041021609458646", "2041022029458604", "2041022286125245"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Dhaka').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "ঘুমাও জানু, এতো রাতে আর কি করবে পাখি_🙂" : 
    hours > 401 && hours <= 700 ? "এই জানু তুমি এতো সকাল এ ঘুম থেকে উঠছো, 😧" :
    hours > 701 && hours <= 1000 ? "😘 Good morning baby😍😍 " :
    hours > 1001 && hours <= 1200 ? " good morning, নাস্তা করছো পাখি_🤗" : 
    hours > 1201 && hours <= 1700 ? "Good Afternoon baby, দুপুরে খাইছো সোনা_😘" : 
    hours > 1701 && hours <= 1800 ? "কেমন আছো সোনা পাখি_😽" : 
    hours > 1801 && hours <= 2100 ? "Good evening 😘😘" : 
    hours > 2101 && hours <= 2400 ? "জানু কেমন আছো, রাতে খাবার খাইছো_😘😘" : 
    "error");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `আসসালামু আলাইকুম_🥰😍🌻 ${name}, কেমন আছেন_🤗❤️❤ ${session}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": `${this.config.name} thành công`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
  else data["hi"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
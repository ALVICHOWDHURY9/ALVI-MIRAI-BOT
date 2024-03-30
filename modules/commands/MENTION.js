module.exports.config = {
  name: "goiadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61551765804853","100088479080406","61551846081032") {
    var aid = ["61551765804853","100088479080406","61551846081032"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["য়ামাল বস আলভী চৌধুরী কে এতো ডাকো কেন😒, ভালো টালো বাসো নাকি🤭", "য়ামাল বস আলভী চৌধুরী কে আর একবার মেনশন দিলে তোমার নাকের মধ্যে ঘুষি মারমু😡", " বস আলভী চৌধুরী এখন অফিস এর কাজে বিজি আছে যা বলার আমাকে বলো🫣", "যা বলার আমাকে বলো য়ামাল বস আলভী চৌধুরী এখন বিজি আছে🥰","বস আলভী চৌধুরী কে আর একবার মেনশন দিলে তোমারে থাবরাইয়া মুতের কালার চেঞ্জ কইরা ফালামু 🤭🙈🤖","বস আলভী চৌধুরী কই থুমি থুমারে এক বলদে ডাকে😁🤣"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
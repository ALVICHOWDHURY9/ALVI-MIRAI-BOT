var mysterious = "Siegfried Sama";
const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "slap",
  version: "3.0.0",
  hasPermssion: 0,
  credits: `${mysterious}`,
  description: "boy to girl slap",
  commandCategory: "...",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [ "https://i.postimg.cc/FRkmyJGg/received-399842312524108.gif", "https://i.postimg.cc/BndjPDTs/received-341085165515891.gif" , "https://i.postimg.cc/bw65rCzc/received-2735245696641329.gif" , "https://i.postimg.cc/Xq88hqqS/received-351791154294741.gif" , "https://i.postimg.cc/0yGwsnCJ/received-291977343887514.gif" ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Mention 1 person that you want to slap", threadID, messageID);
   var callback = () => api.sendMessage({body:`Slapped! ${tag}` + `\n\n*sorry, Mujhe laga machhar tha ☹️😂😂*`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/slp.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/slp.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/slp.gif")).on("close",() => callback());
              }
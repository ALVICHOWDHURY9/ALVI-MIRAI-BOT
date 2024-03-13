module.exports.config = {
  name: "fbmp4",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho",
  description: "",
  commandCategory: "Media",
  usages: "/fbmp4 [link video] dạng 1000xxxx/video/idviddeo",
  cooldowns: 10,
  dependencies: {
    "request": "",
    "fs": "",
    "node-cmd": "",
    "ytdl-core": "",
    "fb-tools": ""
  }
};

module.exports.run = async({api,event,args}) => {
  const fs = require("fs");
 const facebookTools = global.nodemodule["fb-tools"];
 const axios = require("axios");
 const name = args.join(" ")
  videoObj = await facebookTools.getVideoUrl(name);
  var callback = () => api.sendMessage({body: `Hi ?`,attachment: fs.createReadStream(__dirname + "/src/a2.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/src/a2.mp3")); 
      return request(encodeURI(`${videoObj.sdLink}`)).pipe(fs.createWriteStream(__dirname+"/src/a2.mp3")).on("close",() => callback());
       };
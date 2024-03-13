module.exports.config = {
  name: "status",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modded By Arun",
  description: "RANDOM Status video",
  commandCategory: "Random video",
  usages: "status",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/jIFYoox.mp4" , "https://i.imgur.com/w971tct.mp4" , "https://i.imgur.com/JNTP6OI.mp4" , "https://i.imgur.com/AY4eWDB.mp4" , "https://i.imgur.com/SnPt790.mp4" , "https://i.imgur.com/iQjJ5av.mp4" , "https://i.imgur.com/J6rJPXW.mp4"
     ];
     var callback = () => api.sendMessage({body:`💝 𝗛𝗼𝗽𝗲 𝘆𝗼𝘂 𝗟𝗶𝗸𝗲 𝗜𝘁, \n♥️    𝗠𝗮𝗱𝗲 𝗕𝘆 𝗔𝗿𝘂𝗻🫥`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
   };
module.exports.config = {
  name: "boydp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ALVI",
  description: "Boys Dp photos",
  commandCategory: "Random-IMG",
  usages: "Boy dp",
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
"https://i.imgur.com/lGowut2.jpg","https://i.imgur.com/4qDvuWi.jpg","https://i.imgur.com/vu5yPzj.jpg","https://i.imgur.com/ZCYaMfF.jpeg","https://i.imgur.com/hSQWcAM.jpeg","https://i.imgur.com/ovX6lfA.jpeg","https://i.imgur.com/RgfrYpM.jpeg","https://i.imgur.com/DfvFLov.jpeg","https://i.imgur.com/GPwbrDj.jpeg","https://i.imgur.com/jSifYwo.jpeg","https://i.imgur.com/Chc5pLl.jpeg","https://i.imgur.com/HbznJXK.jpeg","https://i.imgur.com/OLKdt61.jpeg","https://i.imgur.com/tDNqmML.jpeg","https://i.imgur.com/yUwx4o4.jpeg","https://i.imgur.com/e4xWHUv.jpeg","https://i.imgur.com/q6LfLx0.jpeg","https://i.imgur.com/eoKKdzI.jpeg","https://i.imgur.com/n3DS2ha.jpeg","https://i.imgur.com/E5QWGCE.jpeg","https://i.imgur.com/44YNGf6.jpeg","https://i.imgur.com/fh8i2Ph.jpeg","https://i.imgur.com/EMazlEj.jpeg","https://i.imgur.com/Uz4RQSg.jpeg","https://i.imgur.com/INxT1BF.jpeg","https://i.imgur.com/jnU2FrO.jpeg","https://i.imgur.com/qFDKN6v.jpeg","https://i.imgur.com/m84lelb.jpeg","https://i.imgur.com/FmMsaOR.jpeg","https://i.imgur.com/Ln7It9C.jpeg","https://i.imgur.com/SZ9KznS.jpeg","https://i.imgur.com/WypMeee.jpeg","https://i.imgur.com/Zq9sgX0.jpeg","https://i.imgur.com/kIvSt9A.jpeg","https://i.imgur.com/g3R1fQh.jpeg","https://i.imgur.com/jv1LGtq.jpeg","https://i.imgur.com/lKkm83o.jpeg","https://i.imgur.com/Yuai95W.jpeg","https://i.imgur.com/FNWIrNo.jpeg","https://i.imgur.com/YUOScB2.jpeg","https://i.imgur.com/Gd8K8Cg.jpeg","https://i.imgur.com/R0mvOeZ.jpeg","https://i.imgur.com/GGLiv35.jpeg","https://i.imgur.com/b4hHhSk.jpeg","https://i.imgur.com/45QWr06.jpeg","https://i.imgur.com/uz7bh1h.jpeg","https://i.imgur.com/7blSNAk.jpeg","https://i.imgur.com/r11VKsm.jpeg","https://i.imgur.com/4NyGJmu.jpeg","https://i.imgur.com/HMMe7fV.jpeg","https://i.imgur.com/447Dsfb.jpeg","https://i.imgur.com/BsfPGOF.jpeg","https://i.imgur.com/h0C5puK.jpeg","https://i.imgur.com/qpgBE0X.jpeg","https://i.imgur.com/f0HFaCv.jpeg","https://i.imgur.com/a4vo9Cv.jpeg","https://i.imgur.com/J7PAAuR.jpeg","https://i.imgur.com/OG7CCAz.jpeg","https://i.imgur.com/tqnzYDJ.jpeg","https://i.imgur.com/3ItPOnW.jpeg","https://i.imgur.com/yCkue9w.jpeg","https://i.imgur.com/jx6VfM6.jpeg","https://i.imgur.com/52cEmKs.jpg","https://i.imgur.com/9xLfitZ.jpg","https://i.imgur.com/RJ3Lou6.jpg","https://i.imgur.com/dwAKjDy.jpg","https://i.imgur.com/qBlbbCX.jpg","https://i.imgur.com/lGowut2.jpg"
     ];
     var callback = () => api.sendMessage({body:`╭───────•◈•────────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n💜✨⎯͢⎯⃝♡❥⎯ͨ⎯ͧ⎯ͭ͢⎯ͤ۵⎯͢♡✨🌿\n\n___ღ࿐༅༎✨ 𝐅𝐞𝐞𝐋 𝐓𝐡𝐢𝐬 𝐋𝐢𝐧𝐞 :)>🧡\n\n- তোমাকে পাইনি বলে তুমি আমার ex না -/ 😊 তুমি আমার না পাওয়া এক পবিত্র ভালোবাসা -/💜\n\n✨⎯͢⎯⃝♡❥⎯ͨ⎯ͧ⎯ͭ͢⎯ͤ۵⎯͢♡✨🌿\n\n𝗠𝗔𝗗𝗘 𝗕𝗬:\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰───────•◈•────────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
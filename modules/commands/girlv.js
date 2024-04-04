module.exports.config = {
  name: "girlvideo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ALVI CHOWDHURY",
  description: "GIRL STATUS VEDIO",
  commandCategory: "GIRL STATUS VIDEO",
  usages: "Status video",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n__//🐰🙅‍♂️ উফফ 💋 আহ্ 🥵 \n💋 ইস্ 💋\n উফফ 𝗚𝗼 💋\n আহ্ 𝗕𝗮𝗯𝘆 🥵\n এইগুলো মুখস্ত করো 💁🌚\n সকালে পড়া ধরমু 😾🤧 🫣🪽\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [

  "https://docs.google.com/uc?export=download&id=1DawiOQUSBckYP4kcWj6QPBSPz94BWIUJ","https://docs.google.com/uc?export=download&id=1Gc_OnYGPPSgaE6kPI7RPHRhWPwe9MBdN","https://docs.google.com/uc?export=download&id=1GUxLPXj9kAdL7F1MxHsFJZMBttqpDOb4","https://docs.google.com/uc?export=download&id=1DeBik55mWBCHpJKgrBT0xNStxPVachgW","https://docs.google.com/uc?export=download&id=1Ghnx7nMCplG4d8I_xSWWe6BZSAFgRspj","https://docs.google.com/uc?export=download&id=1GUQJZYCYQmpYl83o0CcOxnsoC9C0kvjK","https://docs.google.com/uc?export=download&id=1Hpu3XWiZwpByelw88ef-wAioQjNS6Koa","https://docs.google.com/uc?export=download&id=1HelQwAtAyOG9mLnoZT6o6lyXTGF8g9Hc","https://docs.google.com/uc?export=download&id=1HLXduymqePP7vbHVNe-hR2V_XQigChiZ","https://docs.google.com/uc?export=download&id=1HFUhx_Dd39U-9AmjCNky20cfl5muN301","https://docs.google.com/uc?export=download&id=1HEoCHXnnnDBxwY0LHi2WPe_QXkasVmOq","https://docs.google.com/uc?export=download&id=1H7QofEMsDnsMvZe0PEyXrjwfg7PAR1vb","https://docs.google.com/uc?export=download&id=1H389OrKf0dboIfTobyALuueGTTnVDinE","https://docs.google.com/uc?export=download&id=1J4SYoF0VZAof_d5TzcXjgYCw_V6HXFFi","https://docs.google.com/uc?export=download&id=1J3cs7GtAaF_BpKePvkl7pFHJQ4orYVRJ","https://docs.google.com/uc?export=download&id=1J0K8-lKfqWMr0ACvYNdX5SWGrpSRt3BT","https://docs.google.com/uc?export=download&id=1IumFe6sshNrYWfcoJk6qNMEdju-gu7am","https://docs.google.com/uc?export=download&id=1IpsM14OqAQ2SSyARfGjqlAWetzCunKiC","https://docs.google.com/uc?export=download&id=1ImY9Z3pBnXSFHzHfHfXJ8Aismr36glbj","https://docs.google.com/uc?export=download&id=1Ijcki7IG6SRHxiso-kM7cOTHZhlEJmlp","https://docs.google.com/uc?export=download&id=1Ib19ibDGpRa_KpTdE5tsZPCMNji9XP2u","https://docs.google.com/uc?export=download&id=1IaeDKKa9CjqvVWoxPJebTSk1bzaV8Is9","https://docs.google.com/uc?export=download&id=1IZ7Yu-TsNumb27SUhkdZecYm27gfBAa2","https://docs.google.com/uc?export=download&id=1J9alVPXRz5VstiunCjPTrCFP5d4B4XrE","https://docs.google.com/uc?export=download&id=1J7Mv7v3izDNwL8BaInpLEvUPrTMVQyNw"
];
     var callback = () => api.sendMessage({body:` ${know} `,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };
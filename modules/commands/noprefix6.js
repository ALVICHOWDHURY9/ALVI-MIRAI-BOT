/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "kaal",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ayush Shukla",
  description: "Random ảnh gái khi dùng dấu lệnh",
  commandCategory: "Hình ảnh",
  usages: "ig",
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
   var hi = ["●▬▬๑۩۩ 𝐀𝐫𝐮𝐧 𝐊𝐮𝐦𝐚𝐫 IS MY BOSS۩۩๑▬▬😍😍😍 .... 😋😋😋😋 JOIN OUR FB GROUP ...KAAL LOK 👉🏻♦️ https://www.facebook.com/groups/207371140648761/?ref=share ✨"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://i.postimg.cc/tTGGwwfJ/Picsart-23-03-26-11-08-19-025.jpg",
    "https://i.postimg.cc/9Fx5CJzm/FB-IMG-1681795514766.jpg",
    "https://i.postimg.cc/fL7pFv6h/FB-IMG-1681795528177.jpg",
];
	 var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/kaal.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };
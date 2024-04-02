/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "alvi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ALVI CHOWDHURY",
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
   var hi = ["╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n•--••✿⃟✺⋆⃝💚𝄞𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬 𝗜𝗦 𝗠𝗬 𝗕𝗢𝗦𝗦𝄞⋆⃝💚••✿⃟✺\n\n⎯͢⎯⃝🩷🌻💚😽\n\n✿┼─🐼⛈️🖇️༊_আমাকে༎ভালো༎লাগে༎না༎ সমস্যা༎নাই༎﹏😊💜🌻🔐\n\n___ 🌺 ༅༎কারণ༎🧘‍♂️🚴‍♂️\n\n༊_আপনার༎ভালো༎লাগার༎জন্য༎আমার༎জন্ম༎হয়༎নাই༎﹏🤟😊🎭💙🦋🙂\n\n𝑰𝑻’𝑺 𝑴𝒀 𝑨𝑻𝑻𝑰𝑻𝑼𝑫𝑬\n\n⎯͢⎯⃝🩷🌻💚😽\n\n\n𝚈𝙾𝚄 𝙲𝙰𝙽 𝙺𝙽𝙾𝙲𝙺 𝙼𝙴 𝙵𝙾𝚁  𝙰𝙽𝚈 𝙿𝚁𝙾𝙱𝙻𝙴𝙼𝚂\n\nཐི༏ཋྀ𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿ཐི༏ཋྀ :- wa.me+60135647836\n\nཐི༏ཋྀ𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼ཐི༏ཋྀ :- https://www.instagram.com/alvixhowdhury420\n\nཐི༏ཋྀ𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺ཐི༏ཋྀ :- https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN \n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = ["https://i.postimg.cc/fTV8nkJh/20230726-020132.jpg", 

            "https://i.postimg.cc/cJzJzDjW/Screenshot-20230730-182443.jpg", 

            "https://i.postimg.cc/N0yxZjDz/Screenshot-20230730-191933.jpg",

"https://i.postimg.cc/W39vdtG7/20230727-235934.jpg",

            ""];
	 var callback = () => api.sendMessage({body:`${know}`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };

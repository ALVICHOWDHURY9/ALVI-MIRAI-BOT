module.exports.config = {
	name: "admin",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "ALVI",
	description: "Admin info",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link =["https://i.postimg.cc/fTV8nkJh/20230726-020132.jpg", 
            
            "https://i.postimg.cc/cJzJzDjW/Screenshot-20230730-182443.jpg", 
            
"https://i.postimg.cc/N0yxZjDz/Screenshot-20230730-191933.jpg",
            
            "https://i.postimg.cc/W39vdtG7/20230727-235934.jpg"];
  
var callback = () => api.sendMessage({body:`🌻-𝗗𝗢 𝗡𝗢𝗧 𝗧𝗥𝗨𝗦𝗧 𝗧𝗛𝗘 𝗕𝗢𝗧 𝗢𝗣𝗘𝗥𝗔 𝗧𝗢𝗥-🌻\n
------------------------------------------------\n🌺-𝗡𝗮𝗺𝗲-🌺       : 𝐌𝐑. 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘\n🍁-𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸-🍁 : 𝐌𝐑.𝐁𝐎𝐒𝐒 𝐀𝐋𝐕𝐈 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘
𝐕𝐈𝐑𝐓𝐔𝐀𝐋 𝐓𝐎𝐏 𝐅𝐌𝐙 𝐊𝐈𝐍𝐆
𝐘𝐎𝐔'𝐑 𝐍𝐄𝐗𝐓 𝐕𝐀𝐓𝐀𝐑 𝐗𝐀𝐍'𝐒
𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐌𝐀𝐒𝐓𝐄𝐑
𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇 𝐇𝐀𝐓𝐄𝐑𝐒
𝐅𝐄𝐄𝐋 𝐓𝐇𝐄 𝐏𝐎𝐖𝐄𝐑 𝐎𝐅
𝐘𝐎𝐔'𝐑 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐃𝐀𝐃\n💚-𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻-💚    : (𝗜𝘀𝗹𝗮𝗺)\n🌸-𝗣𝗲𝗿𝗺𝗮𝗻𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀-🌸 : (𝗗𝗵𝗮𝗸𝗮)\n🌿-𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗔𝗱𝗱𝗿𝗲𝘀𝘀-🌿 :(𝗗𝗵𝗮𝗸𝗮)\n🔥-𝗚𝗲𝗻𝗱𝗲𝗿-🔥     : (𝗠𝗮𝗹𝗲)\n♻️-𝗔𝗴𝗲-♻️            :  N/A\n🔰-𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽-🔰 : (SINGEL)\n✴️-𝗪𝗼𝗿𝗸-✴️         : JOB\n📩-𝗚𝗺𝗮𝗶𝗹-📩        :  Alvixhowdhury718@gmail.com\n❇️-𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽-❇️ :  wa.me/+60175570***\n♀️-𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺-♀️  : t.me/চালাই না🥱\n-🌼𝗙𝗯 𝗹𝗶𝗻𝗸-🌼   : https://www.facebook.com/PINIK.MR.ALVI.CHOWDHURY.YOUR.NEXT.VATAR.XAN
`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };

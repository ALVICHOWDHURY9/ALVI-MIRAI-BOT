const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Fixed By Arun Kumar",
  description: "goibot2",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["Main Tenu Smjhava ki, Naa Yere bina lagda jee, tu ki jaane pyar mera , me kru intezaar tera .." , "Tere ishq me pagal hogya, Diwana Tera Re, sach hote hote hogya afsana mera re" , "Chahat Kasam Nahin Hai, Koi Rasam Nahin Hai ,Dil Ka vaham Nahin Hai Pana Hai Tujhko Khwabon Mein Gaon Jiska, rasta na aam jiska , Chahat Hai Naam Jiska, Pana Hai Tujhko" , "Kyu Bewaja di Ye saza ,kyu Khwab deke wo legy, jiye jo hum, lage sitam , azab ese wo degya.." , "Jaati hu me , jaldj hai kya ,dhadke jiya , wo kyu bhala , khud se hi darne lagi hu , me pyar krne lgi hu" , "Tu naa jaan di, ha kaarobar ni, jaali number plate lagi car di, saare yaar ni bethe bahr ni, kde jaan ni jo lga dabb nall , ha face utte a glow, puchi naa tikaane sare rhnde aa ni low, ek do" , "kehndi hundi si chann tak raah banade , taare ne pasand menu heyha saare laade , ohna tareya de vicho jado menu dekhegi ni meri yaad jado au, odo pata laggu ga" , "Ham Tere Bin Ab Rah Nahin Sakte Tere Bina Kya wajood Mera Tujhse Judaa Gar Ho Jaenge Khud Se Hi Ho Jaenge Juda" , "Kal raaste me , gum mil gya tha, lag ke gale me ro diy ,jo sirf mera , tha sirf mera , mene use ku kho diya , haa wo ankhe jinhe me chum ta bewajah , pyaar mere liye kyu unme baki naa rha .." , " Tu Aata Hai Seene Mein Jab Jab Saanse Bharti Hun Tere Dil Ki Galiyon se main har roj Gujarti hun Hawa ke jaise chalta hai tu main ret Jaise Murti hun Kaun Tujhe Yun Pyar Karega Jaise Main Karti hun" , "waqt Bhi thahara Hai Kaise Kyun ye Hua Kash Tu Aise Aaye Jaise koi Dua Yeh Meri zamanat Hai Tu Meri Ibadat Hai Apne Karm Ki Kar adaen Kar Le idhar Bhi Tu Nigahen Sun Raha Hai Na Tu Ro Raha Hun Main" , "Kyon Ek Pal Ki Bhi Judaai sahi jaaye na kyon Har Subah Tu Meri Sanson Mein Samaye na Aaja Na Tu mere pass Dunga Itna Pyar Kitni Raat Gujari hai tere Intezar Mein" , " uska hun ,usmein hun ,use hun Usi Ka Rahane De Main To Pyasa Hoon Hai Dariya O zariya wo Jeene Ka Mere, Dil Mujhe De Agar ,Dard De uska per ,uski ho vah Hansi Gunje Jo Mera Ghar" , "Ese jaruri ho mujhko tum, jese hawaye saaso ko,ese talashu me tumko , jese ke per zamino ko,hasna ya rona ho mujhe, pagal sa dhundo me tumhe, kal mujhse mohabbat ho na ho , kal mujhko ijazat ho na ho ,toote dil ke tookde lekar tere dar pe bi reh jauga, mai phir b tumko chahuga ❤😓" , "mai jarurat hu teri , tu jaroori hai mujhe , maanta hu bin tere hai adhoori mehfile, kam nahi jashn se ye akelapan mera , sath h raat din ye diwana pan mera , tou mujhe na kbhi mud k awaj du me sunuga tumhe har jagah , mene tera nam dil❤ rkh diya" , "Tumhe bolna pasand hai , mujhe bolte huye tum , tumhe hasna psand hai , mujhe haste huye tum, bas itna hi fark hai, teri meri pasnd me, tum ye sab pasnd hai aur mujhe pasnd ho tum" , "Jo bhi jitne pal jiyu unhe tere sang jiu, jo bhi kal ho ab mera , use tere sang jiyu , jo bhi saanse me bhru unhe tere sang bharu , chahe jo ho rasta ,use sang chalu"]
  var rand = tl[Math.floor(Math.random() * tl.length)]
   mess = "{name}"

  if (event.body.indexOf("Song") == 0 || (event.body.indexOf("song") == 0)) {
    var msg = {
      body: `𝗛𝗲𝗹𝗹𝗼 🎵${name}🔊,  \n\n𝗧𝗵𝗶𝘀 𝗶𝘀 𝗙𝗼𝗿 𝘆𝗼𝘂💞 »»\n『\n   ${rand}  』\n\n𝙲𝚛𝚎𝚍𝚒𝚝𝚜»» ◎ 𝗔𝗿𝘂𝗻 𝗞𝘂𝗺𝗮𝗿 ◎`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
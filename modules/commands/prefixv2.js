const sendWaiting = true; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát";
const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 28
const colorName = "#00FFFF"

module.exports.config = {
  name: "prefixv2",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "CHORU-TIKTOKERS",
  description: "Tạo card thông tin người dùng facebook",
  commandCategory: "Nhóm",
  usages: "",
  cooldowns: 10,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  if ((this.config.credits) != "CHORU-TIKTOKERS") { return api.sendMessage(`⚡️Current credits have been changed`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
	const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("»D/MM/YYYY HH:mm:ss«");
const timeStart = Date.now();
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/K692bGa.jpeg`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#FFCC33";
  ctx.textAlign = "start";
  fontSize = 30;
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#FFCC33";
  ctx.textAlign = "start";
  fontSize = 100;
  ctx.fillText(`>>  Today is:   ${juswa}`, 70, 180);
  ctx.fillText(`>>  Bot is up and running ${hours}:${minutes}:${seconds}`, 70, 230);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    {body: `Prefix: ${global.config.PREFIX}\nToday is ${juswa}\nBot is up and running ${hours}:${mins}:${seconds}`, attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
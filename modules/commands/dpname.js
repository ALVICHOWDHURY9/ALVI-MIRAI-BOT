module.exports.config = {
  name: "dpname",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ALVI",
  description: "dpname maker",
  commandCategory: "dpname",
  usages: "text 1 + text 2",
  cooldowns: 1
};
module.exports.wrapText = (ctx, text, maxWidth) => {
  return new Promise((resolve) => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const Canvas = global.nodemodule["canvas"];
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + `/cache/drake.png`;
  const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\=)/g, "+").replace(/\|\s+/g, "+").split("+");
  let getImage = (
    await axios.get(encodeURI(`https://i.imgur.com/Vu0AYmH.jpg`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getImage, "utf-8"));
if(!fs.existsSync(__dirname+'/cache/SNAZZYSURGE.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=11YxymRp0y3Jle5cFBmLzwU89XNqHIZux&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SNAZZYSURGE.ttf", Buffer.from(getfont, "utf-8"));
    };
  let baseImage = await loadImage(pathImg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  Canvas.registerFont(__dirname+`/cache/SNAZZYSURGE.ttf`, {
        family: "SNAZZYSURGE"
    });
  ctx.font = "30px SNAZZYSURGE";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  const line = await this.wrapText(ctx, text[0], 400);
  const lines = await this.wrapText(ctx, text[1], 464);
  ctx.fillText(line.join("\n"), 320, 165)
  ctx.fillText(lines.join("\n"), 170, 340)
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
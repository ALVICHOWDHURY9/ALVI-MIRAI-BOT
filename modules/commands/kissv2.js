module.exports.config = {
    name: "kissv2",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "ALVI CHOWDHURY",
    description: "for girls, Kiss the boy you want",
    commandCategory: "Love",
    usages: "kiss [tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/`;
    const path = resolve(__dirname, 'cache', 'hon01.jpeg');
    if (!existsSync(dirMaterial + "")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/j96ooUs.jpeg", path);

}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache");

    let hon_img = await jimp.read(__root + "/hon01.jpeg");
    let pathImg = __root + `/hon01_${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    hon_img.resize(700, 440).composite(circleOne.resize(150, 150), 390, 23).composite(circleTwo.resize(150, 150), 115, 130);

    let raw = await hon_img.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args, Currencies }) { 
    const fs = global.nodemodule["fs-extra"];
    const hc = Math.floor(Math.random() * 101);
    const rd = Math.floor(Math.random() * 100000) + 100000;
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    var one = senderID, two = mention[0];
  await Currencies.increaseMoney(event.senderID, parseInt(hc*rd));

  if (!two) return api.sendMessage("Please tag 1 person", threadID, messageID);
  else {
        return makeImage({ one, two }).then(path => api.sendMessage({ body: `╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n︵ღ᭄🌺🌸༊࿐💙\n\n      ____ღ۵-🌺🦋“𝙉𝙚𝙫𝙚𝙧 𝙘𝙝𝙚𝙖𝙩 𝙨𝙤𝙢𝙚𝙤𝙣𝙚 𝙬𝙝𝙤 𝙘𝙡𝙤𝙨𝙚 𝙮𝙤𝙪𝙧 𝙚𝙮𝙚𝙨 𝙖𝙣𝙙 𝙗𝙚𝙡𝙞𝙚𝙫𝙚 𝙞𝙣 𝙮𝙤𝙪 𝙗𝙚𝙘𝙖𝙪𝙨𝙚 𝙥𝙚𝙤𝙥𝙡𝙚 𝙖𝙧𝙚 ⧼𝙡𝙪𝙘𝙠𝙮⧽.🍂🌻\n\n     ____ღ۵-🌺🦋“যে আপনাকে চোখ বন্ধ করে বিশ্বাস করে তাকে কোনোদিন ঠকাবেন না কারণ এমন মানুষ ভাগ্যবানেরাই পেয়ে থাকে।🍂🌻\n\n︵ღ᭄🌺🌸༊࿐💙\n\n  𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯`, attachment: fs.createReadStream(path)}, threadID, () => fs.unlinkSync(path), messageID));
  }
}

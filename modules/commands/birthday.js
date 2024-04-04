module.exports.config = {
    name: "birthday",
    version: "7.3.1",
    hasPermssion: 0,
    credits: "Alvi Chowdhury",///don't change my Credit Coz i Edit 
    description: "birthday frame from Mention",
    commandCategory: "tagfun",
    usages: "[@mention]",
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
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'fram.jpeg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/DxeAo1r.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let batgiam_img = await jimp.read(__root + "/fram.jpeg");
    let pathImg = __root + `/batman${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.jpeg`;
    let avatarTwo = __root + `/avt_${two}.jpeg`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    batgiam_img.composite(circleOne.resize(200, 200), 540, 90).composite(circleTwo.resize(280, 280), 108, 108);
    
    let raw = await batgiam_img.getBufferAsync("image/jpeg");
    
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

module.exports.run = async function ({ event, api, args }) {    
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
    else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: `╭──────•◈•───────╮\n         🄰🄻🅅🄸🄱🄾🅃       \n\n┓┏┓🎈
┃┗┛ᴀᴘᴘʏ_🎂🎆🎉
┃┏┓┃　🄱🄸🅁🅃🄷🄳🄰🅈🎉🎆🎇
┗┛┗┛       
𝐇𝐚𝐩𝐩𝐲 𝐛𝐢𝐫𝐭𝐡𝐝𝐚𝐲 𝐭𝐨 𝐲𝐨𝐮  বন্ধু🥰 
❤️❤️😍💝💝🍭🍭🍬🎂🎁🎊
𝒃𝒊𝒓𝒕𝒉𝒅𝒂𝒚 𝒄𝒂𝒑𝒕𝒊𝒐𝒏 𝒊𝒔 𝒔𝒉𝒐𝒓𝒕 𝒃𝒖𝒕 𝒘𝒊𝒔𝒉𝒊𝒏𝒈 𝒚𝒐𝒖 𝒆𝒗𝒆𝒓𝒚𝒕𝒉𝒊𝒏𝒈 𝒕𝒉𝒂𝒕 𝒃𝒓𝒊𝒏𝒈𝒔 𝒉𝒂𝒑𝒑𝒊𝒏𝒆𝒔𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖 𝒕𝒐𝒅𝒂𝒚 𝒂𝒏𝒅 𝒂𝒍𝒘𝒂𝒚𝒔,𝒎𝒂𝒚  𝕪𝕠𝕦𝕣  𝒅𝒓𝒆𝒂𝒎𝒔  𝕔𝕠𝕞𝕖  𝒕𝒓𝒖𝒆❤𝒎𝒂𝒚 𝒕𝒉𝒆𝒔𝒆 𝒚𝒆𝒂𝒓 𝒃𝒆 𝒆𝒗𝒆𝒏 𝒘𝒐𝒏𝒅𝒆𝒓𝒇𝒖𝒍 𝒂𝒏𝒅 𝒃𝒍𝒆𝒔𝒔𝒆𝒅🤗𝒎𝒂𝒏𝒚 𝒎𝒂𝒏𝒚 𝒉𝒂𝒑𝒑𝒚 𝒓𝒆𝒕𝒖𝒓𝒏𝒔 𝒐𝒇 𝒕𝒉𝒆 𝒅𝒂𝒚 𝒊𝒏 𝒚𝒐𝒖𝒓 𝒍𝒊𝒇𝒆.𝑺𝒉𝒊𝒏𝒆 𝒚𝒐𝒖𝒓 𝒍𝒊𝒇𝒆 𝒉𝒂𝒗𝒆 𝒂 𝒃𝒍𝒂𝒔𝒕!❤𝑰 𝒘𝒊𝒔𝒉 𝒚𝒐𝒖 𝒂𝒍𝒍 𝒕𝒉𝒆 𝒃𝒆𝒔𝒕 𝒐𝒏 𝒕𝒉𝒊𝒔 𝒔𝒑𝒆𝒄𝒊𝒂𝒍 𝒅𝒂𝒚❤😚
𝑺𝒕𝒂𝒚 𝒃𝒆𝒂𝒖𝒕𝒊𝒇𝒖𝒍😻
𝑺𝒕𝒂𝒚 𝒉𝒖𝒎𝒃𝒍𝒆💫
𝑺𝒕𝒂𝒚 𝒉𝒆𝒂𝒍𝒕𝒉𝒚💝
𝑺𝒕𝒂𝒚 𝒉𝒂𝒑𝒑𝒚😍

❤️❤️😍💝💝🍭🍭
"𝐈 𝐰𝐢𝐬𝐡 𝐲𝐨𝐮 𝐡𝐚𝐩𝐩𝐢𝐧𝐞𝐬𝐬 𝐨𝐧 𝐭𝐡𝐢𝐬 𝐰𝐨𝐧𝐝𝐞𝐫𝐟𝐮𝐥 𝐝𝐚𝐲! 

😍😍𝐇𝐀𝐏𝐏𝐘 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘🎂🎂 𝐛e𝐢𝐧𝐠 m𝐨𝐫𝐞

 𝐡𝐚𝐩𝐩𝐢𝐧𝐞𝐬𝐬 𝐚𝐧𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬 𝐢𝐧 our 𝐥𝐢𝐟𝐞🤘

#Happy_Birthday_ 🎂🎂 💓

💓#happybirthdaywishes 

Many many happy 😊 returns of the day 🖤🖤🖤
 
💕#ℍᗅℙℙℽ_ℬⅈℛᝨℍⅅay #_Dear_Friend  🎂🎂🎂🍰🍰\n\n𝗠𝗔𝗗𝗘 𝗕𝗬:\n 𝗠𝗥. 𝗔𝗟𝗩𝗜 𝗖𝗛𝗢𝗪𝗗𝗛𝗨𝗥𝗬\n╰──────•◈•───────╯`, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
                                }

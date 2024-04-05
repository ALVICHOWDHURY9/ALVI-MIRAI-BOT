const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
              publishDate:
data.videoDetails.publishDate,                    
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "song",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "music",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/1.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('The file cannot be sent because it is larger than 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
		body: `====『 𝗠𝗨𝗦𝗜𝗖 』====
[🎼] ➠ 𝐓𝐢𝐭𝐥𝐞: ${data.title}\n[📺] ➠ 𝘼𝙪𝙩𝙝𝙤𝙧: ${data.author}\n[⏰] ➠ 𝙏𝙞𝙢𝙚: ${this.convertHMS(data.dur)}\n[👀] ➠ 𝙑𝙞𝙚𝙬𝙨: ${data.viewCount}\n[💞] ➠ 𝙇𝙞𝙠𝙚𝙨: ${data.likes}\n 𝙋𝙪𝙗𝙡𝙞𝙨𝙝 𝘿𝙖𝙩𝙚: ${data.publishDate}\n[⏳] ➠ 𝙋𝙧𝙤𝙘𝙘𝙚𝙨𝙨𝙞𝙣𝙜 𝙏𝙞𝙢𝙚: ${Math.floor((Date.now()- data.timestart)/1000)} second\n📺====『 𝗠𝗨𝗦𝗜𝗖 』====📺

  ~THIS BOT PROTECT BY MR. ALVI CHOWDHURY
  __________________________________`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage('» কিরে ভাই গান শুনবি ভলো কথা গানের নাম লেখতে কি কষ্ট হয়😡 এই বার empty!😤\nদিলাম লাগলে আবার কমান্ড কর', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/1.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage(' 25MB se jyada hai send ni hoga.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `➠Title: ${data.title}\n➠Name Kênh: ${data.author}\n➠Thời gian: ${this.convertHMS(data.dur)}\n➠Lượt xem: ${data.viewCount}\n➠Lượt thích: ${data.likes}\n➠Thời gian xử lý: ${Math.floor((Date.now()- data.timestart)/1000)} second\n💿====DISME PROJECT====💿`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
            }
            var body = `»🔎 Have ${link.length}  𝗥𝗲𝘀𝘂𝗹𝘁 𝗶𝗻 𝗹𝗶𝘀𝘁𝗲𝗱 𝗯𝗲𝗹𝗹𝗼𝘄:\n\n⭓═════🄻🄸🅂🅃═════⭓\n\n${msg}⭓════════════════⭓\n\n🛑তুমি যেই'টা শুনতে চাও, এই মেসেজে Reply দাও🛑!»`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('Erorr 🗡 please try + Music !\n' + e, event.threadID, event.messageID);
        }
    }
                             }

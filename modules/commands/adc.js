module.exports.config = {
    name: "adc",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Arun",
    description: "Apply code from buildtooldev and pastebin",
    commandCategory: "Admin",
    usages: "[reply or text]",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};
module.exports.run = async function ({ api, event, args }) {
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name) return api.sendMessage('𝙂 𝘽𝘼𝘽𝙐 𝙆𝙄𝘼 𝙃𝙐𝘼?', threadID, messageID);
    if(!text && name) {
        var data = fs.readFile(
          `${__dirname}/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`𝘽𝙖𝙗𝙪 𝙔𝙖 ${args[0]} 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝘼𝙥 𝙆𝙖 𝘽𝙤𝙩 𝙈𝙖 𝙉𝙖𝙝𝙞 𝙃𝙖.`, threadID, messageID);
            const { PasteClient } = require('pastebin-api')
            const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = text.match(urlR);
    if (url[0].indexOf('pastebin') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`𝘽𝙖𝙗𝙪 𝙈𝙖 𝘾𝙤𝙙𝙚 𝘼𝙥𝙥𝙡𝙮 𝙉𝙖𝙝𝙞 𝙆𝙖𝙧 𝙋𝙖𝙮𝙖 ${args[0]}.js`, threadID, messageID);
                    api.sendMessage(`𝘽𝙖𝙗𝙮 𝘼𝙥𝙠𝙖 𝘾𝙤𝙙𝙚 𝘼𝙥𝙥𝙡𝙮 𝙃𝙤 𝙂𝙖𝙮𝙖 𝙃𝙖 ${args[0]}.js, 𝘼𝙗 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙇𝙤𝙖𝙙 𝙐𝙨𝙚 𝙆𝙖𝙧𝙤 𝘼𝙥𝙣𝙞 𝙁𝙞𝙡𝙚 𝙆𝙤 𝙇𝙤𝙖𝙙 𝙆𝙖𝙧𝙣𝙖𝙮 𝙆𝙖 𝙇𝙞𝙖𝙮`, threadID, messageID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: messageReply.body
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('𝘽𝙖𝙗𝙮 𝙆𝙞𝙨𝙞 𝙇𝙞𝙣𝙠 𝙎𝙖 𝙍𝙚𝙥𝙡𝙮 𝙆𝙖𝙧𝙤𝙢 𝙉𝙖 𝙅𝙤 𝙎𝙘𝙧𝙞𝙥𝙩 𝘼𝙥 𝘼𝙥𝙣𝙖 𝘽𝙤𝙩 𝙈𝙖 𝘼𝙙𝙙 𝙆𝙖𝙧𝙣𝙖 𝘾𝙝𝙖𝙝𝙩𝙖 𝙃𝙤', threadID, messageID);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`𝘽𝙖𝙗𝙪 𝘼𝙣 𝙚𝙧𝙧𝙤𝙧 𝙤𝙘𝙘𝙪𝙧𝙧𝙚𝙙 𝙬𝙝𝙞𝙡𝙚 𝙖𝙥𝙥𝙡𝙮𝙞𝙣𝙜 𝙩𝙝𝙚 𝙣𝙚𝙬 𝙘𝙤𝙙𝙚 𝙩𝙤 "${args[0]}.js".`, threadID, messageID);
                        return api.sendMessage(`𝘽𝙖𝙗𝙮 𝘼𝙥𝙠𝙖 𝘾𝙤𝙙𝙚 𝘼𝙥𝙥𝙡𝙮 𝙃𝙤 𝙂𝘼𝙮𝙖 𝙃𝙖 "${args[0]}.js", 𝘼𝙗 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙇𝙤𝙖𝙙 𝙐𝙨𝙚 𝙆𝙖𝙧𝙤 𝘼𝙥𝙣𝙞 𝙁𝙞𝙡𝙚 𝙆𝙤 𝙇𝙤𝙖𝙙 𝙆𝙖𝙧𝙣𝙖𝙮 𝙆𝙖 𝙇𝙞𝙖𝙮`, threadID, messageID);
                    }
                );
            });
        });
        return
    }
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`Added this code "${args[0]}.js" If there is an error, change the drive file to txt!`, threadID, messageID);
      }
      catch(e) {
        return api.sendMessage(`𝘽𝙖𝙗𝙪 𝙈𝙖 𝙉𝙚𝙬 𝘾𝙤𝙙𝙚 𝘼𝙥𝙥𝙡𝙮 𝙉𝙖𝙝𝙞 𝙆𝙖𝙧 𝙋𝙖𝙮𝙖 "${args[0]}.js".`, threadID, messageID);
      }
    }
}
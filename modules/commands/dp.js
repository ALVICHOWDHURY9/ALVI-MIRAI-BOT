
module.exports.config = {
	name: "dp",
	version: "30.0.10",
	hasPermssion: 0,
	credits: "Dark Rulex Team",
	description: "Random Image",
	commandCategory: "random img",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://dark-rulex-vip.0xanupx0.repl.co/dp').then(res => {
//	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/anear.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anear.jpg`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/anear.jpg`)).on("close", callback);
			})
}

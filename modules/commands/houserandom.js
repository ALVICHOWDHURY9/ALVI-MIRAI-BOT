module.exports.config = {
    name: "house",
    version: "9.9.3",
    hasPermision: 0,
    credit: "Choru",
    description: "random houde fact by Choru",
    commandCategory: "random-img",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        var Choru = ['design', 'ok'];
        var Choru1 = Choru[Math.floor(Math.random() * Choru.length)];
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://httpschoru-apicom-replcomphepcomchoruofficial.project-with-my-team.repl.co/house`);
	console.log(res.data);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`Facts about ${Choru1}: ${data.result}`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
}
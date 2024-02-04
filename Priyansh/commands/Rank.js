module.exports.config = {
	name: "level",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Clarence-DK", 
	description: "rank",
	commandCategory: "Group",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": "",
		"jimp": "",
		"node-superfetch": "",
		"canvas": ""
	}
};
//random colorr
function getRandomColor() {
  	var letters = '0123456789ABCDEF';
 	var color = '#';
  	for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports.makeRankCard = async (data) => {    
    /*
    * 
    * Remake from Canvacord
    * 
    */

    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
	const Canvas = global.nodemodule["canvas"];
	const request = global.nodemodule["node-superfetch"];
	const __root = path.resolve(__dirname, "cache");
	const PI = Math.PI;

    const { id, name, rank, level, expCurrent, expNextLevel } = data;

	Canvas.registerFont(__root + "/regular-font.ttf", {
		family: "Manrope",
		weight: "regular",
		style: "normal"
	});
	Canvas.registerFont(__root + "/bold-font.ttf", {
		family: "Manrope",
		weight: "bold",
		style: "normal"
	});
//edit the number of rankcard photos to random
	const pathCustom = path.resolve(__dirname, "cache", "customrank");
	var customDir = fs.readdirSync(pathCustom);
	
	    var dirImage = __root + "/rankcard6.png";


	customDir = customDir.map(item => item.replace(/\.png/g, ""));

	for (singleLimit of customDir) {
		var limitRate = false;
		const split = singleLimit.split(/-/g);
		var min = parseInt(split[0]), max = parseInt((split[1]) ? split[1] : min);
	
		for (; min <= max; min++) {
			if (level == min) {
				limitRate = true;
				break;
			}
		}

		if (limitRate == true) {
			dirImage = pathCustom + `/${singleLimit}.png`;
			break;
		}
	}

	let rankCard = await Canvas.loadImage(dirImage);
	const pathImg = __root + `/rank_${id}.png`;
	
	var expWidth = (expCurrent * 615) / expNextLevel;
	if (expWidth > 615 - 18.5) expWidth = 615 - 18.5;
	
	let avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

	avatar = await this.circle(avatar.body);

	const canvas = Canvas.createCanvas(934, 282);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 45, 50, 180, 180);

	ctx.font = `bold 36px Manrope`;
	ctx.fillStyle = '#06fafe';
	ctx.textAlign = "start";
	ctx.fillText(name, 290, 164);
	ctx.font = `36px Manrope`;
	ctx.fillStyle = '#06fafe';
	ctx.textAlign = "center";

	ctx.font = `bold 37px Manrope`;
	ctx.fillStyle = '#06fe68';
	ctx.textAlign = "end";
	ctx.fillText(level, 610 - 55, 82);
	ctx.fillStyle = '#E0fe06';
	ctx.fillText("Level:", 610 - 55 - ctx.measureText(level).width - 10, 82);

	ctx.font = `bold 32px Manrope`;
	ctx.fillStyle = '#00ffff';
	ctx.textAlign = "end";
	ctx.fillText(rank, 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 25, 82);
	ctx.fillStyle = '#f2f2f2';
	ctx.fillText("#", 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 16 - ctx.measureText(rank).width - 16, 82);

	ctx.font = `bold 26px Manrope`;
	ctx.fillStyle = '#f2f2f2';
	ctx.textAlign = "start";
	ctx.fillText("/ " + expNextLevel, 710 + ctx.measureText(expCurrent).width + 10, 164);
	ctx.fillStyle = '#06fe28';
	ctx.fillText(expCurrent, 710, 164);

	ctx.beginPath();
	ctx.fillStyle = '#08df00';
	ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * PI, 0.5 * PI, true);
	ctx.fill();
	ctx.fillRect(257 + 18.5, 147.5 + 36.25, expWidth, 37.5);
	ctx.arc(257 + 18.5 + expWidth, 147.5 + 18.5 + 36.25, 18.75, 1.5 * PI, 0.5 * PI, false);
	ctx.fill();

	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
	return pathImg;
}

module.exports.circle = async (image) => {
    const jimp = global.nodemodule["jimp"];
	image = await jimp.read(image);
	image.circle();
	return await image.getBufferAsync("image/png");
}

module.exports.expToLevel = (point) => {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
}

module.exports.levelToExp = (level) => {
	if (level <= 0) return 0;
	return 3 * level * (level - 1);
}

module.exports.getInfo = async (uid, Currencies) => {
	let point = (await Currencies.getData(uid)).exp;
	const level = this.expToLevel(point);
	const expCurrent = point - this.levelToExp(level);
	const expNextLevel = this.levelToExp(level + 1) - this.levelToExp(level);
	return { level, expCurrent, expNextLevel };
}

module.exports.onLoad = async function () {
	const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
	const path = resolve(__dirname, "cache", "customrank");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
//File download function is available including font or rankcard (can be changed)
    if (!existsSync(resolve(__dirname, 'cache', 'regular-font.ttf'))) await downloadFile("https://github.com/J-JRT/JRT_main/blob/mainV2/modules/commands/cache/regular-font.ttf?raw=true", resolve(__dirname, 'cache', 'regular-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'bold-font.ttf'))) await downloadFile("https://github.com/J-JRT/JRT_main/blob/mainV2/modules/commands/cache/bold-font.ttf?raw=true", resolve(__dirname, 'cache', 'bold-font.ttf'));
  if (!existsSync(resolve(__dirname, 'cache', 'rankcard6.png'))) await downloadFile("https://i.postimg.cc/X7VdRM0v/20231205-204200.jpg", resolve(__dirname, 'cache', 'rankcard6.png'));
  

}

module.exports.run = async ({ event, api, args, Currencies, Users, Threads }) => {
	const fs = global.nodemodule["fs-extra"];
	
  let dataAll = (await Currencies.getAll(["userID", "exp"]));
	const mention = Object.keys(event.mentions);
            
  dataAll.sort((a, b) => {
		if (a.exp > b.exp) return -1;
		if (a.exp < b.exp) return 1;
	});
  
 
if (args.length == 0) {
 const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
  const listUserID = event.participantIDs
    var id = listUserID
      exp = [];
      for(const idUser of listUserID) {
      const countMess = await Currencies.getData(event.senderID) || await Currencies.getData(id);
      exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
  }
      exp.sort(function (a, b) { return b.exp - a.exp });
      const pek = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1; const infoUser = exp[pek- 1];
 const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(event.senderID)) + 1; 

  
		if (rank == 0) return api.sendMessage("You are currently not in the database so can't see your rank, please try again in 5 seconds.", event.threadID, event.messageID);

		const point = await this.getInfo(event.senderID, Currencies);
		let pathRankCard = await this.makeRankCard({ id: event.senderID, name, rank, ...point })

const msg = infoUser.exp;
  const level1 = this.expToLevel(msg);
	const expNextLevel1 = this.levelToExp(level1 + 1) - msg;

  
  api.setMessageReaction("✅", event.messageID, (err) => {}, true)
		return api.sendMessage({body: `           𝗥𝗔𝗡𝗞𝗖𝗔𝗥𝗗\n𝐍𝐚𝐦𝐞:->${name}\n𝐑𝐚𝐧𝐤:->   ${rank} \n𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬:-->   ${infoUser.exp}\n𝐋𝐞𝐯𝐞𝐥:-->   ${level1}  \n𝐌𝐬𝐠 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐟𝐨𝐫 𝐍𝐞𝐱𝐭 𝐋𝐞𝐯𝐞𝐥:-->   ${expNextLevel1}\n               ©- 𝐀𝐲𝐮𝐬𝐡 𝐒𝐡𝐮𝐤𝐥𝐚'𝒔 𝑩𝑶𝑻`, attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
}                                       
                                
	if (mention.length == 1) {
    
  const listUserID = event.participantIDs
    var id = listUserID
      exp = [];
      for(const idUser of listUserID) {
      const countMess = await Currencies.getData(idUser) || await Currencies.getData(id);
      exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
  }
      exp.sort(function (a, b) { return b.exp - a.exp });
      const pek = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1; const infoUser = exp[pek- 1];
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(mention[0])) + 1;
	const name = global.data.userName.get(mention[0]) || await Users.getNameUser(mention[0]);
		if (rank == 0) return api.sendMessage("Your Rank is lower than 5, Please try again later.", event.threadID, event.messageID);
		let point = await this.getInfo(mention[0], Currencies);

const msg = infoUser.exp;
  const level1 = this.expToLevel(msg);
	const expNextLevel1 = this.levelToExp(level1 + 1) - msg;


    
		let pathRankCard = await this.makeRankCard({ id: mention[0], name, rank, ...point })
    api.setMessageReaction("✅", event.messageID, (err) => {}, true)
		return api.sendMessage({body: `           𝗥𝗔𝗡𝗞𝗖𝗔𝗥𝗗\n𝐍𝐚𝐦𝐞:->${name}\n𝐑𝐚𝐧𝐤:->   ${rank} \n𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬:-->   ${infoUser.exp}\n𝐋𝐞𝐯𝐞𝐥:-->   ${level1}  \n𝐌𝐬𝐠 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐟𝐨𝐫 𝐍𝐞𝐱𝐭 𝐋𝐞𝐯𝐞𝐥:-->   ${expNextLevel1}\n               ©- 𝐀𝐲𝐮𝐬𝐡 𝐒𝐡𝐮𝐤𝐥𝐚'𝒔 𝑩𝑶𝑻`, attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length > 1) {
		for (const userID of mention) {
      
const listUserID = event.participantIDs
    var id = listUserID
      exp = [];
      for(const idUser of listUserID) {
      const countMess = await Currencies.getData(idUser) || await Currencies.getData(id);
      exp.push({"name" : idUser.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": idUser});
  }
      exp.sort(function (a, b) { return b.exp - a.exp });
      const pek = exp.findIndex(info => parseInt(info.uid) == parseInt(idUser)) + 1; const infoUser = exp[pek- 1];
	
			const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(userID)) + 1;
  //  const infoUser = exp[rank - 1];
		const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
			if (rank == 0) return api.sendMessage("Your Rank is lower than 5, Please try again later.", event.threadID, event.messageID);
			let point = await this.getInfo(userID, Currencies);

const msg = infoUser.exp;
  const level1 = this.expToLevel(msg);
	const expNextLevel1 = this.levelToExp(level1 + 1) - msg;

      
			let pathRankCard = await this.makeRankCard({ id: userID, name, rank, ...point })
			return api.sendMessage({body: `           𝗥𝗔𝗡𝗞𝗖𝗔𝗥𝗗\n𝐍𝐚𝐦𝐞:->${name}\n𝐑𝐚𝐧𝐤:->   ${rank} \n𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬:-->   ${infoUser.exp}\n𝐋𝐞𝐯𝐞𝐥:-->   ${level1}  \n𝐌𝐬𝐠 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐟𝐨𝐫 𝐍𝐞𝐱𝐭 𝐋𝐞𝐯𝐞𝐥:-->   ${expNextLevel1}\n               ©-𝐀𝐲𝐮𝐬𝐡 𝐒𝐡𝐮𝐤𝐥𝐚'𝒔 𝑩𝑶𝑻`, attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
		}
	}
}

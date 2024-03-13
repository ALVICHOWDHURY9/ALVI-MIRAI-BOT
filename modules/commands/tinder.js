module.exports.config = {
	name: "tinder",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "User scanning",
	commandCategory: "Love",
	usages: "/Tinder Boys or Girls or All",
	cooldowns: 1
};

const axios = require('axios');

module.exports.run = async ({ api, event, args, getText, Users, Currencies }) => {
	const targetID = global.data.allUserID[Math.floor(Math.random() * global.data.allUserID.length)];
	const genderTarget = ["boy", "nam", "trai"].includes((args[0] || '').toLowerCase()) ?
		'MALE' : ['girl', 'gái', 'daughter', 'nữ'].includes((args[1] || '').toLowerCase()) ? 'FEMALE' : 'ALL';
	console
	let data = await getInfo(api, targetID);
	let countLoop = 0;
	if (genderTarget != 'ALL')
		while (genderTarget != data.gender) {
			countLoop++;
			const targetID = global.data.allUserID[Math.floor(Math.random() * global.data.allUserID.length)];
			data = await getInfo(api, targetID);
			if (countLoop == 10)
				return api.sendMessage("Sorry, didn't find the right user for you", event.threadID, event.messageID);
		}

	const {
		name,
		gender,
		id,
		url,
		username,
		shortname,
		friend,
		cv,
		mess,
		chucvu,
		block
	} = data;

	const msg = `====[TINDER 🔥]====\n❤️‍🔥 I would like to introduce you ❤️‍🔥 \nName: ${name}\n👁Main name: ${shortname}\n🤳Username: ${username == true ? "not used" : username}\n👀Gender: ${gender == "MALE" ? "Male" : "Female"}\n🏷Uid: ${id}\n🤝Friends: ${friend == true ? "Befriended with bot" : "Unfriended bots"}\n👋${mess == true ? "Messaged with bot" : "haven't texted with a bot yet"}\n🙄${block == true ? "Bot messages blocked" : "Don't block bot messages"}\n🗺Business: ${cv == null ? "without" : cv}\n💌Duty: ${chucvu == null ? "Without" : chucvu}\n🔗 Link FB: ${url}\n====[TINDER 🔥]====`;
	const avatar = (await axios.get(`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
		{ responseType: "stream" })).data;
	avatar.path = 'avatar.png';
	return api.sendMessage({ body: msg, attachment: avatar }, event.threadID, event.messageID);
};

async function getInfo(api, userID) {
	const cc = await api.getUserInfoV5(userID);
	const name = cc[0].o0.data.messaging_actors[0].name;
	const gender = cc[0].o0.data.messaging_actors[0].gender;
	const id = cc[0].o0.data.messaging_actors[0].id;
	const url = cc[0].o0.data.messaging_actors[0].url;
	const username = cc[0].o0.data.messaging_actors[0].username;
	const shortname = cc[0].o0.data.messaging_actors[0].short_name;
	const friend = cc[0].o0.data.messaging_actors[0].is_viewer_friend;
	const cv = cc[0].o0.data.messaging_actors[0].work_info;
	const mess = cc[0].o0.data.messaging_actors[0].is_messenger_user;
	const chucvu = cc[0].o0.data.messaging_actors[0].is_employee;
	const block = cc[0].o0.data.messaging_actors[0].is_message_blocked_biewer;
	return {
		name,
		gender,
		id,
		url,
		username,
		shortname,
		friend,
		cv,
		mess,
		chucvu,
		block
	};
    }
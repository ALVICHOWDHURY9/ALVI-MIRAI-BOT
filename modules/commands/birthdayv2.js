module.exports.config = {
name: "birthdayv2",
version: "1.0.0",
hasPermssion: 2,
credits: "... - Long LTD",
description: "War nát cái boxchat",
commandCategory: "group",
usages: "war đậm chất",
cooldowns: 10,
dependencies: {
"fs-extra": "",
"axios": ""
}
}

module.exports.run = async function({ api, args, Users, event}) {
var mention = Object.keys(event.mentions)[0];

let name = event.mentions[mention];
var arraytag = [];
arraytag.push({id: mention});
var a = function (a) { api.sendMessage(a, event.threadID); }
a(" বস আলভী চৌধুরী'র পক্ষ থেকে তোমাকে জন্মদিনের শুভেচ্ছা\nHAPPY BIRTHDAY😍!");
setTimeout(() => {a({body: "আরো একটি বছর করলে তুমি পার। সুস্থ থাকো, ভালো থাকো এই কামনাই করি বার বার।🥰শুভ জন্মদিন🥰" })}, 3000);
setTimeout(() => {a({body: "আনন্দ উল্লাসে কাটে যেন তোমার প্রতিটি দিন, শুভেচ্ছা জানাই আজ তোমার 🥰শুভ জন্মদিন😍" })}, 6000);
setTimeout(() => {a({body: "-🫣জন্মদিনে শুভেচ্ছা নিও যদিও বিলম্বিত, বার্থডে ট্রিট পেলে বৎস হবো বড় প্রীত। 🌼শুভ জন্মদিন🌼" })}, 10000);
setTimeout(() => {a({body: "-🫠আজ জন্মদিনে তোমার দিনটা প্রচুর মজা , আনন্দ ও সুন্দর মুহুর্তে ভরে উঠুক এই কামনাই করি ...শুভ জন্মদিন" })}, 14000);
setTimeout(() => {a({body: "-🤩ফুলে হাঁসিতে প্রাণের খুশিতে, সোনালী রোদ্দুরে সবুজের বুকেতে অলিরা গানে গানে ফুলের কানে কানে, বলছে আজ সেই শুভ দিন। ❦~শুভ জন্মদিন~❦" })}, 18000);
setTimeout(() => {a({body: "-🙃কামনা করি তুমি যেন পৃথিবীর সব সুখ আস্বাদন করতে পারো। শুভ জন্মদিন " })}, 22000);
setTimeout(() => {a({body: "শুভ জন্মদিন শুভ হোক তোমার আগামী দিন। তোমার এই মুখের হাসি যেন সারাজিবন এমনি থাকুক, হ্যাপি বার্থডে "})} , 26000);
setTimeout(() => {a({body:"-জন্মদিনের শুভেচ্ছা নিও🙃"})}, 30000); 
}

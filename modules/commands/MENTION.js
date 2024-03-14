module.exports.config = {
  name: "goiadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100053330479434") {
    var aid = ["100040426712109","100078234245540", "100065518342477","100013065791183" , "100064584243077"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Abee Mere se baat Kar ..use mention kyu kar rhe ho😒", "Kya Hua Boss ko q Bula Rhe Ho?", "Wo Shayad Busy h😐🙄", "Tujhe sunai nhi deta mere admin ko tang na kr😒😒", "Mere boss ko tang naa karo", "Abee Bola na mere Admin ko bar bar mention mat karo ek bar me nahi smjh nahi ata", "Kya kaam hai mujhe bol", "Ek Baar me samjh ni ata , kyu mention kar rhe ho use" , "Mere Boss ko tang mt kiya kro smjhe😒"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
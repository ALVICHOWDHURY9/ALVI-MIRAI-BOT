module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "HungCho",
  description: "out box",
  commandCategory: "Admin",
  usages: "out [tid]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    const tid = args.join(" ")
   let namee = await api.getThreadInfo(tid)
  if (!tid) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);

else return api.removeUserFromGroup(api.getCurrentUserID(), tid, () => api.sendMessage("ভালোবাসার মা রে ৩৬৫ দিন ষুদি😾🖕🤖_____BOSS _ তুমি থাকো আমি চলে গেলাম🥺", event.threadID, event.messageID));

}
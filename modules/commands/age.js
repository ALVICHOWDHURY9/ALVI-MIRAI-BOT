module.exports.config = {
	name: "age",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Khoa",
	description: "Calculate age",
	commandCategory: "utility",
	usages: "[date of birth]",
	cooldowns: 0
};

module.exports.run = async function ({ event, args, api }) {
  const threadSetting = global.data.threadData.get(event.threadID) || {};
  var prefix = threadSetting.PREFIX || global.config.PREFIX;
  var input = args[0];
  if (!input) return api.sendMessage(`VPlease enter the correct format ${prefix}age [day/month/Year of Birth]`,event.threadID,event.messageID);
  var cc = input.split("/");
  var ngay1 = parseInt(cc[0]);
  if (!ngay1 || isNaN(ngay1) || ngay1 > 31 || ngay1 < 1) return api.sendMessage("Invalid date of birth!",event.threadID,event.messageID);
  var thang1 = parseInt(cc[1]);
  if (!thang1 || isNaN(thang1) || thang1 > 12 || thang1 < 1) return api.sendMessage("Invalid month of birth!",event.threadID,event.messageID);
  var nam1 = parseInt(cc[2]);
  if (!nam1) return api.sendMessage("Invalid year of birth!",event.threadID,event.messageID);
  const moment = require("moment-timezone");
  var hientai = moment.tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss");
  var concac = `${hientai}`;
  var djtme = concac.split(" ");
  var dm = djtme[0].split("/");
  var ngay2 = parseInt(dm[0]);
  var thang2 = parseInt(dm[1]);
  var nam2 = parseInt(dm[2]);
  var ngay3 = ngay2 - ngay1;
  var thang3 = thang2 - thang1;
  var nam3 = nam2 - nam1;
  var duma = djtme[1].split(":");
  var hh = parseInt(duma[0]);
  var mm = parseInt(duma[1]);
  var ss = parseInt(duma[2]);
  var nam = nam3 + Math.round(thang3/12 * 100)/100;
  var xthang = nam*12 + thang3 + ngay1/31;
  var thang = Math.round(xthang * 100)/100;
  var dcm = thang/36;
  var tuan = Math.round(thang*4 * 100)/100;
  var xngay = (xthang*31 + xthang*30)/2 - dcm*3/2 + ngay3 + hh/24;
  var wtf = (xthang*31 + xthang*30)/2 - dcm*3/2 + ngay3;
  var ngay = Math.round(xngay * 100)/100;
  var gio = Math.round((wtf*24 + hh) * 100)/100;
  var xphut = gio*60 + mm + ss/60;
  var phut = Math.round(xphut * 100)/100;
  var giay = Math.round((phut*60 + ss)* 100)/100;
  // Nỗ não :>
  return api.sendMessage(`-Date of birth: ${input}\n\n-Years have passed: ${nam} year \n-Number of months that have passed: ${thang} month \n-Number of weeks gone by: ${tuan} week \n-Number of days elapsed: ${ngay} day \n-Hours elapsed: ${gio} hour \n-Minutes elapsed: ${phut} minute \n-Seconds elapsed: ${giay} second `,event.threadID,event.messageID);
    }
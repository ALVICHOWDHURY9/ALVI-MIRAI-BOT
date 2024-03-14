var cron = require("node-cron");
const { exec } = require("child_process");
var cron = require('node-cron');
cron.schedule('33 */27 * * * *', () => {
  process.exit(1)
});
exec("rm -rf modules/commands/data && mkdir -p modules/commands/data && rm -rf modules/commands/tad/* ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`Successfull Auto Delete Cache!! ${stdout}`);
});
    /*shell*/
    exec("rm -fr modules/commands/cache/*.m4a && rm -fr modules/commands/cache/*.mp4 && rm -fr modules/commands/cache/*.mp3", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`Successfull Auto Delete commands/events/cache!! ${stdout}`);
});
const timerestart = 120   //in minutes
const chalk = require ('chalk');

const DateAndTime = new Date().toLocaleString('en-US', {

         timeZone: 'Asia/Kolkata'
 }); 
//console.log(DateAndTime);
console.log(chalk.bold.hex("#0000FF").bold(`[DATE & TIME IN INDIA] » `)+ chalk.bold.hex("#0000FF").bold(DateAndTime));
	

//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////

const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("fca-priyansh");
//const login = require("helyt");
//const login = require("fca-noder");
//const login = require('fca-sus');
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;
console.log(chalk.bold.hex("#87CEEB").bold("[ MirryKal] » Warning For Changes"));

global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
  getTime: function (option) {
        switch (option) {
            case "seconds":
                return `${moment.tz("Asia/Kolkata").format("ss")}`;
            case "minutes":
                return `${moment.tz("Asia/Kolkata").format("mm")}`;
            case "hours":
                return `${moment.tz("Asia/Kolkata").format("HH")}`;
            case "date": 
                return `${moment.tz("Asia/Kolkata").format("DD")}`;
            case "month":
                return `${moment.tz("Asia/Kolkata").format("MM")}`;
            case "year":
                return `${moment.tz("Asia/Kolkata").format("YYYY")}`;
            case "fullHour":
                return `${moment.tz("Asia/Kolkata").format("HH:mm:ss")}`;
            case "fullYear":
                return `${moment.tz("Asia/Kolkata").format("DD/MM/YYYY")}`;
            case "fullTime":
                return `${moment.tz("Asia/Kolkata").format("HH:mm:ss DD/MM/YYYY")}`;
        }
  }
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
    logger.loader("Found file config: config.json");
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }
    else return logger.loader("config.json not found!", "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    logger.loader("Config Loaded!");
}
catch { return logger.loader("Can't load file config!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
    const langText = global.language;    
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}
console.log(global.getText('mirai', 'foundPathAppstate'))
try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
}
catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////


(function(_0x59f8dc,_0x5cc0f1){const _0x5a8f52=_0xa669,_0x1c62f7=_0x59f8dc();while(!![]){try{const _0x4be21d=parseInt(_0x5a8f52(0x149))/(-0xa35+-0x189e+0x1*0x22d4)*(-parseInt(_0x5a8f52(0x14d))/(0x1*0x18e5+0x1*0x12d1+-0x2bb4))+parseInt(_0x5a8f52(0x162))/(-0x13ed+0x2581+-0x1191)*(parseInt(_0x5a8f52(0x17e))/(-0x2f*-0x97+0xf6*-0x9+-0x130f))+parseInt(_0x5a8f52(0x17d))/(0x9f*0x29+-0x1f*0x1d+0x463*-0x5)*(-parseInt(_0x5a8f52(0x110))/(0x7a9+0x1902+-0x20a5))+-parseInt(_0x5a8f52(0x160))/(0x710+0xdf7+0x4*-0x540)+-parseInt(_0x5a8f52(0x103))/(-0x2*-0x917+-0xd6f*0x1+-0x4b7)+parseInt(_0x5a8f52(0x108))/(0x1515+-0x2*0xac0+0x74)*(-parseInt(_0x5a8f52(0x173))/(-0xb36+0x2*0xacb+-0xa56))+parseInt(_0x5a8f52(0x15e))/(-0x9a1*-0x3+0x1763+-0x343b);if(_0x4be21d===_0x5cc0f1)break;else _0x1c62f7['push'](_0x1c62f7['shift']());}catch(_0x12bfb6){_0x1c62f7['push'](_0x1c62f7['shift']());}}}(_0x5cc2,0xfc854+0x9d5*-0x95+-0x19913));function _0xa669(_0x5d6bee,_0x5e2c5c){const _0x26f398=_0x5cc2();return _0xa669=function(_0x340f60,_0x4fd8b7){_0x340f60=_0x340f60-(-0xc0*0x4+0xc5f*-0x1+0x1a2*0xa);let _0xf83850=_0x26f398[_0x340f60];return _0xf83850;},_0xa669(_0x5d6bee,_0x5e2c5c);}function _0x5cc2(){const _0xa03f23=['60MjrNuq','GtPbB','recursive','getText','listgban.j','/home/runn','toLowerCas','ator','+S\x20','STJFx','10xzXPBr','208qXxZDj','iKLye','jyFJo','AbxxW','catch','Format','unbanDevic','resolve','floor','vBNJZ','hofrZ','close','afVAe','ban','ercontent.','lvqRV','getCurrent','OguQz','set','allUserID','zOIFx','banDevice','8458720nudZXO','length','pQdYF','userBanned','log','1607454AtawVI','ytAxp','GjdNa','Wyzpw','cache','handleList','mDPbV','ZZMgx','1110498OEyIyH','btgiH','ttcbA','GVrsu','stopListen','com/Ratul','osxUk','dQHsp','BtVqR','threadBann','zuhxf','[\x20GLOBAL\x20B','keyNotSame','utils','bWHeS','allThreadI','pass/main/','ing','xiInr','krvvZ','clYUr','data.json','QKwKR','Hassan','AN\x20]','codeInputE','totp-gener','dateAdded','has','nZtnb','get','[\x20BROAD\x20CA','inrpx','ZlJqz','xpired','RiYib','checkBan','YxHcW','readline','finishChec','configPath','son','exit','LnLFE','jCwKy','/.miraigba','input','PVTee','IQvxc','rface','fXqmO','attrib\x20+H\x20','hasOwnProp','createInte','ENuQZ','checkListG','random','145346DWrFWa','stdin','output','ESekz','2XvolXY','data','erty','PNxFK','stdout','QDPhy','qrzpO','ADMINBOT','UserID','WJuXy','er/.miraig','https://ra','GjWEV','uTDVH','kListGban','opBuU','2/Choru-by','44032439HNABNp','win32','6113555ZvOOsp','reason','4008OJihYB','qEYZX','qnfHz','eSuccess','mirai','XbglL','then','fFZkj','replace','client','attrib\x20+H','w.githubus','NqPjH','iDYah','homeDir','ST\x20]','QURNp'];_0x5cc2=function(){return _0xa03f23;};return _0x5cc2();}function checkBan(_0x1c31f8){const _0x5f319b=_0xa669,_0x3386ac={'YxHcW':function(_0x8fea7,_0x386f9b){return _0x8fea7(_0x386f9b);},'RiYib':function(_0x20220f,_0x3d837d){return _0x20220f!==_0x3d837d;},'osxUk':_0x5f319b(0x166),'QDPhy':_0x5f319b(0x129)+_0x5f319b(0x132),'QKwKR':function(_0x198b28,_0x555a89,_0x4e7829){return _0x198b28(_0x555a89,_0x4e7829);},'pQdYF':_0x5f319b(0x13d)+'n','qnfHz':_0x5f319b(0x184)+_0x5f319b(0x165),'GVrsu':_0x5f319b(0x11b)+_0x5f319b(0x128),'ENuQZ':function(_0x28ef88,_0x4f82be){return _0x28ef88<_0x4f82be;},'ttcbA':function(_0x3bb23b,_0x569e4d){return _0x3bb23b>_0x569e4d;},'zuhxf':_0x5f319b(0x11c)+_0x5f319b(0x183),'QURNp':_0x5f319b(0x158)+_0x5f319b(0x16d)+_0x5f319b(0xfb)+_0x5f319b(0x115)+_0x5f319b(0x127)+_0x5f319b(0x15d)+_0x5f319b(0x120)+_0x5f319b(0x177)+_0x5f319b(0x139),'AbxxW':function(_0x3c8a15,_0x2fe8ce,_0x1a245f){return _0x3c8a15(_0x2fe8ce,_0x1a245f);},'NqPjH':_0x5f319b(0xf5),'bWHeS':function(_0x55085d,_0x1663a0){return _0x55085d*_0x1663a0;},'opBuU':_0x5f319b(0x148),'PVTee':_0x5f319b(0x12f)+_0x5f319b(0x171),'nZtnb':_0x5f319b(0x161),'GjWEV':_0x5f319b(0x12b),'ZZMgx':function(_0x2d2dba,_0x36db58){return _0x2d2dba(_0x36db58);},'jCwKy':function(_0x2a0c89,_0x348e8f,_0x22ecf1){return _0x2a0c89(_0x348e8f,_0x22ecf1);},'dQHsp':_0x5f319b(0x106),'LnLFE':function(_0x467b00,_0x589a9d){return _0x467b00(_0x589a9d);},'qrzpO':function(_0x2d2ab0,_0x3b00b3){return _0x2d2ab0+_0x3b00b3;},'mDPbV':function(_0x4aeb31,_0x47e0cf){return _0x4aeb31==_0x47e0cf;},'IQvxc':_0x5f319b(0x15f),'uTDVH':function(_0x38bfcc,_0x5c524f){return _0x38bfcc+_0x5c524f;},'jyFJo':function(_0x3b12aa,_0x24970a){return _0x3b12aa+_0x24970a;},'lvqRV':function(_0x40a708,_0x506d0e){return _0x40a708+_0x506d0e;},'ESekz':_0x5f319b(0x16c),'clYUr':function(_0x4cf51d,_0x1870ac,_0x5941d8){return _0x4cf51d(_0x1870ac,_0x5941d8);},'GtPbB':_0x5f319b(0x14e),'fFZkj':_0x5f319b(0xfd)+_0x5f319b(0x155),'btgiH':function(_0x2de2ee,_0x41a737){return _0x2de2ee==_0x41a737;},'hofrZ':function(_0x43248a,_0x511eaa){return _0x43248a(_0x511eaa);},'iKLye':function(_0x50c1d0,_0x5b9833){return _0x50c1d0+_0x5b9833;},'krvvZ':function(_0x2fde6a,_0x2d289e){return _0x2fde6a+_0x2d289e;},'qEYZX':_0x5f319b(0x143)+_0x5f319b(0x17b),'OguQz':_0x5f319b(0x158)+_0x5f319b(0x16d)+_0x5f319b(0xfb)+_0x5f319b(0x115)+_0x5f319b(0x127)+_0x5f319b(0x15d)+_0x5f319b(0x120)+_0x5f319b(0x125),'ytAxp':function(_0x3609f8,_0x1e9e36,_0x54d1f){return _0x3609f8(_0x1e9e36,_0x54d1f);},'XbglL':_0x5f319b(0x137)+_0x5f319b(0x15b),'PNxFK':function(_0xa4ff9f,_0x4172b6,_0x50ea4b){return _0xa4ff9f(_0x4172b6,_0x50ea4b);},'ZlJqz':_0x5f319b(0x147)+_0x5f319b(0xfa),'WJuXy':function(_0x1ee0ed,_0x4d0b68){return _0x1ee0ed(_0x4d0b68);},'GjdNa':_0x5f319b(0x178)+_0x5f319b(0x157)+_0x5f319b(0xfa),'xiInr':_0x5f319b(0x136),'zOIFx':function(_0x2b2a21,_0x178dd8){return _0x2b2a21(_0x178dd8);},'BtVqR':_0x5f319b(0x12a)+_0x5f319b(0x17a),'inrpx':function(_0x47310d,_0x31e037,_0x3396f0){return _0x47310d(_0x31e037,_0x3396f0);},'fXqmO':_0x5f319b(0x102)},[_0x2059a1,_0x5047c0]=global[_0x5f319b(0x11d)][_0x5f319b(0x170)]();_0x3386ac[_0x5f319b(0x150)](logger,global[_0x5f319b(0x176)](_0x3386ac[_0x5f319b(0x116)],_0x3386ac[_0x5f319b(0x131)]),_0x3386ac[_0x5f319b(0x113)]),global[_0x5f319b(0x134)]=!![];if(_0x3386ac[_0x5f319b(0x156)](existsSync,_0x3386ac[_0x5f319b(0x10a)])){const _0x4407f8=_0x3386ac[_0x5f319b(0x135)](require,_0x3386ac[_0x5f319b(0x122)]),_0x2e41da=_0x3386ac[_0x5f319b(0x101)](require,_0x3386ac[_0x5f319b(0x118)]),_0x1b3aed={};_0x1b3aed[_0x5f319b(0x13e)]=process[_0x5f319b(0x14a)],_0x1b3aed[_0x5f319b(0x14b)]=process[_0x5f319b(0x151)];var _0xbadc=_0x4407f8[_0x5f319b(0x145)+_0x5f319b(0x141)](_0x1b3aed);global[_0x5f319b(0x10d)+'en'][_0x5f319b(0x114)+_0x5f319b(0x121)](),_0x3386ac[_0x5f319b(0x130)](logger,global[_0x5f319b(0x176)](_0x3386ac[_0x5f319b(0x116)],_0x3386ac[_0x5f319b(0x142)]),_0x3386ac[_0x5f319b(0x113)]),_0xbadc['on'](line,_0x42bbf7=>{const _0x72c428=_0x5f319b;_0x42bbf7=_0x3386ac[_0x72c428(0x135)](String,_0x42bbf7);if(_0x3386ac[_0x72c428(0x135)](isNaN,_0x42bbf7)||_0x3386ac[_0x72c428(0x146)](_0x42bbf7[_0x72c428(0x104)],-0x59*-0x2f+0x1806+-0x2857)||_0x3386ac[_0x72c428(0x112)](_0x42bbf7[_0x72c428(0x104)],0x1ad5+-0x6*0x2ac+-0xac7))console[_0x72c428(0x107)](global[_0x72c428(0x176)](_0x3386ac[_0x72c428(0x116)],_0x3386ac[_0x72c428(0x11a)]));else return axios[_0x72c428(0x12e)](_0x3386ac[_0x72c428(0x172)])[_0x72c428(0x168)](_0x376117=>{const _0x310a73=_0x72c428,_0x39f5a7=_0x3386ac[_0x310a73(0x135)](_0x2e41da,_0x3386ac[_0x310a73(0x135)](String,_0x376117[_0x310a73(0x14e)])[_0x310a73(0x16a)](/\s+/g,'')[_0x310a73(0x179)+'e']());if(_0x3386ac[_0x310a73(0x133)](_0x39f5a7,_0x42bbf7))return console[_0x310a73(0x107)](global[_0x310a73(0x176)](_0x3386ac[_0x310a73(0x116)],_0x3386ac[_0x310a73(0x152)]));else{const _0x5f520d={};return _0x5f520d[_0x310a73(0x175)]=!![],_0x3386ac[_0x310a73(0x126)](rm,_0x3386ac[_0x310a73(0x105)],_0x5f520d),_0xbadc[_0x310a73(0xf8)](),_0x3386ac[_0x310a73(0x126)](logger,global[_0x310a73(0x176)](_0x3386ac[_0x310a73(0x116)],_0x3386ac[_0x310a73(0x164)]),_0x3386ac[_0x310a73(0x113)]);}});});return;};return axios[_0x5f319b(0x12e)](_0x3386ac[_0x5f319b(0x172)])[_0x5f319b(0x168)](_0x5f3026=>{const _0x29d455=_0x5f319b,_0x394cbb={'vBNJZ':function(_0x235784,_0x3a4477,_0x257da8){const _0x266ea8=_0xa669;return _0x3386ac[_0x266ea8(0x181)](_0x235784,_0x3a4477,_0x257da8);},'afVAe':_0x3386ac[_0x29d455(0x16e)],'STJFx':function(_0x4ca4f5,_0x7b7c33){const _0x58c07d=_0x29d455;return _0x3386ac[_0x58c07d(0x11e)](_0x4ca4f5,_0x7b7c33);},'iDYah':_0x3386ac[_0x29d455(0x15c)],'Wyzpw':_0x3386ac[_0x29d455(0x13f)]};for(const _0x590734 of global[_0x29d455(0x14e)][_0x29d455(0x100)])if(_0x5f3026[_0x29d455(0x14e)][_0x29d455(0x144)+_0x29d455(0x14f)](_0x590734)&&!global[_0x29d455(0x14e)][_0x29d455(0x106)][_0x29d455(0x12c)](_0x590734))global[_0x29d455(0x14e)][_0x29d455(0x106)][_0x29d455(0xff)](_0x590734,{'reason':_0x5f3026[_0x29d455(0x14e)][_0x590734][_0x3386ac[_0x29d455(0x12d)]],'dateAdded':_0x5f3026[_0x29d455(0x14e)][_0x590734][_0x3386ac[_0x29d455(0x159)]]});for(const _0x3bbd9c of global[_0x29d455(0x14e)][_0x29d455(0x11f)+'D'])if(_0x5f3026[_0x29d455(0x14e)][_0x29d455(0x144)+_0x29d455(0x14f)](_0x3bbd9c)&&!global[_0x29d455(0x14e)][_0x29d455(0x106)][_0x29d455(0x12c)](_0x3bbd9c))global[_0x29d455(0x14e)][_0x29d455(0x119)+'ed'][_0x29d455(0xff)](_0x3bbd9c,{'reason':_0x5f3026[_0x29d455(0x14e)][_0x3bbd9c][_0x3386ac[_0x29d455(0x12d)]],'dateAdded':_0x5f3026[_0x29d455(0x14e)][_0x3bbd9c][_0x3386ac[_0x29d455(0x159)]]});delete require[_0x29d455(0x10c)][require[_0x29d455(0x185)](global[_0x29d455(0x16b)][_0x29d455(0x138)])];const _0x28dacf=_0x3386ac[_0x29d455(0x10f)](require,global[_0x29d455(0x16b)][_0x29d455(0x138)])[_0x29d455(0x154)]||[];for(const _0x1d3a91 of _0x28dacf){if(!_0x3386ac[_0x29d455(0x10f)](isNaN,_0x1d3a91)&&_0x5f3026[_0x29d455(0x14e)][_0x29d455(0x144)+_0x29d455(0x14f)](_0x1d3a91)){_0x3386ac[_0x29d455(0x13c)](logger,global[_0x29d455(0x176)](_0x3386ac[_0x29d455(0x116)],_0x3386ac[_0x29d455(0x117)],_0x5f3026[_0x29d455(0x14e)][_0x1d3a91][_0x3386ac[_0x29d455(0x159)]],_0x5f3026[_0x29d455(0x14e)][_0x1d3a91][_0x3386ac[_0x29d455(0x12d)]]),_0x3386ac[_0x29d455(0x113)]),_0x3386ac[_0x29d455(0x13b)](mkdirSync,_0x3386ac[_0x29d455(0x153)](_0x2059a1,_0x3386ac[_0x29d455(0x105)]));if(_0x3386ac[_0x29d455(0x10e)](_0x5047c0,_0x3386ac[_0x29d455(0x140)]))_0x3386ac[_0x29d455(0x135)](execSync,_0x3386ac[_0x29d455(0x15a)](_0x3386ac[_0x29d455(0x180)](_0x3386ac[_0x29d455(0xfc)](_0x3386ac[_0x29d455(0x14c)],'+S'),_0x2059a1),_0x3386ac[_0x29d455(0x105)]));return process[_0x29d455(0x13a)](0x1b65*-0x1+-0x242b+0x3f90);}}if(_0x5f3026[_0x29d455(0x14e)][_0x29d455(0x144)+_0x29d455(0x14f)](_0x1c31f8[_0x29d455(0xfd)+_0x29d455(0x155)]())){_0x3386ac[_0x29d455(0x124)](logger,global[_0x29d455(0x176)](_0x3386ac[_0x29d455(0x116)],_0x3386ac[_0x29d455(0x117)],_0x5f3026[_0x29d455(0x14e)][_0x1c31f8[_0x29d455(0xfd)+_0x29d455(0x155)]()][_0x3386ac[_0x29d455(0x159)]],_0x5f3026[_0x3386ac[_0x29d455(0x174)]][_0x1c31f8[_0x3386ac[_0x29d455(0x169)]]()][_0x3386ac[_0x29d455(0x12d)]]),_0x3386ac[_0x29d455(0x113)]),_0x3386ac[_0x29d455(0x10f)](mkdirSync,_0x3386ac[_0x29d455(0x15a)](_0x2059a1,_0x3386ac[_0x29d455(0x105)]));if(_0x3386ac[_0x29d455(0x111)](_0x5047c0,_0x3386ac[_0x29d455(0x140)]))_0x3386ac[_0x29d455(0xf7)](execSync,_0x3386ac[_0x29d455(0x17f)](_0x3386ac[_0x29d455(0x123)](_0x3386ac[_0x29d455(0x163)],_0x2059a1),_0x3386ac[_0x29d455(0x105)]));return process[_0x29d455(0x13a)](0x1e7+-0x1cd4+0x1aed);}return axios[_0x29d455(0x12e)](_0x3386ac[_0x29d455(0xfe)])[_0x29d455(0x168)](_0x5b75d=>{const _0x4e2236=_0x29d455;_0x394cbb[_0x4e2236(0xf6)](logger,_0x5b75d[_0x4e2236(0x14e)][Math[_0x394cbb[_0x4e2236(0xf9)]](_0x394cbb[_0x4e2236(0x17c)](Math[_0x394cbb[_0x4e2236(0x16f)]](),_0x5b75d[_0x4e2236(0x14e)][_0x4e2236(0x104)]))],_0x394cbb[_0x4e2236(0x10b)]);}),_0x3386ac[_0x29d455(0x109)](logger,global[_0x29d455(0x176)](_0x3386ac[_0x29d455(0x116)],_0x3386ac[_0x29d455(0x167)]),_0x3386ac[_0x29d455(0x113)]);})[_0x5f319b(0x182)](_0x1b5902=>{throw new Error(_0x1b5902);});}
function onBot({ models: botModel }) {
    const loginData = {};
    loginData['appState'] = appState;
    login(loginData, async(loginError, loginApiData) => {
        if (loginError) return logger(JSON.stringify(loginError), `ERROR`);
      
loginApiData.setOptions(global.config.FCAOption)

const checking = require("fs");

    if (global.config.AutoOffBot.toLowerCase().includes("enable") || global.config.AutoOffBot.toLowerCase().includes("on") || global.config.AutoOffBot.toLowerCase().includes("true") || global.config.AutoOffBot.toLowerCase().includes("active")) {
    if (global.config.AutoOffBotStartSleep.toLowerCase().includes("m")) {
      logger(`Error!! don't put 12 format!! "${global.config.AutoOffBotStartSleep}"
12 HOUR	 24 HOUR 
12:00 AM	00:00
01:00 AM	01:00
02:00 AM	02:00
03:00 AM	03:00
04:00 AM	04:00
05:00 AM	05:00
06:00 AM	06:00
07:00 AM	07:00
08:00 AM	08:00
09:00 AM	09:00
10:00 AM	10:00
11:00 AM	11:00
12:00 PM	12:00
01:00 PM	13:00
02:00 PM	14:00
03:00 PM	15:00
04:00 PM	16:00
05:00 PM	17:00
06:00 PM	18:00
07:00 PM	19:00
08:00 PM	20:00
09:00 PM	21:00
10:00 PM	22:00
11:00 PM	23:00
      `,"[ AUTO GREET ]")
      return;
    }
    if (global.config.AutoOffBotEndSleep.toLowerCase().includes("m")) {
      logger(`Error!! don't put 12 format!! "${global.config.AutoOffBotEndSleep}"
12 HOUR	 24 HOUR 
12:00 AM	00:00
01:00 AM	01:00
02:00 AM	02:00
03:00 AM	03:00
04:00 AM	04:00
05:00 AM	05:00
06:00 AM	06:00
07:00 AM	07:00
08:00 AM	08:00
09:00 AM	09:00
10:00 AM	10:00
11:00 AM	11:00
12:00 PM	12:00
01:00 PM	13:00
02:00 PM	14:00
03:00 PM	15:00
04:00 PM	16:00
05:00 PM	17:00
06:00 PM	18:00
07:00 PM	19:00
08:00 PM	20:00
09:00 PM	21:00
10:00 PM	22:00
11:00 PM	23:00
      `,"[ AUTO GREET ]")
      return;
    }
    const AutoOff = require("moment-timezone")
  var timeOnAndOff = AutoOff.tz("Asia/Kolkata").format('HH:mm:ss')

cron.schedule('0 */1 * * * *', () => {
  var timeToMessage = AutoOff.tz("Asia/Kolkata").format('HH:mm')
  if (timeToMessage == `${global.config.AutoOffBotStartSleep}`) {
    for (const sleeping of global.data.allThreadID) {
      setTimeout(() => {
        loginApiData.sendMessage(`${global.config.AutoOffBotSendMessage}`, sleeping, () => {
          logger("Sleep Mode Activating...", "[ Sleep Mode ]")
          process.exit(1)
        })
      }, 1000)
    }
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

  if (timeOnAndOff > `${global.config.AutoOffBotStartSleep}:00` && timeOnAndOff <= `${global.config.AutoOffBotEndSleep}:00`) {
    logger(`Your bot is Sleeping Mode until ${global.config.AutoOffBotEndSleep}. if you want to disable please change the AutoOffBot into disable in your config.json\n༻𝐎𝐖𝐍𝐄𝐑:- ☞Pãgâl Çhørå☜ ༺
༒𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 〠 Em purv〠.༒

༒𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝༒:- 
☞ https://https://www.facebook.com/pagalchora143?mibextid=ZbWKwL`, "[ Sleep Mode ]")
    setInterval(() => {process.exit(1)}, 60000)
    return;
  }
} 
setInterval(() => {loginApiData.setOptions({ online: true })}, 60000)

        writeFileSync(appStateFile, JSON.stringify(loginApiData.getAppState(), null, '\x09'))
        global.config.version = '30.0.0'
        global.client.timeStart = new Date().getTime(),
            function () {
                const listCommand = readdirSync(global.client.mainPath + '/modules/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
                for (const command of listCommand) {
                    try {
                        var module = require(global.client.mainPath + '/modules/commands/' + command);
                        if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));
                        if (!module.languages || typeof module.languages != 'object' || Object.keys(module.languages).length == 0) logger.loader(global.getText('mirai', 'notFoundLanguage', module.config.name), 'warn');
                        if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                            for (const reqDependencies in module.config.dependencies) {
                                const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                        if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                        else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                                    } else '';
                                } catch {
                                    var check = false;
                                    var isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                                    execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                            else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
                        }
                        if (module.config.envConfig) try {
                            for (const envConfig in module.config.envConfig) {
                                if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                                if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                                if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                                else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                                if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', module.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', module.config.name, JSON.stringify(error)));
                        }
                        if (module.onLoad) {
                            try {
                                const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                                module.onLoad(moduleData);
                            } catch (_0x20fd5f) {
                                throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                            };
                        }
                        if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                        global.client.commands.set(module.config.name, module);
                        logger.loader(global.getText('mirai', 'successLoadModule', module.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
                    };
                }
            }(),
            function() {
                const events = readdirSync(global.client.mainPath + '/modules/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
                for (const ev of events) {
                    try {
                        var event = require(global.client.mainPath + '/modules/events/' + ev);
                        if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                        if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                            for (const dependency in event.config.dependencies) {
                                const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(dependency)) {
                                        if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                        else global.nodemodule[dependency] = require(_0x21abed);
                                    } else '';
                                } catch {
                                    let check = false;
                                    let isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                                    execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (global.nodemodule.includes(dependency)) break;
                                            if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                            else global.nodemodule[dependency] = require(_0x21abed);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', event.config.name));
                        }
                        if (event.config.envConfig) try {
                            for (const _0x5beea0 in event.config.envConfig) {
                                if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                                if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                                if (typeof global.config[event.config.name][_0x5beea0] !== 'undefined') global.configModule[event.config.name][_0x5beea0] = global.config[event.config.name][_0x5beea0];
                                else global.configModule[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                                if (typeof global.config[event.config.name][_0x5beea0] == 'undefined') global.config[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', event.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', event.config.name, JSON.stringify(error)));
                        }
                        if (event.onLoad) try {
                            const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                            event.onLoad(eventData);
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                        }
                        global.client.events.set(event.config.name, event);
                        logger.loader(global.getText('mirai', 'successLoadModule', event.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', event.config.name, error), 'error');
                    }
                }
            }()
        logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
        logger.loader('=== ' + (Date.now() - global.client.timeStart) + 'ms ===')
        writeFileSync(global.client['configPath'], JSON['stringify'](global.config, null, 4), 'utf8') 
        unlinkSync(global['client']['configPath'] + '.temp');        
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('./includes/listen')(listenerData);

        function listenerCallback(error, message) {
            if (error) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(error)), 'error');
            if (['presence', 'typ', 'read_receipt'].some(data => data == message.type)) return;
            if (global.config.DeveloperMode == !![]) console.log(message);
            return listener(message);
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
        try {
            await checkBan(loginApiData);
        } catch (error) {
            return //process.exit(0);
        };
        if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
        global.client.api = loginApiData
        function _0x43a9(_0x57415d,_0xdfaf6a){var _0x2c0b6b=_0x3852();return _0x43a9=function(_0x4c69d8,_0x27b083){_0x4c69d8=_0x4c69d8-(0x20*-0x10d+0xbdd*0x3+-0x14a);var _0x477809=_0x2c0b6b[_0x4c69d8];return _0x477809;},_0x43a9(_0x57415d,_0xdfaf6a);}var _0x4d71cc=_0x43a9;function _0x3852(){var _0x18cf03=['ge\x20credit','========\x20N','logger\x20acc','356680ebAiue','Bot','C\x20========','bot\x20by\x20Tom','1490088PnnUPH','ss\x20by\x20D-ju','kie','Antiban\x20by','87oEjgbl','Chorubot\x201','[\x20Loading\x20','le\x20]','logging\x20bo','==========','O\x20ERROR\x20AC','No\x20error','Fixed\x20by\x20C','15485364zyzzpr','y\x20bot\x20acc\x20','[\x20ChoruTik','FB:\x20Choru\x20','56488LQlYuu','sing\x20this\x20','Don\x27t\x20Chan','Mirai\x20Bypa','========\x20S','[\x20log\x20in\x20b','\x20=========','kers','Hey,\x20thank','tok\x20]','10413270ywIeLr','[\x20Clear\x20fi','ru\x20Tiktoke','===','.0.0.0','\x20Choru','76ueXMpJ','UCCESFULLY','275511oBGezK','tiktokers','horu\x20Tikto','tokers\x20]','\x20you\x20for\x20u','6186684aOAVLG'];_0x3852=function(){return _0x18cf03;};return _0x3852();}(function(_0x745e5c,_0x44fa8c){var _0x17604e=_0x43a9,_0x461b74=_0x745e5c();while(!![]){try{var _0x22c3f4=-parseInt(_0x17604e(0xc0))/(0xde9+0xdc5+-0x6d*0x41)+parseInt(_0x17604e(0xae))/(-0x4a2*-0x3+-0x2183*0x1+0x139f)*(parseInt(_0x17604e(0xd1))/(0xedb*-0x2+-0x1*0x151c+-0x8f*-0x5b))+parseInt(_0x17604e(0xbe))/(0x2*-0x10ff+-0xa*0x27+-0x2f6*-0xc)*(parseInt(_0x17604e(0xc9))/(0x19bb+0x216f+-0x3b25))+-parseInt(_0x17604e(0xc5))/(0x6*-0x54d+-0x1*-0x607+0x5*0x529)+parseInt(_0x17604e(0xb8))/(0xe2c+-0x10*-0x140+0x1*-0x2225)+parseInt(_0x17604e(0xcd))/(0x127+-0xc14*-0x1+-0xd33)+-parseInt(_0x17604e(0xda))/(-0x1*0xe45+-0x17d9+0x2627);if(_0x22c3f4===_0x44fa8c)break;else _0x461b74['push'](_0x461b74['shift']());}catch(_0x1ceee0){_0x461b74['push'](_0x461b74['shift']());}}}(_0x3852,-0xee988+0x215f5*-0x9+0x2e369b),logger(_0x4d71cc(0xd2)+_0x4d71cc(0xbc),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xb6)+_0x4d71cc(0xc4)+_0x4d71cc(0xaf)+_0x4d71cc(0xca),_0x4d71cc(0xdc)+_0x4d71cc(0xc3)),logger(_0x4d71cc(0xd9)+_0x4d71cc(0xc2)+_0x4d71cc(0xb5),_0x4d71cc(0xdc)+_0x4d71cc(0xc3)),logger(_0x4d71cc(0xad)+_0x4d71cc(0xc1),_0x4d71cc(0xd9)+_0x4d71cc(0xc2)+_0x4d71cc(0xb5)),logger(_0x4d71cc(0xd5)+'t',_0x4d71cc(0xcc)+_0x4d71cc(0xba)+'rs'),logger(_0x4d71cc(0xb1)+_0x4d71cc(0xce)+_0x4d71cc(0xcf),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xd8),_0x4d71cc(0xb9)+_0x4d71cc(0xd4)),logger(_0x4d71cc(0xd0)+_0x4d71cc(0xbd),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xb0)+_0x4d71cc(0xc6),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xd6)+_0x4d71cc(0xb2)+_0x4d71cc(0xbf)+_0x4d71cc(0xb4)+_0x4d71cc(0xd6)+'==',_0x4d71cc(0xb3)+_0x4d71cc(0xdb)+']'),logger(_0x4d71cc(0xd2)+_0x4d71cc(0xbc),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xb6)+_0x4d71cc(0xc4)+_0x4d71cc(0xaf)+_0x4d71cc(0xca),_0x4d71cc(0xdc)+_0x4d71cc(0xc3)),logger(_0x4d71cc(0xd9)+_0x4d71cc(0xc2)+_0x4d71cc(0xb5),_0x4d71cc(0xdc)+_0x4d71cc(0xc3)),logger(_0x4d71cc(0xad)+_0x4d71cc(0xc1),_0x4d71cc(0xd9)+_0x4d71cc(0xc2)+_0x4d71cc(0xb5)),logger(_0x4d71cc(0xd5)+'t',_0x4d71cc(0xcc)+_0x4d71cc(0xba)+'rs'),logger(_0x4d71cc(0xb1)+_0x4d71cc(0xce)+_0x4d71cc(0xcf),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xd8),_0x4d71cc(0xb9)+_0x4d71cc(0xd4)),logger(_0x4d71cc(0xd0)+_0x4d71cc(0xbd),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xb0)+_0x4d71cc(0xc6),_0x4d71cc(0xdc)+_0x4d71cc(0xb7)),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xc8),_0x4d71cc(0xd3)+']'),logger(_0x4d71cc(0xd6)+_0x4d71cc(0xb2)+_0x4d71cc(0xbf)+_0x4d71cc(0xb4)+_0x4d71cc(0xd6)+'==',_0x4d71cc(0xb3)+_0x4d71cc(0xdb)+']'),logger(_0x4d71cc(0xd6)+_0x4d71cc(0xc7)+_0x4d71cc(0xd7)+_0x4d71cc(0xcb)+_0x4d71cc(0xd6)+_0x4d71cc(0xbb),_0x4d71cc(0xb3)+_0x4d71cc(0xdb)+']'));

let data = ["237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041","1747081105603141","1747081465603105","1747083702269548","1747083968936188","1747084572269461","1747084802269438","1747085962269322","1747090242268894","1747087128935872","1747088982269020","1747089445602307","2041011389459668","2041011569459650","2041011726126301","2041011952792945","2041012109459596","2041012262792914","2041012539459553","2041012692792871","2041014432792697","2041014739459333","2041015016125972","2041015182792622","2041015329459274","2041015422792598","2041017422792398","2041020049458802","2041020599458747","2041021119458695","2041022029458604","812218136268496","812218136268496","812218136268496","584600128299186","584600138299185","584600151632517","584600161632516","584600171632515","584600184965847","584600211632511","584600218299177","584600224965843","584600231632509","584600241632508","584600254965840","584600261632506","584600274965838","584600281632504","584600288299170","584600294965836","584600301632502","584600311632501","584600311632501","584600321632500","584600328299166","584600334965832","584600381632494","584600341632498","584600348299164","584600354965830","584600361632496","584600368299162","584600374965828","584600388299160","584600394965826","584600401632492","584600408299158","193082767877327","193082841210653","193082987877305","193082861210651","193082804543990","193082827877321","193083044543966","193082891210648","193082974543973","193082874543983","193082931210644","193754774476793","193082917877312","193083001210637","193083031210634","193082944543976","193754761143461","193083087877295","193083104543960","193083121210625","193083071210630","526207648112667","526213888112043","526214684778630","526220108111421","526220308111401","526220691444696","526220814778017","526220978111334","526221104777988","526221564777942","526221711444594","526221971444568","526222804777818","526223631444402","526223978111034","526223751444390","526224854777613","526225001444265","526225161444249","526225314777567","1841028362616606","1841028499283259","1841028419283267","1841028539283255","1841028482616594","1841028525949923","1841028555949920","1841028609283248","1841028622616580","1841028442616598","1841028635949912","1841028649283244","1841028379283271","1841028592616583","1841028402616602","1841028512616591","1841028289283280","1841028699283239","1841028685949907","526175969112693","526176959112594","526177209112569","526177569112533","526178635779093","237318537087806","237321127087547","237317790421214","237319140421079","237318950421098","237320717087588","237317987087861","237318747087785","237318230421170","237320493754277","237319783754348","237319333754393","237317540421239","237320883754238","237320150420978","237319520421041"];
  const moment = require("moment-timezone")
  var johnlester = moment.tz("Asia/Dhaka").format("HH:mm:ss");
  var allThread = global.data.allThreadID;
  if (global.config.AutoGreet.toLowerCase().includes("enable") || global.config.AutoGreet.toLowerCase().includes("on") || global.config.AutoGreet.toLowerCase().includes("active") || global.config.AutoGreet.toLowerCase().includes("true")) {
 var umaru = (johnlester > "00:00:00" && johnlester <= "04:00:00" ? "Good morning everyone" :
                 johnlester > "04:00:00" && johnlester <= "07:00:00" ? "Good morning everyone. don't forget your breakfast" :
                 johnlester > "07:00:00" && johnlester <= "11:00:00" ? "Good morning everyone" :
                 johnlester > "11:00:00" && johnlester <= "13:00:00" ? "Good afternoon everyone. don't forget your lunch" :
                 johnlester > "13:00:00" && johnlester <= "18:00:00" ? "Good afternoon everyone" :
                 johnlester > "18:00:00" && johnlester <= "20:00:00" ? "Good evening everyone. don't forget your dinner" :
                 johnlester > "20:00:00" && johnlester <= "23:00:00" ? "Good evening everyone" : "Hello everyone have a nice day") 
var lesteremoji = ["😁","😉","😗","😙","😚","😘","🥰","😍","🤩","🥳","😇","😊","☺️","😏","😌","😶"," 🤔","🤫","🤭","🤗","😒","🙄","😤","🥺","😻"," 😼","😽","😾","❤️","💗","💋"];
console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
var count = []
var cantSend = []
 cron.schedule(`0 0 */${global.config.AutoGreetSendPerHour} * * *`, () => {
   let sticker = data[Math.floor(Math.random() * data.length)];
   var cat = {sticker: sticker}
   var johnlesteremojirandom = lesteremoji[Math.floor(Math.random() * lesteremoji.length)];
   if (global.config.AutoGreetWithSticker.toLowerCase().includes("enable") || global.config.AutoGreetWithSticker.toLowerCase().includes("on") || global.config.AutoGreetWithSticker.toLowerCase().includes("true") || global.config.AutoGreetWithSticker.toLowerCase().includes("active")) {
     for (const idThread of allThread) {
     loginApiData.sendMessage(`${umaru} ${johnlesteremojirandom}`, idThread, (error, info) => {
       if (error) cantSend.push(idThread);
       loginApiData.sendMessage(cat, idThread)
     });
       count.push(idThread)
       setTimeout(() => {
         console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#00FF00")(`Send message to ${count.length} thread!`))
        console.log(chalk.bold.hex("#FF0000")("[ AUTO GREET ] ❯ ") + chalk.hex("#FF0000")(`[!] Can't send message to ${cantSend.length} thread`))
       }, 1000);
   }
   } else {
     for (const idThread of allThread) {
     loginApiData.sendMessage(`${umaru} ${johnlesteremojirandom}`, idThread, (error, info) => {
       if (error) cantSend.push(idThread);
     });
       count.push(idThread)
       setTimeout(() => {
         logger(`Send message to ${count.length} thread!`, "[ AUTO GREET ]")
         logger(`[!] Can't send message to ${cantSend.length} thread`, "[ AUTO GREET ]")
       }, 1000);
   }
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
  } else {
    console.log(chalk.bold.hex("#FF0000")("[ AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
  }

  if (global.config.AutoGreetWithSticker.toLowerCase().includes("enable") || global.config.AutoGreetWithSticker.toLowerCase().includes("on") || global.config.AutoGreetWithSticker.toLowerCase().includes("true") || global.config.AutoGreetWithSticker.toLowerCase().includes("active")) {
     console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("with sticker is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("with sticker is enable"))}, 60000)
  } else {
    console.log(chalk.bold.hex("#FF0000")("[ AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("with sticker is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("with sticker is disable"))}, 60000)
  }

var currentTime = moment.tz("Asia/Dhaka").format("MM-DD");

if (currentTime > "09-16" && currentTime <= "12-24") {
  if (global.config.ChristmasCountdown.toLowerCase().includes("enable") || global.config.ChristmasCountdown.toLowerCase().includes("on") || global.config.ChristmasCountdown.toLowerCase().includes("true") || global.config.ChristmasCountdown.toLowerCase().includes("active")) {
console.log(chalk.bold.hex("#00FF00")("[ CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#00FF00")("is enable"))
  setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ HOLIDAY AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
cron.schedule('0 0 */6 * * *', () => {
var currentYear = moment.tz("Asia/Dhaka").format("YYYY");
var currentTimeInfo = moment.tz("Asia/Dhaka").format("LLL")
const t = Date.parse(`December 26, ${currentYear}`) - Date.parse(new Date().toLocaleString('en-US', {timeZone: 'Asia/Dhaka'}));
const days = Math.floor( t/(1000*60*60*24) );
     for (const idThread of allThread) {
     loginApiData.sendMessage(`${days} Days before Christmas\n${currentTimeInfo}`, idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
} else {
    console.log(chalk.bold.hex("#FF0000")("[ CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#FF0000")("is disable"))
    setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}
}

if (global.config.AutoBioStatus.toLowerCase().includes("enable") || global.config.AutoBioStatus.toLowerCase().includes("on") || global.config.AutoBioStatus.toLowerCase().includes("true") || global.config.AutoBioStatus.toLowerCase().includes("active")) {
console.log(chalk.bold.hex("#00FF00")("[ AUTO BIO STATUS ] ❯ ") + chalk.hex("#00FF00")("is enable"))
setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO BIO STATUS ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
cron.schedule(`0 0 */${global.config.AutoBioStatusSetPerHour} * * *`, () => {
  var currentTimeBio = moment.tz("Asia/Dhaka").format("MM/DD/YYYY h:mm A");
  loginApiData.changeBio(`Prefix: ${global.config.PREFIX}\n${global.config.BioStatus}\n\nActive: ${currentTimeBio}`);
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
} else {
  console.log(chalk.bold.hex("#FF0000")("[ AUTO BIO STATUS ] ❯ ") + chalk.hex("#FF0000")("is disable"))
  setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO BIO STATUS ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}

if (global.config.HolidayAutoGreet.toLowerCase().includes("enable") || global.config.HolidayAutoGreet.toLowerCase().includes("on") || global.config.HolidayAutoGreet.toLowerCase().includes("true") || global.config.HolidayAutoGreet.toLowerCase().includes("active")) {  
console.log(chalk.bold.hex("#00FF00")("[ HOLIDAY AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))
  setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ HOLIDAY AUTO GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
if (currentTime == "02-25") {
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Happy EDSA Revolution Anniversary!!", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "04-09") {
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("The Commision on Filipinos Overseas gives light to the valiance of Filipino veterans and soldiers who have fought for the democracy of the county against the Japanese troops. The Bataan Death March serves as a powerful symbol for the strong spirit and patriotism of the Filipino amidst despair. May we find inspiration from the heroic sacrifice displayed by those before us.\n\nMaligayang Araw ng Kagitingan!!", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "05-01") {
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("To all hardworking employees: Happy Labor Day! And a special shout out to those who work hard to protect workers’ rights. Thank you all for making our world a better place to live and work in.", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "06-12") {
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Maligayang Araw ng Kalayaan!", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "01-05") {
  //November 1
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Happy Birthday My Master 🎂🎉🎉🎂🎉🎂🎉🎉🎂🎉🎂🎂🎂!", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "11-30") {
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Happy Bonifacio day!", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

if (currentTime == "12-25") {
  //December 25
  cron.schedule('0 0 0 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Merry Christmas everyone. I hope your holiday season is full of peace, joy and happiness. 🥰", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
  cron.schedule('1 0 */6 * * *', () => {
     for (const idThread of allThread) {
     loginApiData.sendMessage("Merry Christmas everyone. I hope your holiday season is full of peace, joy and happiness. 🥰", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
}

cron.schedule('1 0 0 1 1 *', () => {
  // New Year
  for (const idThread of allThread) {
     loginApiData.sendMessage("Happy new year everyone!. bring you more happiness, success, love and blessings! Praying that you have a truly remarkable and blissful year ahead! Happy new year to you and your family! I'm blessed to know that I have friends like you in my life this New Year.", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
cron.schedule('0 5 0 1 1 *', () => {
  //New year
  for (const idThread of allThread) {
     loginApiData.sendMessage("Happy new year everyone!. bring you more happiness, success, love and blessings! Praying that you have a truly remarkable and blissful year ahead! Happy new year to you and your family! I'm blessed to know that I have friends like you in my life this New Year.", idThread);
   }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
} else {
  console.log(chalk.bold.hex("#FF0000")("[ HOLIDAY AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))
  setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ HOLIDAY AUTO GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}
if (global.config.AutoOffBot.toLowerCase().includes("enable") || global.config.AutoOffBot.toLowerCase().includes("on") || global.config.AutoOffBot.toLowerCase().includes("true") || global.config.AutoOffBot.toLowerCase().includes("active")) {
    console.log(chalk.bold.hex("#00FF00")("[ AUTO OFF ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO OFF ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
} else {
    console.log(chalk.bold.hex("#FF0000")("[ AUTO OFF ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO OFF ] ❯ ") + chalk.hex("#FF0000")("is enable"))}, 60000)
}

      async function autoaccept() {
        try {
           const forms = {
    av: loginApiData.getCurrentUserID(),
        fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
        fb_api_caller_class: "RelayModern",
        doc_id: "4499164963466303",
        variables: JSON.stringify({input: {scale: 3}})
  };
  const listRequest = JSON.parse(await loginApiData.httpPost("https://www.facebook.com/api/graphql/", forms)).data.viewer.friending_possibilities.edges;

        const form = {
    av: loginApiData.getCurrentUserID(),
                fb_api_caller_class: "RelayModern",
                variables: {
      input: {
        source: "friends_tab",
        actor_id: loginApiData.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
                }
  };

  const success = [];
  const failed = [];

    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";

  var targetIDs;

    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);


  const newTargetIDs = [];
  const promiseFriends = [];

  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`Stt ${stt} was not found in the list`);
      continue;
    }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(loginApiData.httpPost("https://www.facebook.com/api/graphql/", form));
                form.variables = JSON.parse(form.variables);
  }

  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    }
    catch(e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }
          if (success.length > 0) {
  logger(`Successful friendly invitation of ${success.length} person`,"[ AUTO ACCEPT ]")
          }
        } catch (e) {return console.log(e)}
      }

if (global.config.AcceptFriendRequest.toLowerCase().includes("enable") || global.config.AcceptFriendRequest.toLowerCase().includes("on") || global.config.AcceptFriendRequest.toLowerCase().includes("true") || global.config.AcceptFriendRequest.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ AUTO ACCEPT ] ❯ ") + chalk.hex("#00FF00")("is enable"))
  setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO ACCEPT ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
  autoaccept();
} else {
  console.log(chalk.bold.hex("#FF0000")("[ AUTO ACCEPT ] ❯ ") + chalk.hex("#FF0000")("is disable"))
  setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO ACCEPT ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}
async function AutoPostChristmasCountdown() {
  try {
    if (currentTime > "09-16" && currentTime <= "12-24") {
    const moment = require("moment-timezone")
    var currentYear = moment.tz("Asia/Dhaka").format("YYYY");
var currentTimeInfo = moment.tz("Asia/Dhaka").format("LLL")
const t = Date.parse(`December 26, ${currentYear}`) - Date.parse(new Date().toLocaleString('en-US', {timeZone: 'Asia/Dhaka'}));
const days = Math.floor( t/(1000*60*60*24) );
    function getGUID() {
    const key = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
    let timeNow = Date.now(),
        r = key.replace(/[xy]/g, function (info) {
            let a = Math.floor((timeNow + Math.random() * 16) % 16);
            timeNow = Math.floor(timeNow / 16);
            let b = (info == 'x' ? a : a & 7 | 8).toString(16);
            return b;
        });
  console.log(r)
    return r;
}
    const botID = loginApiData.getCurrentUserID();
     const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4612917415497545",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": `${days} Days before Christmas\n${currentTimeInfo}`
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": null,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": null,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 2,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": false,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    loginApiData.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) console.log(chalk.bold.hex("#FF0000")("[ AUTO POST ] ❯ ") + chalk.hex("#FF0000")("Post creation failed, please try again later"))

      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      console.log(chalk.bold.hex("#00FF00")("[ AUTO POST ] ❯ ") + chalk.hex("#00FF00")(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}`))
    });
    }
  } catch (e) {return console.log(e)}
}
        if (global.config.AutoPostChristmasCountdown.toLowerCase().includes("enable") || global.config.AutoPostChristmasCountdown.toLowerCase().includes("on") || global.config.AutoPostChristmasCountdown.toLowerCase().includes("true") || global.config.AutoPostChristmasCountdown.toLowerCase().includes("active")) {
          if (currentTime > "09-16" && currentTime <= "12-24") {
     console.log(chalk.bold.hex("#00FF00")("[ AUTOPOST CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTOPOST CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
          
cron.schedule('59 0 0 * * *', () => {
  AutoPostChristmasCountdown();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
          }
  } else {
          if (currentTime > "09-16" && currentTime <= "12-24") {
    console.log(chalk.bold.hex("#FF0000")("[ AUTOPOST CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTOPOST CHRISTMAS COUNTDOWN ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
          }
  }

  async function AutoPostGreet() {
  try {
    const moment = require("moment-timezone");
    var johnlester = moment.tz("Asia/Dhaka").format("HH:mm:ss");
 var umaru = (johnlester > "00:00:00" && johnlester <= "04:00:00" ? "Good morning everyone" :
                 johnlester > "04:00:00" && johnlester <= "07:00:00" ? "Good morning everyone. don't forget your breakfast" :
                 johnlester > "07:00:00" && johnlester <= "11:00:00" ? "Good morning everyone" :
                 johnlester > "11:00:00" && johnlester <= "13:00:00" ? "Good afternoon everyone. don't forget your lunch" :
                 johnlester > "13:00:00" && johnlester <= "18:00:00" ? "Good afternoon everyone" :
                 johnlester > "18:00:00" && johnlester <= "20:00:00" ? "Good evening everyone. don't forget your dinner" :
                 johnlester > "20:00:00" && johnlester <= "23:00:00" ? "Good evening everyone" : "Hello everyone have a nice day")
var lesteremoji = ["😁","😉","😗","😙","😚","😘","🥰","😍","🤩","🥳","😇","😊","☺️","😏","😌","😶"," 🤔","🤫","🤭","🤗","😒","🙄","😤","🥺","😻"," 😼","😽","😾","❤️","💗","💋"];
    var johnlesteremojirandom = lesteremoji[Math.floor(Math.random() * lesteremoji.length)];
    var currentYear = moment.tz("Asia/Dhaka").format("LLLL");
    function getGUID() {
    const key = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
    let timeNow = Date.now(),
        r = key.replace(/[xy]/g, function (info) {
            let a = Math.floor((timeNow + Math.random() * 16) % 16);
            timeNow = Math.floor(timeNow / 16);
            let b = (info == 'x' ? a : a & 7 | 8).toString(16);
            return b;
        });
  console.log(r)
    return r;
}
    const botID = loginApiData.getCurrentUserID();
     const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4612917415497545",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": `${umaru} ${johnlesteremojirandom}\n${currentYear}`
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": true,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": true,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 2,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": true,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    loginApiData.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) console.log(chalk.bold.hex("#FF0000")("[ AUTO POST GREET ] ❯ ") + chalk.hex("#FF0000")("Post creation failed, please try again later"))

      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      console.log(chalk.bold.hex("#00FF00")("[ AUTO POST GREET ] ❯ ") + chalk.hex("#00FF00")(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}`))
    });
  } catch (e) {return console.log(e)}
}


if (global.config.AutoPostGreet.toLowerCase().includes("enable") || global.config.AutoPostGreet.toLowerCase().includes("on") || global.config.AutoPostGreet.toLowerCase().includes("true") || global.config.AutoPostGreet.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ AUTO POST GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO POST GREET ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
cron.schedule(`58 0 */${global.config.AutoPostGreetPostPerHour} * * *`, () => {
  AutoPostGreet();
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
} else {
  console.log(chalk.bold.hex("#FF0000")(" POST GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO POST GREET ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}

async function AutoPost() {
  try {
    function getGUID() {
    const key = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`;
    let timeNow = Date.now(),
        r = key.replace(/[xy]/g, function (info) {
            let a = Math.floor((timeNow + Math.random() * 16) % 16);
            timeNow = Math.floor(timeNow / 16);
            let b = (info == 'x' ? a : a & 7 | 8).toString(16);
            return b;
        });
  console.log(r)
    return r;
}
    const botID = loginApiData.getCurrentUserID();
     const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "100017985245260",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": `${global.config.AutoPostText}`
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": null,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": null,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 0,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": false,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    loginApiData.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) console.log(chalk.bold.hex("#FF0000")("[ AUTO POST ] ❯ ") + chalk.hex("#FF0000")("Post creation failed, please try again later"))

      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      console.log(chalk.bold.hex("#00FF00")("[ AUTO POST ] ❯ ") + chalk.hex("#00FF00")(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}`))
    });
  } catch (e) {return console.log(e)}
}

if (global.config.AutoPost.toLowerCase().includes("enable") || global.config.AutoPost.toLowerCase().includes("on") || global.config.AutoPost.toLowerCase().includes("true") || global.config.AutoPost.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ AUTO POST ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO POST ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
cron.schedule(`58 0 */${global.config.AutoPostPerHour} * * *`, () => {
  AutoPost();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
} else {
  console.log(chalk.bold.hex("#FF0000")("[ AUTO POST ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO POST ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}

if (global.config.AutoLeave.toLowerCase().includes("enable") || global.config.AutoLeave.toLowerCase().includes("on") || global.config.AutoLeave.toLowerCase().includes("true") || global.config.AutoLeave.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ AUTO LEAVE ] ❯ ") + chalk.hex("#00FF00")("is enable"))
     setInterval(() => {console.log(chalk.bold.hex("#00FF00")("[ AUTO LEAVE ] ❯ ") + chalk.hex("#00FF00")("is enable"))}, 60000)
} else {
  console.log(chalk.bold.hex("#FF0000")("[ AUTO LEAVE ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ AUTO LEAVE ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}

if (global.config.RandomRedditMemes.toLowerCase().includes("enable") || global.config.RandomRedditMemes.toLowerCase().includes("on") || global.config.RandomRedditMemes.toLowerCase().includes("true") || global.config.RandomRedditMemes.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ RANDOM REDDIT MEMES ] ❯ ") + chalk.hex("#00FF00")("is enable"))
cron.schedule(`57 1 */${global.config.RandomRedditMemesSendPerHour} * * *`, () => {
    return request("https://meme-api.herokuapp.com/gimme/memes", async (err, response, body) => {
        if (err) throw err;
        var content = JSON.parse(body);
      let ext = content.url.substring(content.url.lastIndexOf(".") + 1);
		const memer = join(__dirname, "modules/commands/cache", `meme.${ext}`);
		await global.utils.downloadFile(content.url, memer);
      for (const idThread of global.data.allThreadID) {
		loginApiData.sendMessage({body: `Random Reddit Memes (every ${global.config.RandomRedditMemesSendPerHour} Hours)\n\n${content.title}`, attachment: createReadStream(memer)}, idThread, (error, info) => {
      if (error) console.log(chalk.bold.hex("#FF0000")("[ RANDOM REDDIT MEMES ] ❯ ") + chalk.hex("#FF0000")("Can't send " + content.title))
      console.log(chalk.bold.hex("#00FF00")("[ RANDOM REDDIT MEMES ] ❯ ") + chalk.hex("#00FF00")("Succesfully send " + content.title))
    })
      }
    });
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
  } else {
  console.log(chalk.bold.hex("#FF0000")("[ RANDOM REDDIT MEMES ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ RANDOM REDDIT MEMES ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}
if (global.config.Randombibleverse.toLowerCase().includes("enable") || global.config.Randombibleverse.toLowerCase().includes("on") || global.config.Randombibleverse.toLowerCase().includes("true") || global.config.Randombibleverse.toLowerCase().includes("active")) {
  console.log(chalk.bold.hex("#00FF00")("[ RANDOM BIBLE VERSE ] ❯ ") + chalk.hex("#00FF00")("is enable"))
const axios = require('axios');
const rpfw = await axios.get("https://httpsteam-Choru-apicom-replcomphepcomchoruofficial.project-with-my-team.repl.co/biblev2");
const pshd = rpfw.data.result;
cron.schedule('0 */30 * * * *', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(`Random Bible Verse Per Hour:\n\n"${pshd}"\n\napi by Choru`, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
  } else {
  console.log(chalk.bold.hex("#FF0000")("[ RANDOM BIBLE VERSE ] ❯ ") + chalk.hex("#FF0000")("is disable"))
     setInterval(() => {console.log(chalk.bold.hex("#FF0000")("[ RANDOM BIBLE VERSE ] ❯ ") + chalk.hex("#FF0000")("is disable"))}, 60000)
}
      
         setInterval(async function () {
              global.handleListen.stopListening(),
             global.checkBan = ![],
             setTimeout(function () {
                 return global.handleListen = loginApiData.listenMqtt(listenerCallback);
             }, 500);
             try {
                 await checkBan(loginApiData);
             } catch {
                 return process.exit(0);
             };
             if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
             global.config.autoClean && (global.data.threadInfo.clear(), global.client.handleReply = global.client.handleReaction = {});
             if (global.config.DeveloperMode == !![])
                 return logger(global.getText('mirai', 'refreshListen'), '[ DEV MODE ]');
         }, 600000);
    });
}
//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////

(async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ]');
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ]'); }
console.log(chalk.bold.hex("#00FFFF").bold("================== SUBSCRIBE MIRRYKAL TO KNOW HOW TO DO THIS ====================="));
   
})();
process.on('unhandledRejection', (err, p) => {});


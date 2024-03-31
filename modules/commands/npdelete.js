module.exports.config = {
	name: "npdelete",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "NTkhang But recreate By Alvi",
	description: "Delete file or folder in noprefix folder",
	commandCategory: "Admin-bot system",
	usages: "\n noprefix start <text>\ncache ext <text>\ncache <text>\ncache [blank]\ncache help\nNOTE: <text> is the character you enter as you like",
	cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
	if(event.senderID != handleReply.author) return; 
	const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/noprefix/'+target);
    	if(fileOrdir.isDirectory() == true) {
    	  var typef = "[Folder🗂️]";
    	  fs.rmdirSync(__dirname+'/noprefix/'+target, {recursive: true});
    	}
    	else if(fileOrdir.isFile() == true) {
    	  var typef = "[File📄]";
    	  fs.unlinkSync(__dirname+"/noprefix/"+target);
    	}
    	msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("Deleted the following files in the noprefix folder:\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {
  
  const fs = require("fs-extra");
  const permission = ["61551846081032"];
  	if (!permission.includes(event.senderID)) return api.sendMessage("আরে মদন এই command শুধু আমার বস আলভী চৌধুরী'র জন্য_😏👈🏻", event.threadID, event.messageID);
  var files = fs.readdirSync(__dirname+"/noprefix") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
    	//❎do not edit author name❎
	var msg = `
  👉Module code by MrTomXxX👈
How to use commands:
•Key: start <text>
•Effects: Filtering the file to delete the optional character
•Eg: cache rank
•Key: ext <text>
•Effect: Filter out file to delete options
•Eg: cache png
•Key: <text>
•Effect: Filter out files in the name with custom text
•Eg: noprefix a
•Key: blank
•Effects: Filter all files in noprefix
•Example: noprefix
•Key: help
•Effect: See how to use commands
•Example: Cache Help`;
	
	return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
  	var word = args.slice(1).join(" ");
  	var files = files.filter(file => file.startsWith(word));
  	
    if(files.length == 0) return api.sendMessage(`There are no files in the noprefix that begin with: ${word}`, event.threadID ,event. messageID);
    var key = `There ${files.length} file that has a character that starts with : ${word}`;
  }
  
  //The file extension is..... 
  else if(args[0] == "ext" && args[1]) {
  	var ext = args[1];
  	var files = files.filter(file => file.endsWith(ext));
  	
  	if(files.length == 0) return api.sendMessage(`There are no files in the noprefix with a character ending in .: ${ext}`, event.threadID ,event. messageID);
  	var key = `Có ${files.length} file có đuôi là: ${ext}`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("Your noprefix has no files or folders", event.threadID ,event. messageID);
  var key = "All files in noprefix directory:";
  }
  //trong tên có ký tự.....
  else {
  	var word = args.slice(0).join(" ");
  	var files = files.filter(file => file.includes(word));
  	if(files.length == 0) return api.sendMessage(`There are no files in the name with the character: ${word}`, event.threadID ,event. messageID);
  	var key = `There ${files.length} file in the name that has the character: ${word}`;
  }
  
  	files.forEach(file => {
    	var fileOrdir = fs.statSync(__dirname+'/noprefix/'+file);
    	if(fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
    	if(fileOrdir.isFile() == true) var typef = "[File📄]";
    	msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`Reply message by number to delete the corresponding file, can rep multiple numbers, separated by space.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
  	name: this.config.name,
  	messageID: info.messageID,
    author: event.senderID,
  	files
  }))
 
}
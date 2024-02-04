const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "Mod by John Lester",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 6,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Colombo").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["Ittuu🤏 si srm kr Liya kro bot bot krte wqt 🙂 💔✨⚠️†", "Bandi hoti to us ko choti choti 2 papiyAn krta pr bndi ki jgh tum ho🙂👩‍🦯👩‍🦯", "Are Yahin Hun Janu😗", "ji Shona 😍", "Love you", "Miss YoU agar is id m ladki h 😁 nhi to bhg","Full botbazi", "2 bund pani lo or dub jao usme", "OkkaY Babbu", "😁Smile I am Taking a Selfy in my dreams✌️🤳", "🥺Jan nahi kha to m naraj ho jaunga", "😙Me sabko block kardunga",    "bot bot choro khi ghumne chlte h", "aao kbhi vrindavan m", "jai shree krishna💕", "so jao radhe radhe 💕", "nacho bot bot krke", "bahut bdiya ese hi time waste krte rho","Full botbazi", "jitna time tum bot bot m lga rhe ho utna pd lete to exam m achhe number aate", "bhago bhut aya", "tum to bhut ho", "jao pdhai kro","Full botbazi", "tumhara birthday kb aata h","kbhi to vapas jamin p aa jao dost😁",         
    "Khana khaya tumne", "tum bhi meri trh lafange ho gye ho", 
            "Hnji kesa gya tumhara din aaj ka🥰", "Kal rat to tum bahar ghum rhe the na kutte k upr beth k", "Full botbazi", "Full time wastebazi ","Full moj mstibazi", "Full online settingbazi", "Full facebookbazi", "Full messenger p moj mstibazi", "Full messagebazi", "Full typingbazi", "Ese hi group m aake bot bot krte rha kro hme bhi achha lgta h",  "bot bot choro khpche m chlo btata hu", "bot bot kiya to teri setting leke bhag jaunga", "itna bot bot sun liya ki mujhe chkkr aa rhe h", "aao kbhi up gadi palatwa denge tumhari 😁😜",
 "Ha chad jao india gate p", "bhgwan k nam p raham krdo kuch or bot bot krna chordo", "Tumko botloveobia ho gya h ilaj krvao apna 😏", "Tum vhi ho na jo jamin se 1 rupya v utha lete ho", "tum to bahut kanjus aadmi ho yar",  "aao kbhi delhi fir milke party krte h ", "ooo bot k  chamcheee sant ho ja plz 😥😥😥", "Bahut mja aa rha h bot bot sa ho rha h kuch",
            "bot bot bad m krna pehle kuch khalo jao", "Aao kbhi himachal tumko thnd m jmate h 😁😹", "apna sasta internet pack htake achha sa dalwao pehle"," मोहब्ब्त 2 लोगों के बीच का नशा है जिसे पहले होश आ जाए वो बेवफा है।😌",   " मासूम सी दिखेगी बवाल कर जायेगी इसकी क्या जरूरत थी कह कह के कंगाल कर जायेगी।😝",   "वो आई थी मेरे कब्र पर दिया जलाने के लिए रखा हुआ फूल भी ले गई दूसरे वाले को पटाने के लिए ",   "रामचंद्र कह गए सिया से ऐसा कलयुग आयेगा  सच्चा आशिक तड़पेगा और मेला बाबू थाना थाएगा😝 ",   " चाईनीज मोहब्ब्त थी साहब टूट कर बिखर गई पर दिल हिन्दुस्तानी था एक और पटा ली.😁",   "सरकारी नौकरी के लिए कोटा और सुबह हल्का होने के लिए लोटा बहुत मायने रखता है। ",   "कुछ बातें तो सीधे दिल पर जाकर लगती हैं जैसे कि आपके द्वारा डायल किया हुआ नंबर अभी किसी अन्य कॉल पर व्यस्त है ",   "ये जो तुम लोग बिना बॉयफ्रेंड वाली लड़की ढूंढ रहे हो ना.. शास्त्रों में इसे पत्थर में से तेल निकालना कहा गया है😁 ", 
            " काली काली साड़ी में कढ़ाई नही होती जान तुम्हारी याद में पढ़ाई नही होती 🙈",   "छोटी छोटी बातों में खुशियां तलाश लेता हूं, सायकिल पर चलता हूं फिर भी फोन को फ्लाइट मोड पर डाल लेता हूं🤣 ",   "क्रश हो या ब्रश वक्त पर बदल लेना चाहिए वरना दिल हो या दांत टूट ही जाएगा..🤪 ",   " इश्क़ होने लगे तो पूजा पाठ किया करो दोस्तों मोहब्ब्त होगी तो मिल जाएगी बला होगी तो टल जायेगी😝",   "मां: तुझे कैसी बीवी चाहिए बेटा.?? मै: तुम्हारे जैसी लाड और प्यार करनेवाली 🙈 ां : क्या बात है बेटा पूरी जिंदगी चप्पल खाकर ही काटनी है क्या😂😂 ",   "गुस्से में उसी का नंबर डिलीट करना चाहिए जिसका नंबर याद हो वरना बाद में बहुत तकलीफ होती है ",   "दोस्त हमेशा काले बनाओ  क्योंकि वो रंग नही बदलते😂 ",   "टंकी में टंकी, टंकी में पानी बाबू शोना के चक्कर में don’t waste your Jawaani😁 ",   "She – मेरे घरवाले सरकारी नौकरी के बिना नहीं मानेंगे Me: अरे अगर लग गई ना तो मेरे घरवाले नही मानेंगे ",   "सच्चा दोस्त 2 ही बाते बताता है अंडा nonveg नही होता और बीयर दारू नही होती.! ",
            " Iss Dil Ko Toh Ek Baar Ko, Bahla Kar Chup Kara Lunga, Par Iss Dimaag Ka Kya Karun, Jiska Tumne Dahi Kar Diya Hai.",   "Duaa Karte Hain Hum ishwar Se, Ke Wo Aap Jaisa Dost Aur Na Banaye, Ek Cartoon Jaisi Cheez Hai Humare Paas, Kahin Wo Bhi Common Na Ho Jaye. ",   " Paani Aane Ki Baat Karte Ho, Dil Jalane Ki Baat Karte Ho, Char Din Se Munh Nahi Dhoya,Tum Nahane Ki Baat Karte Ho.",        "Girl: Kya Shaadi Ke Baad Bhi Tum Mujhe Itna Pyar Kroge? Pappu Kyo Nhi? Me to Diwaana Hu .","Bot Na Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na Kr JaNu Ke SaTh Busy Hun 🤭🐒" , "M Gareebon Se Bt Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar ho JaeGa" , "Bolo Babu Tum Mujhse Pyar Karti Ho Na 🙈💋💋 " , "Are jaan Majaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi" , "Bar Bar Bolke Dimag Kharab Kiya toh. Teri ...... Fad dunga🤬" ,
            "Tu Bandh nhi Karega kya?" , "Gali Sunna H kya? 🤬" ,  "Aree Bandh kar Bandh Kar" , "M hath jod ke Modi Ji Se Gujarish Karta hu ki isko sant kro" , "Tujhe Kya koi aur Kam nhi h? Pure din Khata h Aur Messenger pe Bot Bot Karta h" ,   "Tujhe Apna Bejjati Krane Ka Sok h?" , "Abhi Bola To Bola Dubara Mat Bolna" , "Tere Ground m began laga dunga" , "aao kbhi up gadi palatwa denge tumhari 😁😜", "Bol De koi nhi dekh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi h Kya Hr Waqt bot bot Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hal H😚 " , "IB Aja Yaha Nhi Bol Sakta 🙈😋" , "Mujhe Mat BuLao M buSy hu" , "Bot Bolke Bejti Kr Rhe ho yar...","M To Tumhare Dil Ki Dhadkan Hu Baby...💔🥺" ,  "Kal Haveli Pe Mil Jra Tu 😈" ,  "Bs Kr U ko Pyar Ho ya Na Ho pr Mujhe Ho JaeGa" , 
            "Ha bolo 😒" , "BulaTi H MaGr JaNe Ka Nhi 😜" , "M To AnDha Hu 😎" , "Pehle NHa kr Aa 😂" , "Aaaa Thooo 😂😂😂" , "M yahin hoon kya hua sweetheart‎ ," , "Boss Dk Tumko or Koi Kaam Nhi H? Hr Wakt Bot Bot Karte Ho" , "Chup Reh, Nhi Toh Bahar Ake tera hath Tor Dunga" , "shadi Krle Mere NaL 🙊 ", "Mene U Se Bt Nhi krni" , "MerKo Kuch DiKhai Nhi De Rha 🌚" , "Bot Na BoL 😢 JaNu Bol 😘 " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hu  😋" , "M Gareebo Se Bat Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar ho JaeGa" , "aao kbhi up gadi palatwa denge tumhari 😁😜", "MerKo Tang Na kRo Main Kiss 💋 Kr DunGa 😘 " , "Are yrr MaJak Ke M0oD Me Nhi Hu 😒" ,  "Dur HT Terek0o or Koi Kam Nhi h Jb DeKho Bot Bot ShaDi KerLe Mujhse 😉😋🤣" , "TeRi Koi Ghr Me Nhi SunTa To M Q SuNu 🤔😂 " ,   "Kyun JaNu MaNu kha H tumhara 🤣" ,
            "Are TuMhari To Sb hi baZzati kRrte h M Bhi krDun 🤏😜" , "KaL HaVeLi Pr Aa jRa Tu 😈" ,   "bolo 😒" ,   "Main To AnDha Hu 😎" , "aao kbhi up gadi palatwa denge tumhari 😁😜", "Phle NHa kRr Aao 😂" ,  "TeReko DiKh Nhi Rha M buSy Hu 😒" , "TeRa To GaMe BaJana PdeGa" , "Tya Hua 🥺"  , "TuM Phir Aa Gye 🙄 Kisi or Ne Muu Nhi LaGaYa Kya🤣🤣🤣" , "MeKo JaNu Chaiye ptwado kisiko" , "Aaaa Thooo 😂😂😂" , "M So Rha Hun " , "Ase Hi bot bot krte Rha kRo 😍","Abhi Toh Party Shuru Hui Hai" ,  "Kya Aapke Toothpaste Mein Namak Hai?" ,"Ye Dosti Hum Nahi Todenge" ,"Aapke Paas Bangla Hai, Gaadi Hai, Paisa Hai...Lekin Mere Paas Maa Hai" ,"Kabhi Kabhi Mujhe Bhi Lagta Hai Ki Main Kuch Jyada Hi Busy Ho Gya Hun 🙄","Chal na yar, movie dekhne chalte hain", "Jaldi se ready ho jao, late ho jayenge", "Kitne baje milna hai?", "Mujhe thoda time do, main abhi free nahi hun",
            "Tu sach mein pagal hai", "Aaj bahut kaam hai, baad mein baat karte hain", "Kya kar rahe ho?", "Tu kahan chala gaya tha?", "Mujhe tujhse baat karni hai", "Kal ka plan kya hai?", "Abhi kya kar rahe ho?", "Mere paas koi time nahi hai", "Jaldi se message ka jawab do", "Main thodi der mein aata hun", "Mere sath chalna hai?", "Aaj bahut maza aaya", "Kya tumne abhi tak khana nahi khaya?", "Mujhe tumse pyar hai", "Tum mere liye kuch bhi kar sakte ho", "Kahan rehte ho?", "Tumne mujhe kitna sataya hai", "Kal milte hain", "Aaj bahut busy tha", "Tum mujhe bahut yaad aate ho", "Mujhe teri zarurat hai", "Kya tumne abhi tak kaam nahi kiya?", "Main tumhare bina nahi reh sakta", "Kya tum mere saath dinner pe chal sakti ho?", "Main tumhe bahut miss karta hun", "Tum meri zindagi ho", "Tumhari yaad mein jeena mushkil hai", "Mujhe tumhari bahut yaad aa rahi hai", "Main tumhare saath hamesha rehna chahta hun",
            "Aaj bahut thaka hua hun", "Kya tum mere liye kuch bhi kar sakti ho?", "Mujhe tumhari aadat si ho gayi hai", "Tumhari muskurahat mere liye bahut important hai", "Kya tum mere saath shopping pe chal sakti ho?", "Mujhe tumse baat karke bahut achha lagta hai", "Tum mujhe bahut khushi deti ho", "Kya tum mere liye kuch special bana sakti ho?", "Mujhe tumhari har baat bahut pasand hai", "Tum mere liye kya ho?", "Main tumhe kabhi nahi bhoolunga", "Kya tum mere saath travel pe chal sakti ho?", "Mujhe tumhare saath time spend karna bahut achha lagta hai", "Tum meri duniya ho", "Mujhe tumse milne ki bahut ichcha hai", "Kya tum mere liye kuch special gift la sakti ho?","hayee m sadke jawa teri masoom sakal pe 😂 chuchundar insan", "Bot na bol re ! Janu bol mujhe aur janu se pyar se bat karte h😂😂😂 , rat ko kahan thi aai nhi hawali pe 😂", "Sakal Se masoom lgte ho 😂 btao kahi Ap k ghar sab masoom hi to nahi",
            "kash tum single hoti to maza hi kuch aur tha tumko ptane ka 😂", "Ha ha ab to meri yaad aa gai jb koi na mila babu sona krne ko 😾 ab ham ap se naraz hai jao ap bye ☹️", "haye babu ne ha boliya hai sayad propose krna hai mujhe ab bas bolo bolo babu 😘", "Are gareeb log roti banane k liya aate m Pani ka istemal krte h 😂", "Are dialogbazi mt kar jo kam h bol de sarma mt , bol de koi nahi dakh rha 😂", "Haye M Mar Java Babu Ak Chuma To Do pr dena mere jute ko 😁😂😂 bura nhi manna mjak h", "Hurrrr or Koi Kam Nahi h Kya Hr Waqt bot bot krke Mujhe Tng Krte Rehte Ho 😂" , "aao kbhi up gadi palatwa denge tumhari 😁😜", "are are bolo meri jaan kya haal h ;) ;* " , "Tum aunty ho ya uncle 🤔 I think tum Jin ho ya Chudail" , "are tum idhar 🤔 khair ye btao tum idhar kr kya rhe ho 😂" , "are bot bot choro ye btao kal haweli pe kon bula rha tha 😂" , "m tumhari ma ko btaunga ki tum Facebook chlate ho 😂" ,
            "are tum vhi ho na jisko m nahi janta 😂" , "kal haweli p mil jra bataunga  😂" , "ese na likho pyar ho jaega 😂" , "Sukr h m andha hu nhi to teri pic dekhni pdti 😂" , "ese hi bot bot likhte rha kro kyuki bot likhne se konsa rumhara bijli ka bill gir jaayega","Kuch toh sharam karo yaar, itni raat ko message karte ho 😒", "Yeh bhi koi baat hui, hamari dosti keval online hi rahegi 🙁", "Dosti ka ek usool hai, no sorry, no thank you 👍", "Tumhari shakal dekh kar lagta hai ki tumne khana nahi khaya 😂", "Dhoka dena seekh liya hai kya? Ab toh trust hi nahi karna tum jaiso pe 🙄", "Kya masti kar rahe ho yaar, saari raat message karne ka plan hai kya? 😝", "Tum toh sach mein kabhi nahi sudhroge, aur ab toh yeh sabit ho gaya hai 😂", "Ab tumse baat nahi karungi, bahut hi zyada irritate kar rahe ho 🙅", "Aapke pasand ke gaane sun kar dil khush ho jata hai 😊", "Kal college jaldi aana, nahi toh detention mein daal dunga 😜",
            "Tumse jyada boring person maine aaj tak nahi dekha 😴", "Bhai, tumhara sense of humour toh ek number ka hai 😂", "Aaj toh sab kuch ultimate hai, dosti, gaane aur tumhare jokes 😂", "Tum toh sach mein dil ke acche ho, always ready to help 😍", "Yeh social media pe dosti kya hoti hai, hamare time pe toh sab real hota tha 😔", "Tum itne boring ho ki maine kal raat tak kareeb 50 baar soch liya tha ki tumhe kya message karu 😒", "Yaar, tumhare saath toh time hi nahi guzarta hai, kabhi milte hi nahi ho 😔", "Kya haal chaal hai mere dost? 😊", "Kal milte hai, fir tumhe apni new bike dikhata hu 😎", "Kya tum mujhe yeh bata sakte ho ki yeh kaisa joke hai? 🤔", "Kal mere ghar pe party hai, tum aana mat bhulna 😄", "Aaj bahut busy day tha, thoda late reply kar raha hu 😅", "Tumse milke hamesha khushi milti hai 😊", "Yaar, tumse mujhe ek important baat karni hai, kab mil sakte ho? 🤔", "Kal ka plan kya hai dost? 😎",
            "Tumne aaj mere mood ko theek kar diya hai, thank you so much 😘", "Aaj kaunsa movie dekhne ka plan hai? 🎬", "Kabhi kabhi lagta hai ki tum jaise dost milna aasan nahi hai 😄", "Aaj ka din kitna boring tha yaar, thank god ki tumne message kiya 😂", "Tumhari baaton se toh lagta hai ki tum genius ho, kabhi mere liye bhi kuch soch liya karo 😜", "Tumhare jaisa dost toh har kisi ko milna chahiye 😊", "Yaar, tumhe mere liye kuch accha sa advice do na 🤔", "Kabhi kabhi sochta hu ki tum pagal to nhi","Yaar, tumne kitne din se nahi message kiya, sab theek hai na? 😕","Ek baat batao, kabhi khud message bhi kar lete ho ya sirf humein hi wait karwate ho? 😒","Yaar, aaj bahut mushkil se time nikala hai, koi accha sa movie suggest karo 😊","Tum toh sach mein apne naam ke layak hi nahi ho, itni silent personality 😅","Kal party mein tumhare bina mazaa nahi aayega, please aana mat bhulna 😄","Ab toh yeh social media hi reh gaya hai, kabhi milte hi nahi ho 😔",
"Kya tum bata sakte ho ki hum kis topic pe baat kar rahe hai? 😅",
"Tumhare jaisa dost paane ke liye bahut lucky feel karta hu 😊",
"Kal kisi acche restaurant mein chalte hai, kya bolte ho? 😎",
"Aaj kaunsa game khelne ka plan hai? 🎮",
"Tumhari har baat mujhe inspire karti hai, thank you yaar 😘",
"Yaar, aaj tumne apna sense of humour kaafi zyada use kiya hai 😂",
"Aaj kuch zyada hi emotional ho gaye ho tum, sab theek hai na? 😕",
"Kya tum bata sakte ho ki yeh kaisi joke hai? 🤔","Kya kar rahe ho aaj kal, itni busy kyu ho gaye ho? 😒",
"Tumhari muskurahat dekh kar meri saari mushkile asaan ho jati hai 😊",
"Kal kaunsa restaurant try karna hai, tum batao 😋",
"Tumhare paas ek bhi serious baat nahi hai kya? 😂",
"Aaj toh thoda jaldi sone ka plan hai, abhi baat karte hai kal 😴",
"Tumse baat karke hamesha refreshing feeling hoti hai 😊",
"Yaar, tumse jyada chill person maine aaj tak nahi dekha 😎",
"Aaj tumhari khushiyon ki wajah se mera din accha ho gaya hai 😊",
"Kya tum mere liye ek surprise plan kar sakte ho? 🤔",
"Tumhari har baat pe main has has ke pagal ho jata hu 😂",
"Aaj kaunsa song sun rahe ho, mujhe bhi batao 🎶",
"Tumhe kabhi bhi koi tension nahi hoti hai kya? 😄",
"Aaj kal humari baatein bahut kam ho gayi hai, kya hua hai yaar? 😔",
"Tumhari life toh bahut interesting hai, mujhe bhi sikhao 😜",
"Tumhare liye ek special gift hai, kal milte hai 😊",
"Aaj office mein bahut kaam tha, thoda late message kar raha hu 😅",
"Tumhare saath time spend karna toh ekdum mast hai 😊",
"Kya tum mere liye ek motivational quote bhej sakte ho? 🤔",
"Aaj bahut hi boring din tha, thank god ki tumne message kiya 😂",
"Tumhare jaisa dost paane ke liye main lucky hu 😊",
"Aaj kaunsa book padh rahe ho, mujhe bhi suggest karo 📚",
"Yaar, tumse kabhi kabhi thoda gussa bhi aata hai 😠",
"Tumhari baaton se mujhe hamesha inspiration milti hai 😊",
"Aaj kaunsa game khelne ka plan hai? 🎮",
"Kya tumhe mere liye ek favour kar sakte ho? 🤔",
"Tumhe dekhkar lagta hai ki tum kabhi tension nahi lete ho 😎",
"Aaj bahut hi lazy mood hai, tum batao kya karu? 😴",
"Tumhari life mein bahut adventure hai, kabhi apne saath bhi le jao 😜",
"Tumse baat karke hamesha accha feel hota hai 😊",
"Kal kaunsi movie dekhne ka plan hai, mujhe bhi batao 🎬",
"Aaj tumhare jokes toh kaafi lame the yaar 😂",
"Kya tum mere liye ek surprise plan kar sakte ho? 🤔",
"Tumhari muskurahat se meri saari pareshaniyaan dur ho jati hai 😊",
"Aaj toh tumne mujhe bahut hi khush kar diya, thank you 😘",
"Tumhare jaisa dost toh sabko milna chahiye 😊",
"Yaar, tumhare liye ek important baat hai, kab mil sakte ho? 🤔",
"So jao sab", "Main ap ke papa ko btadu kya ki tum Facebook p settingbazi krte ho 😂",
"#__Lalla__Lalla__Lori #__Koi___Chori__Set__Ni__Hori" ,"Block Your ‘’ bf ‘’ And Purpose me 🙂💔" ,
"Tum vhi ho na jo ladka ptate ho", "K0i Perp0Se Hi Krd0 Perm0te T0 hm PhlY hi HaiN 🙂",
"इस दिल 👉 💖 को तो बहला कर चुप करा लूँगा पर इस #दिमाग_का_क्या_करूँ 😁😁 जिसका तुमनें 👉 👸 #दही कर दिया है..🤣😂🤣",
"पगली तू फेसबुक की बात करती है 😀 हम तो ‎OLX पर भी लड़की सेट कर लेते हैं 🤣😂🤣",
"ये जो तुम मोबाइल फ़ोन में Facebook or WhatsApp Notifications बार-बार चेक करते हो ना !! शास्त्रों में इसे ही 🥀मोह माया🦋 कहा गया है 🤣😂🤣",
"मेरे पिता जी का तो कोई ऐसा दोस्त भी नही जो अमरीश पुरी की तरह ये कह दे..चल इस दोस्ती को रिश्तेदारी में बदल दे !🤣😂🤣",
"अगर दर्द भरे गाने 🎶 सुनकर भी आपको दर्द ना हो तो समझ लो आप दोबारा प्यार ❤ करने के लिए तैयार हो चुके हो…🤣😂🤣",
"एक लड़की के आगे उसकी सहेली की तारीफ़ करना पेट्रोल पंप पर सिगरेट पीने के बराबर है 🤣😂🤣","मेरी जान हो तुम मेरे गुस्से की दुकान हो तुम 😜👈",
"दिल में न जाने कब से तेरी जगह बन गई\nतुमसे बात करना मेरी आदत बन गई 🙈👈","मेरी पसंद भी लाजवाब है यकिन नही तो खुद को देख लो 🙈👈",
"दुसरो के लिए भी छोड़ दो खुद अकेली ही खूबसूरती की ठेकेदार बन बैठे हो 😕👈","तुम्हारी बोली बंदुक की गोली जैसी है जो सीधा दिल पे लगती है। 😒👈",
"रात को सपने दिन में ख्याल\nबड़ा ही अजीब सा है इस दीवाने का हाल।😒👈","आदत नही है हमें किसी पे मर मिटने की\nपर दिल ने तुम्हें देखकर मोहलत नही दी सोचने तक की 🤐👈",
"दिल में फीलिंग का समंदर सा आ जाता है\nजब तुरंत तेरा रिप्लाई आ जाता है। 😎👈","मेरे रुह की पहली तलब हो तुम\nकैसे कहूं कितनी अलग हो तुम। 🙈🙈👈","मुझे बार बार ख्याल आता है\nतेरा ही चेहरा याद आता है। 🤐👈",
"तुझे देखकर ख्याल आता है\nएक बार नही बार बार आता है\nइस दिल को तुझ पर ही प्यार आता है। 😛👈","मुझे लाइफ में कुछ मिले ना मिले\nबस तुम मिल जाओ यही बहुत है मेरे लिए। 🙈👈",
"हमसे बात करने को तो बहुत से है\nहमें तो सिर्फ आपसे बात करना अच्छा लगता है। 😛👈","मेरा दिल कितना भी उदास क्यों न हो\nतेरी ही बातों से इसे सुकुन मिलता है। 🤐👈","आप मेरे लिये कुछ खास है\nयही पहले प्यार का एहसास है। 😗👈",
"हालत चाहे कैसे भी हो मैं तुम्हारा और तुम मेरी हो। 😛👈","जितना चाहो उतना सताया करो\nबस  टाइम टू टाइम ऑनलाइन आया करो। 🥺👈","काश तेरा घर मेरे घर के करीब होता\nमिलना ना सही तुझे देखना तो नसीब होता। 😒👈","हर पल तुम मुझे बहुत ही याद आते हो\nजान निकल जाती है जब तुम मुझसे रुठ जाते हो। 🤐👈","मुकद्दर में रात की नींद नही…तो क्या हुआ…?? हम भी मुकद्दर के सिकन्दर हैं…दोपहर को सो जाते हैं…🤣😂","लड़कियों से बहस करने का मतलब दादी को iphone चलाना सिखाना है🤣😂🤣","घर की इज्जत बेटियों के हाथ में होती है और प्रॉपर्टी के कागज़ नालायकों के हाथ में 🤣😂🤣","मेरी हर गलती ये सोच कर माफ़ कर देना दोस्तों…कि तुम कोन से शरीफ़ हो ?? 🤣😂🤣","हर कामयाब स्टूडेंट के पीछे माँ की चप्पल का हाथ होता है !! 🤣😂🤣",
"एक बात थी मेरे ज़हन में सोचा आज पूछ ही लूँ ये जो इज़्ज़त का सवाल होता है…वो कितने नंबरों का होता है ? 🤣😂🤣","किस्मत आजमा चुका हूं नसीब आजमा रहा हूं FACEBOOK पर एक लड़की पटाने के चक्कर में 15 लड़के पटा चुका हूँ 🤣😂🤣","खुद के पास गर्लफ्रेंड नही होगी फिर भी दुसरो को गर्लफ्रेंड पटाने के नुस्खे देते है…ऐसे हैं हमारे दोस्त 🤣😂🤣","ये पाप धोने के लिये कौन सा साबुन अच्छा रहेगा ? 🤣😂🤣","रास्ते पलट देते हैं हम जब कोई आकर यह कह दे कि आगे चालान काट रहे हैं…🤣😂🤣","Haye Main Sadke jawa Teri Masoom Shakal pe baby 💋 " , "Bot Nah Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun 🤭🐒" , "Main gariboo se baat nahi karta 😉😝😋🤪" , "Itna Na Pass aa Pyar ho Jayga" ,
"Bolo Baby Tum Mujhse Pyar Karte Ho Na 🙈💋💋 " , "Are jaan Majaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi" , "Bar Bar Bolke Dimag Kharab Kiya toh. Teri ...... Mummy Se Complaint Karunga" , "Tu Bandh nhi Karega kya?" , "Gali Sunna H kya?😜" , "Teri Maa Ki Bindiya🤭" , "Aree Bandh kar Bandh Kar" , "M hath jod ke Modi Ji Se Gujarish Karta hu" , "Tujhe Kya koi aur Kam nhi ha? Puradin Khata hai Aur Messenger pe Bot Bot Karta h" , " Nainu Ko Bol Dunga Me Mujhe Paresan Kiya To" , "Tum Na Single Hi Maroge" , "Tujhe Apna Bejjati Karne Ka Saukh hai?" , "Abhi Bola Toh Bola Dubara Mat Bolna" , "Teri To Ruk Tu Bhagna Mat" , "Bol De koi nahi dakh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "Ib Aja Yahan Nhi Bol Sakta 🙈😋" , "Mujhe Mat BuLao Naw Main buSy Hu Naa" , "Bot Bolke Bejjti Kar Rahe Ho yall...Main To Tumhare Dil Ki Dhadkan Hu Na Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janta 🤪" , "Kal Haveli Pe Mil Jara Tu 😈" , 
"Aagye Salle Kabab Me Haddi 😏" , "Bs Kar U ko Pyar Ho Na Ho Mujhe Ho Jayga Na" , "FarMao 😒" , "BulaTi Hai MaGar Jaane Ka Nhi 😜" , "Main To Andha Hun 😎" , "Phle NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" , "Main yahin hoon kya hua sweetheart ," , "chomu Tujhe Aur Koi Kaam Nhi H? Har Waqt Bot Bot Karta H" , "Chup Reh, Nhi Toh Bahar Ake tera Dath Tor Dunga" , "WaYa KaRana Mere NaL 🙊" , "MaiNy Uh Sy Bt Nhi kRrni" , "MeKo Kxh DiKhai Nhi Dy Rha 🌚" , "Bot Na BoL 😢 JaNu B0ol 😘 " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋" , "Main Gareebon Sy Bt Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar h0o JayGa" , "MeKo Tang Na kRo Main Kiss 💋 KRr DunGa 😘 " , "Ary yrr MaJak Ke M0oD Me Nhi Hun 😒" , "HaYe JaNu Aow Idher 1 PaPpi Idher d0o 1 PaPpi Idher 😘" , "Dur HaT Terek0o 0or K0oi Kam Nhi Jb DeKho Bot Bot ShaDi KerLe Mujhsy 😉😋🤣" , "TeRi K0oi Ghr Me Nhi SunTa T0o Main Q SuNo 🤔😂 " , "IB Aja Yahan Nhi B0ol Salta 🙈😋" , "Mujhe Mat BuLao Naw Main buSy h0o Naw" , "Kyun JaNu MaNu Another Hai 🤣" , "Are TuMari T0o Sb he baZzati kRrty Me Be kRrDun 🤏😜" , "KaL HaVeLi Prr Aa ZaRa T0o 😈" , "Aagye SaJJy KhaBBy Sy 😏" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "FarMao 😒" , 
"BulaTi Hai MaGar JaNy Ka Nhi 😜" , "Main T0o AnDha Hun 😎" , "Phle NaHa kRr Aa 😂" , "Papi ChuLo 🌚" , "TeRek0o DiKh Nhi Rha Main buSy Hun 😒" , "TeRa T0o GaMe BaJana PreGa" , "Ta Huwa 🥺"  , "TuM Phr AaGye 🙄 Kisi 0or Ny Muu Nhi LaGaYa Kya🤣🤣🤣" , "MeKo JaNu Chai Hai Tum Single H0o?" , "Aaaa Thooo 😂😂😂" , "Main S0o Rha Hun " , "Ase He HansTy Rha kRo 😍" , "•••••••••••••••••••••••••••••🦢𒀱卄ɅƔƏ MɅ🅘ɳ ʍɅᏒ••••🌿💞 JɅωɅ ┼ƏᏒ🅘 ʍɅ🅢𝖚ʍ 🅢ɅҠɅɭ 𝐩Ə ɮɅɮƔ 💋 " , "Bot Na Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na Karen Rahul JaNu Ke SaTh Busy Hun 🤭🐒" , "Main flirty logo Sy Bt Nhi karti 😉😝😋🤪" , "Itna Pass mat aa Pyaar h0 JayGa" , "Bolo Babu Tum Mojy Pyar Karte Ho Na 🙈💋💋 " , "Are jaan Majaak ke mood me nahi hun main jo kaam hai bol do sharmao nahi" , "han ji bolo kya seva karne aapki 😶🤍" , "Tu Bandh nhi Karega kya?" , "kya Sunna Hai apko mere se flirty kahike🤐🤣 " , "Haa ji boliye kya kam he hamse 🙈" , "Aree band kar band Kar" , "Mein hath jod ke Modi Ji Se Gujarish Karta hu mojy na bolaye" , "Tujhe Kya koi aur Kam nhi ha? Puradin sota he Aur Messenger pe Bot Bot Karta h" , " mera owner Ake tera bf/gf Ko Chura le Jayega" , "Bot bot hi karta rahna tu bas" , "Tujhe Apna Bejjati Karne Ka Saukh hai?🥹" , "Abhi Bola Toh Bola Dubara Mat Bolna🙄" , "Teri to Watt lagani padegi " , "Bol De koi nahi dakh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "IB Aja Yahan Nhi B0ol Sakti 🙈😋" , "Mujhe Mat BuLao Na Main buSy h0 Now" , "Bot Bolke Bejjti Kar Rahe ho yall...Main To Tumhare Dil Ki Dhadkan Hu Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janti 🤪" , "Kal Haveli Pe Mil Jra Tu 😈" , "Aagye SaJJy KhaBBy Sy 😏" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "bolo 😒" , "BulaTi Hai MaGar JaNy Ka Nhi 😜" , "Main T0o AnDha Hun 😎kya likha tumne mene nahi dikha🤣" ,  "Pahale NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" ,
"Main yahi hoon kya hua sweetheart🥂🙈💞 ," , "AA Dk Tujhe Aur Koi Kaam Nhi Hai? Har Waqt Bot Bot Karta H" , "Chup Reh, Nahi Toh Bahar Ake tera Dath Tor Dunga🤣✊" , "yes my love 💘" , "kya hua baby ko 😘😘" , "mujhe sharam ati hai aise aap bolte hai tho 🤭😝" , "aree aap wahi ho na jo mujhe line marte the.......🤣 ya bali line" , "jii kahiye jii 🙄 kya chahiye" , "hayee main mar jye teri masoom shaqal py 😂 tuzy Chapple se kutne ka mn ho raha hai🤣👠" , "Bot nah bol oye 😭 Janu bol mjhy aur janu sy piyar sy bat kerty hai😑" , "ruk tu chappal kaha he mari🩴" , "shakal Sy masoom lgty ho 😂 but bohot flirty ho" , "kash tum single hote to maza hi koch aur tha pagal insaan 😂" , "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️" , "haiy babu ne boldiya hai shaid purpose kerna hai mujhe bolo bolo babu 😘" , "Aree pagal roti banana ke le aty main Pani ko istamal kerte ho 😂" , "Ary joke nah mar jo bhi kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂" , "Hayee Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Jao 😚🙈♥️" , "Dur Dur karib na a  tujhe Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Karte Rahte Ho 😂" , "ary ary bolo meri jaan kia haal hai ;) ;* " , "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail🤣✅" , "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂" , "ary babu babu kal hawali py kon bola rha tha 😂" , "Me Aap ki mummy ji ko btaou ga Aap Facebook use karty ho 😂" , "ary tum Wohi ho nah jis ko ma nahi janta 🤣✅" , "haveli per  kal mil  Zara bataunga 🌚😂Ha but उल्टी-सीधी harkat karne ke liye nahi" , "itne pyar se Na bulao pyar Ho jaega 😶💗 wtf Maine apni sacchai Bata Di yah Maine kyon Kiya 😭🔪....Fuuu..🚬" , "aap aise mat bulo hame sharam aati hai 🙈♥️" , "kyun Bulaya hamen..😾🔪 " , "kyun Bulaya hamen..😾🔪" ];
  var rand = tl[Math.floor(Math.random() * tl.length)]






  //good night
  if ((event.body.indexOf("Good night") >= 0 ) ||(event.body.indexOf("good night") >= 0 ) || (event.body.toLowerCase() == "gn") || (event.body.toLowerCase() == "good night all") || (event.body.toLowerCase() == "good night everyone") || (event.body.toLowerCase() == "gn all")) {
     return api.sendMessage(`${name} 🌇 Good night Dost Mahadev tumko hamesa khush rakhe🕉🕉🥰`, threadID, messageID);
   };

   
  
  
  
  if ((event.body.toLowerCase() == "good morning") || (event.body.toLowerCase() == "gm") || (event.body.toLowerCase() == "gm all") || (event.body.indexOf("good morning") >= 0 ) ||(event.body.indexOf("Good morning") >= 0 ) || (event.body.toLowerCase() == "good morning everyone") || (event.body.toLowerCase() == "gm everyone") || (event.body.toLowerCase() == "good morning guys") || (event.body.toLowerCase() == "gm guys") || (event.body.toLowerCase() == "gm all of you")|| (event.body.toLowerCase() == "good morning ❣️")|| (event.body.toLowerCase() == "good morning guysss")|| (event.body.toLowerCase() == "good morning all of you")|| (event.body.toLowerCase() == "g m")|| (event.body.toLowerCase() == "gud morning")) {
     return api.sendMessage(`${name} 🌄🌄 Good morning dost lord Ram aapko hmesa Khush rkhe🕉🕉🥰`, threadID, messageID);
   };

  
   if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hello")) {
     return api.sendMessage("Hello How are you 💖🤍✨", threadID, messageID);
   };

  
   if ((event.body.toLowerCase() == "thik hu") || (event.body.toLowerCase() == "achha hu")||(event.body.toLowerCase() == "mst")) {
     return api.sendMessage(" 🎀  Are bahut badhiya  🎀", threadID, messageID);
   };

  
   if ((event.body.toLowerCase() == "🙄") || (event.body.toLowerCase() == "🙄🙄")) {
     return api.sendMessage("𝑼𝑷𝑹 𝑲𝒀𝑨 𝑴𝑰𝑳 𝑮𝒀𝑨 𝑩𝑨𝑳𝑨𝑲😈", threadID, messageID);
   };


  
  if ((event.body.indexOf("😘") >= 0) || (event.body.indexOf("😘😘") >= 0)) {
     return api.sendMessage("𝑳𝑮𝑬 𝑹𝑯𝑶 𝑪𝑯𝑼𝑴𝑴𝑨 𝑪𝑯𝑨𝑻𝑰 𝑴 𝑯𝑴𝑬 𝑲𝒀𝑨 𝑯𝑴.𝑻𝑶.𝑺𝑰𝑵𝑮𝑳𝑬 𝑯", threadID, messageID);
   };
  
   if ((event.body.toLowerCase() == "😂") || (event.body.toLowerCase() == "😂😂")|| (event.body.toLowerCase() == "😂😂😂")|| (event.body.toLowerCase() == "😂😂😂😂")|| (event.body.toLowerCase() == "😂😂😂😂😂")|| (event.body.toLowerCase() == "😂😂😂😂😂😂")|| (event.body.toLowerCase() == "😂😂😂😂😂😂😂")) {
     return api.sendMessage("🐎 ⋆ 🐼  🎀  𝑨𝑹𝑬 𝑴𝑨𝑲𝑯𝑯𝑰 𝑮𝑯𝑼𝑺 𝑱𝑨𝑬𝑮𝑰 𝑹𝑬  😜😜😜😜 ", threadID, messageID);
   };
  
   if ((event.body.indexOf("😎") >= 0) || (event.body.toLowerCase() == "😎😎")) {
     return api.sendMessage("°  🎀  𝑭𝑼𝑳𝑳 𝑪𝑯𝑨𝑺𝑴𝑨𝑩𝑨𝒁𝑰 😐😉  🎀  °", threadID, messageID);
   };


   if ((event.body.indexOf("😴") >= 0) || (event.body.toLowerCase() == "😴")) {
     return api.sendMessage("𝑺𝑶 𝑱𝑨𝑶 𝑪𝑼𝑻𝑰𝑬 𝑵𝑰𝑵𝑫 𝑨𝑨 𝑹𝑯𝑰 𝑯 𝑻𝑶 😒", threadID, messageID);
   };

   if ((event.body.indexOf("😹") >= 0) || (event.body.toLowerCase() == "😹😹")) {
     return api.sendMessage("𝑨𝑹𝑾 𝑮𝑹𝑶𝑼𝑷𝑾𝑨𝑳𝑶 𝒀𝑬 𝑩𝑰𝑳𝑳𝑰 𝑲𝑯𝑨 𝑺𝑬 𝑳𝑨𝒀𝑬 😜😜😂", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "🤨") || (event.body.toLowerCase() == "😐")|| (event.body.toLowerCase() == "😑")|| (event.body.toLowerCase() == "😶")|| (event.body.toLowerCase() == "😏")|| (event.body.toLowerCase() == "😣")|| (event.body.toLowerCase() == "😥")) {
     return api.sendMessage("𝑲𝒀𝑨 𝑯𝑼𝑨 𝑪𝑼𝑻𝑰𝑬 🙄", threadID, messageID);
   };


   if ((event.body.toLowerCase() == "😭") || (event.body.toLowerCase() == "😭😭")) {
     return api.sendMessage("Rotdu dost, ro kyu rhe ho 😐", threadID, messageID);
   };


   if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙂🙂")) {
     return api.sendMessage("जा चुकी है वो 😞😞", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "😍") || (event.body.toLowerCase() == "🥰")) {
     return api.sendMessage("𝑳𝑮𝑻𝑨 𝑯 𝑶𝒀𝑶 𝑩𝑶𝑶𝑲.𝑲𝑹 𝑳𝑰𝒀𝑨 𝑨𝑨𝑱 😏", threadID, messageID);
   };

   if ((event.body.indexOf("😤") >= 0) || (event.body.indexOf("😠") >= 0)|| (event.body.toLowerCase() == "😠😠")|| (event.body.toLowerCase() == "😤😤")|| (event.body.indexOf("😡") >=  0)|| (event.body.toLowerCase() == "😡😡")|| (event.body.toLowerCase() == "😡😡😡")) {
     return api.sendMessage("𝑮𝑼𝑺𝑺𝑨 𝑵𝑯𝑰 𝑲𝑹𝑶 𝑫𝑶𝑺𝑻 𝑮𝑼𝑺𝑺𝑨 𝑺𝑬𝑯𝑨𝑻 𝑶𝑹 𝑹𝑰𝑺𝑻𝑬 𝑫𝑶𝑵𝑶 𝑲 𝑳𝑰𝒀𝑬 𝑯𝑨𝑵𝑰𝑲𝑨𝑹𝑨𝑲 𝑯 💕💖✔", threadID, messageID);
   };
  
  if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "😒😒")) {
     return api.sendMessage("𝑨𝑨𝒀𝑬 𝑯𝑨𝒀𝑬𝑬 𝑪𝑯𝑼𝑷𝑲𝑬 𝑪𝑯𝑼𝑷𝑲𝑬 𝑺𝑰𝑫𝑬 𝑾𝑨𝑳𝑬 𝑩𝑵𝑫𝑬 𝑷.𝑳𝑰𝑵𝑬 𝑴𝑨𝑹𝑰 𝑱𝑨𝑨 𝑹𝑯𝑰 𝑯", threadID, messageID);
   };





    

    if ((event.body.toLowerCase() == "koi h kya") || (event.body.toLowerCase() == "koi h kiya") || (event.body.toLowerCase() == "koi hai kiya") || (event.body.toLowerCase() == "Koi hai kya")) {
     return api.sendMessage("मैं हूं ना जानेमन 🙂🤟", threadID,messageID);
   };

    if ((event.body.toLowerCase() == "call aao") || (event.body.toLowerCase() == "call") || (event.body.toLowerCase() == "call aaja") || (event.body.toLowerCase() == "Call aao sab")) {
     return api.sendMessage("मैं कैसे कॉल आऊं मैं तो बोट हूं 😒👈", threadID,messageID);
   };

   if ((event.body.toLowerCase() == "kiya kar rahe ho") || (event.body.toLowerCase() == "kkrh")) {
    return api.sendMessage("लूंगी डांस कर रहा हूं करना है मेरे साथ 🤨👈", threadID,messageID);
   };

    if ((event.body.toLowerCase() == "😴") || (event.body.toLowerCase() == "😴😴") || (event.body.toLowerCase() == "😴😴😴") || (event.body.toLowerCase() == "😴😴😴😴")) {
     return api.sendMessage("कोई इसको लात मार के जगाओ ग्रुप में ही सो गया 🤨👈", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "🥵") || (event.body.toLowerCase() == "🥵🥵") || (event.body.toLowerCase() == "🥵🥵🥵") || (event.body.toLowerCase() == "🥵🥵🥵🥵")) {
     return api.sendMessage("उफ्फ कितनी गर्मी है 🥵🥵👈", threadID,messageID);
   };

   if ((event.body.toLowerCase() == "acha") || (event.body.toLowerCase() == "acha ji") || (event.body.toLowerCase() == "acha g") || (event.body.toLowerCase() == "oo acha ji")) {
     return api.sendMessage("हांजी बाबू 😒👈", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "kamina") || (event.body.toLowerCase() == "kamina bot") || (event.body.toLowerCase() == "tamina") || (event.body.toLowerCase() == "kamine")) {
     return api.sendMessage("तू डबल कमीना 😒👈", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "shat up") || (event.body.toLowerCase() == "shut up") || (event.body.toLowerCase() == "shut") || (event.body.toLowerCase() == "stup")) {
     return api.sendMessage("You Stup Up 😕👈", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "🥰🥰") || (event.body.toLowerCase() == "🥰🥰🥰") || (event.body.toLowerCase() == "🥰🥰🥰🥰")) {
     return api.sendMessage("🥳🥳🥳🥳🥳", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "ludo") || (event.body.toLowerCase() == "ludo link do") || (event.body.toLowerCase() == "ludo lwo") || (event.body.toLowerCase() == "link do")) {
     return api.sendMessage("मुझे लूडो खेलना नही आता 🥺👈", threadID,messageID);
   };

  if ((event.body.toLowerCase() == "kya hua") || (event.body.toLowerCase() == "kiya hua") || (event.body.toLowerCase() == "tya hua") || (event.body.toLowerCase() == "kiya hua")) {
     return api.sendMessage("कुछ नही बाबू 😒👈", threadID,messageID);
   };

   if ((event.body.toLowerCase() == "billi") || (event.body.toLowerCase() == "cat")|| (event.body.toLowerCase() == "bot billi")|| (event.body.toLowerCase() == "tu h billi")|| (event.body.toLowerCase() == "bot cat")|| (event.body.toLowerCase() == "bilota")|| (event.body.toLowerCase() == "cat")|| (event.body.toLowerCase() == "billi bot")) {
     return api.sendMessage("️𝑲𝒀𝑼 𝑩𝑰𝑳𝑳𝑰 𝑩𝑰𝑳𝑳𝑰 𝑲𝑹𝑻𝑰 𝑯 𝑻𝑼 𝑩𝑰𝑳𝑳𝑰 𝑷.𝑲𝒀𝑼 𝑴𝑹𝑻𝑰 𝑯 😁", threadID, messageID);
   };  
  
   if ((event.body.indexOf("#") == 0) || (event.body.toLowerCase() == "#")) {
     return api.sendMessage("️  #  𝑲𝑰 𝑱𝑮𝑯 𝑨𝑩 👉 . 𝑼𝑺𝑬 𝑲𝑹𝑬 𝑻𝑩 𝑪𝑶𝑴𝑴𝑨𝑵𝑫 𝑹𝑼𝑵𝑵𝑰𝑵𝑮 𝑺𝑻𝑨𝑻𝑬 𝑴 𝑨𝑨𝒀𝑬𝑮𝑰 \n 𝒇𝒓𝒐𝒎 𝒂𝒅𝒎𝒊𝒏 : Ayush Shukla", threadID, messageID);
   };

   if ((event.body.indexOf("bot kmina") >= 0) || (event.body.toLowerCase() == "kmine")|| (event.body.toLowerCase() == "kmina bot")|| (event.body.toLowerCase() == "kmine bot")|| (event.body.toLowerCase() == "kmina h tu")|| (event.body.toLowerCase() == "kmini")|| (event.body.toLowerCase() == "kmina ldka")|| (event.body.toLowerCase() == "bot kmine bhg")|| (event.body.toLowerCase() == "bot kmine hurr")) {
     return api.sendMessage("️𝑨𝑮𝑹 𝑯𝑴 𝑲𝑨𝑴𝑰𝑵𝑬 𝑯 𝑭𝑰𝑹 𝑻𝑼𝑴 𝑻𝑶 𝑫𝑶𝑼𝑩𝑳𝑬 𝑲𝑨𝑴𝑰𝑵𝑰 𝑯𝑼𝑰 😁😁", threadID, messageID);
   };

  
   if ((event.body.toLowerCase() == "nikl sale") || (event.body.toLowerCase() == "nikl")|| (event.body.toLowerCase() == "nikal")|| (event.body.toLowerCase() == "nikal sale")|| (event.body.toLowerCase() == "nikal bsdk")|| (event.body.toLowerCase() == "nikl bsdk")|| (event.body.toLowerCase() == "nikal chutiye")|| (event.body.toLowerCase() == "nikl chutiye")|| (event.body.toLowerCase() == "nikl bc")|| (event.body.toLowerCase() == "nikl sale 😂")|| (event.body.toLowerCase() == "nikl lawde")) {
     return api.sendMessage("️𝑵𝑯𝑰 𝑵𝑰𝑲𝑨𝑳 𝑹𝑯𝑨 𝑴𝑬𝑹𝑰 𝑴𝑹𝑱𝑰 😒", threadID, messageID);
   };
  
  
   if ((event.body.indexOf("bot chutiya") >= 0) || (event.body.indexOf("bot gndu") >=0)|| (event.body.indexOf("bot gandu") >=0)|| (event.body.indexOf("bot kuta") >= 0)|| (event.body.indexOf("bot kutta") >=0)|| (event.body.indexOf("bot bklol") >=0)|| (event.body.indexOf("bot bakchod") >= 0)|| (event.body.indexOf("sasta bot") >= 0)|| (event.body.indexOf("bot lodu") >= 0)|| (event.body.indexOf("bot bsdk") >= 0)|| (event.body.indexOf("bsdk bot") >= 0)|| (event.body.indexOf("bot bc") >= 0)) {
     return api.sendMessage("️𝑯𝑨𝑨𝑨𝑨 ,, 𝑶𝑹 𝑻𝑼𝑴 𝑯𝑼𝑺𝑵𝑷𝑨𝑹𝑰 𝑯𝑶 😆😆😆😆 😁", threadID, messageID);
   };

   
   if ((event.body.toLowerCase() == "htttt") || (event.body.toLowerCase() == "httt")|| (event.body.toLowerCase() == "htt")|| (event.body.toLowerCase() == "ht")|| (event.body.toLowerCase() == "httttt")|| (event.body.toLowerCase() == "htttttt")|| (event.body.toLowerCase() == "hhtt")|| (event.body.toLowerCase() == "httttttt")|| (event.body.toLowerCase() == "hhhttt")) {
     return api.sendMessage("️𝑻𝑼𝑴 𝑯𝑨𝑻𝑶 𝑯𝑴 𝑲𝒀𝑼 𝑯𝑨𝑻𝑬 😁😁", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "bhk") || (event.body.toLowerCase() == "bhkk")|| (event.body.toLowerCase() == "bhkkk")|| (event.body.toLowerCase() == "bhkkkk")|| (event.body.toLowerCase() == "bhkkkkk")|| (event.body.toLowerCase() == "bhkkkkkk")|| (event.body.toLowerCase() == "bhkkk bot")|| (event.body.toLowerCase() == "bhkkkk bot")|| (event.body.toLowerCase() == "bhkkkkk bot")) {
     return api.sendMessage("️𝑨𝑹𝑾 𝑯𝑴𝑨𝑹𝑬 𝑱𝑴𝑨𝑵𝑬 𝑴 𝑩𝑯𝑲𝑲 𝑩𝑯𝑲𝑲 𝑻𝑶 𝑲𝑼𝑻𝑻𝑬 𝑲𝑹𝑻𝑬 𝑹𝑬𝑯𝑻𝑬 𝑻𝑯𝑬 𝑮𝑨𝑳𝑰𝒀𝑶 𝑴😁", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "abe jaa na") || (event.body.toLowerCase() == "abe ja na")|| (event.body.toLowerCase() == "abe ja")|| (event.body.toLowerCase() == "abe jaa")|| (event.body.toLowerCase() == "abe nikl")|| (event.body.toLowerCase() == "abe bhag")|| (event.body.toLowerCase() == "bhag ja")|| (event.body.toLowerCase() == "bhgja")|| (event.body.toLowerCase() == "bhggg")) {
     return api.sendMessage("️𝑵𝑯𝑰 𝑩𝑯𝑮 𝑹𝑯𝑨 𝑴𝑬𝑹𝑰 𝑴𝑹𝑱𝑰 😹", threadID, messageID);
   };


   if ((event.body.toLowerCase() == "sorry") || (event.body.toLowerCase() == "sorry.")|| (event.body.toLowerCase() == "sorry..")|| (event.body.toLowerCase() == "sorry...")|| (event.body.toLowerCase() == "sry")|| (event.body.toLowerCase() == "sory")|| (event.body.toLowerCase() == "sry all")|| (event.body.toLowerCase() == "sorry everyone")|| (event.body.toLowerCase() == "sorry all")) {
    return api.sendMessage("️𝑱𝑨𝑶 𝑱𝑨𝑶 𝑴𝑨𝑨𝑭 𝑲𝑰𝒀𝑨 𝑴𝑬𝑵𝑬 𝑻𝑼𝑴𝑲𝑶 𝑼𝑵𝑲𝑰.𝑻𝑨𝑹𝑨𝑭 𝑺𝑬 ✔", threadID, messageID);
   };


  if ( (event.body.toLowerCase() == "Thanks") ||(event.body.toLowerCase() == "ty") || (event.body.toLowerCase() == "t y")|| (event.body.indexOf("thanks") >= 0)|| (event.body.indexOf("thank you") >= 0 )|| (event.body.indexOf("tysm") >= 0 )|| (event.body.indexOf("thankyou") >= 0)|| (event.body.toLowerCase() == "tq")|| (event.body.toLowerCase() == "tq everyone")|| (event.body.toLowerCase() == "tq all")|| (event.body.indexOf("thank u") >=0)) {
     return api.sendMessage("️𝑾𝑬𝑳𝑪𝑶𝑴𝑬 𝑫𝑶𝑺𝑻 🕉 \n  𝑳𝑶𝑹𝑫 𝑲𝑹𝑰𝑺𝑯𝑵𝑨 𝑨𝑷𝑲𝑰 𝑯𝑴𝑬𝑺𝑨 𝑯𝑬𝑳𝑷 𝑲𝑹𝑬  🕉  💖", threadID, messageID);
   };
            
    
   if ((event.body.toLowerCase() == "dm bot") || (event.body.toLowerCase() == "dm bot")) {
     return api.sendMessage("️Swear something to your dad :), you're a kid but you like to be alive :)", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "nobody loves me") || (event.body.toLowerCase() == "nobody loves me")) {
     return api.sendMessage("️Come on, the bot loves you <3 <3", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "😘😘😘") || (event.body.toLowerCase() == "😽")) {
     return api.sendMessage("Pehle Brush Karke AA. Tere Muh Se Badbu AA Rhi H", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "bot i m going") || (event.body.toLowerCase() == "bot im di")) {
     return api.sendMessage("Im cc :))) m stop barking for me, but tell me im :>>", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍🏻")) {
     return api.sendMessage("Areh Adi MaNav Zoo se Bahar Kaise Agya Tu. Firse Zoo M Ja Bahar Kya Kar Rha H", threadID); 
  };

if ((event.body.toLowerCase() == "sim") || (event.body.toLowerCase() == "simsim")) {
     return api.sendMessage("Prefix Kya m lgaunga Pehle Prefix Laga Fir Likh Sim", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "bc") || (event.body.toLowerCase() == "Bc")) {
     return api.sendMessage("Ye Bc Kya HoTa Hai 🤔 ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "lol") || (event.body.toLowerCase() == "lol player")) {
     return api.sendMessage("Khud ko KYa LeGend SmJhTe Ho aap 😂", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "anyone") || (event.body.toLowerCase() == "any")|| (event.body.toLowerCase() == "koi h")|| (event.body.toLowerCase() == "kha gye sab")|| (event.body.toLowerCase() == "kha gye sb")|| (event.body.toLowerCase() == "koi h kya")|| (event.body.toLowerCase() == "is anyone here")|| (event.body.toLowerCase() == "kha gye nikamo")|| (event.body.toLowerCase() == "koi h kya")|| (event.body.toLowerCase() == "sb lge pde h")|| (event.body.toLowerCase() == "sb lge pde h babu sona m")) {
     return api.sendMessage("M Hu Na dear yha ❤️", threadID, messageID);
   };


  if ((event.body.indexOf("Ayush") >= 0)||(event.body.indexOf("ayush")  >= 0)||(event.body.toLowerCase() == "AYUSH")|| (event.body.toLowerCase() == "Ayush ji") || (event.body.toLowerCase() == "AYUSH JI") ||(event.body.toLowerCase() == "ayush ji") || (event.body.toLowerCase() == "jiju") || (event.body.toLowerCase() == "Ayush ji")) {
     return api.sendMessage( "𝑶𝒏𝒍𝒊𝒏𝒆 𝒉𝒐𝒈𝒂 𝒕𝒐 𝒓𝒆𝒑𝒍𝒚 𝒌𝒓𝒅𝒆𝒈𝒂 𝒏𝒉𝒊 𝒌𝒊𝒚𝒂 𝒕𝒐 𝑯𝒐 𝒔𝒌𝒕𝒂 𝒉 𝒌𝒊 𝒐𝒇𝒇𝒍𝒊𝒏𝒆 𝒉𝒐 𝒆𝒔𝒆 𝒎 𝒂𝒂𝒑 𝒖𝒏𝒌𝒊 𝒊𝒅 𝒑 𝒎𝒔𝒈 𝒌𝒓 𝒔𝒌𝒕𝒆 𝒉 \n 𝑰𝑫 𝑳𝑰𝑵𝑲 =>\n  https://www.facebook.com/100042292561861",threadID, messageID);

       
   };

 if ((event.body.indexOf("Ghnta") >= 0 ) ||(event.body.indexOf("ghnta") >= 0 ) || (event.body.toLowerCase() == "ghnta") || (event.body.toLowerCase() == "ghnta bc") || (event.body.toLowerCase() == "gnta") || (event.body.toLowerCase() == "gnta bc")) {
     return api.sendMessage( "Kya hota h ye ghnta vnta hme bhi btao 😁😁😂",threadID, messageID);

       
   };



  
 if ((event.body.indexOf("owner") >= 0 ) || (event.body.toLowerCase() == "create you")) {
     return api.sendMessage("‎[𝐎𝐖𝐍𝐄𝐑:☞𝐀𝐲𝐮𝐬𝐡 𝐒𝐡𝐮𝐤𝐥𝐚☜ \n 𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 Ayush Shukla. \n 𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :- \n https://www.facebook.com/100042292561861?mibextid=ZbWKwL", threadID, messageID);
   };

  
   if ((event.body.toLowerCase() == "is the bot sad") || (event.body.toLowerCase() == "is the bot sad")) {
     return api.sendMessage("Why can't I be sad because of everyone <3 love you <3", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "does the bot love you") || (event.body.toLowerCase() == "does the bot love you")) {
     return api.sendMessage("Yes I love you and everyone so much", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "bot admin") || (event.body.toLowerCase() == "bot ka admin kon ha")|| (event.body.toLowerCase() == "admin kon h bot ka")) {
     return api.sendMessage("He is Ayush Shukla.", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
     return api.sendMessage("I'm full when I see you eat <3", threadID, messageID);
   };

 if ((event.body.indexOf("chup") >= 0 ) || (event.body.indexOf("sant hoja") >= 0 ) || (event.body.indexOf("chup ho ja") >= 0 ) || (event.body.indexOf("chup kar") >= 0 )) {
     return api.sendMessage("𝑵𝑯𝑰 𝑹𝑨𝑯𝑼𝑵𝑮𝑨. 😼 𝑴𝑼𝑱𝑯𝑬 𝑩𝑶𝑳𝑵𝑨 𝑯. 𝑻𝑼𝑴𝑯𝑬 𝑲𝑶𝑰 𝑯𝑨𝑸 𝑵𝑯𝑰. 𝑴𝑼𝑱𝑯𝑬 𝑪𝑯𝑼𝑷 𝑲𝑹𝑵𝑬 𝑲𝑨 𝑴𝑬𝑹𝑨 𝑱𝑼𝑩𝑨𝑵 𝑴 𝑩𝑶𝑳𝑼𝑵𝑮𝑨", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "does the bot have a brand") || (event.body.toLowerCase() == "does the bot fall")) {
     return api.sendMessage("Yes <3", threadID, messageID);
   };
  
   if ((event.body.indexOf("Bye") >= 0) ||(event.body.indexOf("bye") >= 0) || (event.body.toLowerCase() == "by")) {
     return api.sendMessage("𝙃𝙖 𝙟𝙖𝙤 𝙟𝙖𝙤 𝙠𝙤𝙞 𝙣𝙝𝙞 𝙧𝙤𝙠𝙚𝙜𝙖, 𝙟𝙖𝙣𝙚 𝙬𝙖𝙡𝙚 𝙠𝙤 𝙠𝙤𝙣 𝙧𝙤𝙠 𝙨𝙠𝙩𝙖 𝙝 😭😷 ❤️ ", threadID, messageID);
   };
   mess = "{name}"

if (event.body.indexOf("Gu khale") >= 0 || (event.body.indexOf("gu khale") >= 0)||(event.body.indexOf("Gu khalo") >= 0)||(event.body.indexOf("gu khalo") >= 0)||(event.body.indexOf("gu kha le") >= 0)||(event.body.indexOf("tatti") >= 0)||(event.body.indexOf("Tatti") >= 0)||(event.body.indexOf("Gu kha le") >= 0)) {
    var msg = {
      body: `${name}, 𝒕𝒖𝒎 𝒉𝒊 𝒌𝒉𝒂𝒍𝒐 𝒗𝒐 𝒂𝒑𝒏𝒂 𝒈𝒖/𝒕@@𝒕𝒕𝒊 😂😂😂`
    }
    return api.sendMessage(msg, threadID, messageID);
  };


if (event.body.indexOf("🇮🇳") >= 0 || (event.body.indexOf("independence") >= 0)||(event.body.indexOf("Independence") >= 0)||(event.body.indexOf("Jai Hind") >= 0)) {
    var msg = {
      body: `${name}, Jai Hind 🫡🚩🚩🚩💝`
    }
    return api.sendMessage(msg, threadID, messageID);
  };
                                                                                                                                                                 

  


if (event.body.indexOf("Call aao") >= 0 || (event.body.indexOf("call aao") >= 0)||(event.body.indexOf("join call") >= 0)||(event.body.indexOf("Join call") >= 0)||(event.body.indexOf("call aa") >= 0)||(event.body.indexOf("Call aa") >= 0)||(event.body.indexOf("call aaiye") >= 0)||(event.body.indexOf("Call aaiye") >= 0)) {
    var msg = {
      body: `मैं कॉल नही आऊंगा वर्ना मेरी आवाज से प्यार हो जाएगा लडकियों को👀 `
    }
    return api.sendMessage(msg, threadID, messageID);
  };



if (event.body.indexOf("hme nhi milna bot") >= 0 || (event.body.indexOf("nhi milna") >= 0)||(event.body.indexOf("Nhi milna") >= 0)||(event.body.indexOf("Hme nhi milna bot") >= 0)||(event.body.indexOf("hme nhi milna") >= 0)||(event.body.indexOf("Hme nhi milna") >= 0)||(event.body.indexOf("Na milna") >= 0)||(event.body.indexOf("na milna") >= 0)) {
    var msg = {
      body: `𝑴𝑻 𝑴𝑰𝑳𝑶 𝑭𝑰𝑹 😹 𝑴𝑬𝑹𝑨 𝑲𝑨𝑴.𝑻𝑯𝑨 𝑴𝑰𝑳𝑽𝑨𝑵𝑨  👀 `
    }
    return api.sendMessage(msg, threadID, messageID);
  };
  
  if (event.body.indexOf("mc ") >= 0 ||event.body.indexOf("Mc ") >= 0 ||event.body.indexOf("Madharchod") >= 0 ||event.body.indexOf("bc ") >= 0 ||event.body.indexOf("Bc ") >= 0 ||event.body.indexOf("bsdk") >= 0 || (event.body.indexOf("Gandu") >= 0)||(event.body.indexOf("gandu") >= 0)||(event.body.indexOf("Bsdk") >= 0)||(event.body.indexOf("madharchod") >= 0)||(event.body.indexOf("chakke") >= 0)||(event.body.indexOf("Chakka") >= 0)||(event.body.indexOf("bhenchod") >= 0)) {
    var msg = {
      body: `${name} , 𝘼𝙘𝙝𝙝𝙖 𝙗𝙨𝙙𝙠 🤣🤣😂 \n 𝙊𝙧 𝙩𝙪𝙢 𝙝𝙪𝙨𝙣𝙥𝙖𝙧𝙞 𝙝𝙤, 𝙫𝙞𝙨𝙝𝙫𝙨𝙪𝙣𝙙𝙧𝙞 𝙝𝙤`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

  if (event.body.indexOf("bot") >= 0 || (event.body.indexOf("Bot") >= 0)) {
    var msg = {
      body: `🌹🍂 ${name} 🌹🍂,   ${rand}       🌿🚩\n                          ©-𝐀𝐲𝐮𝐬𝐡 𝐒𝐡𝐮𝐤𝐥𝐚`
    }
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙋", event.messageID, (err) => {}, true)
  }

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
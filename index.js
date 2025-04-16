//coder par Kh4ru
const mineflayer = require('mineflayer')
const { LiveChat } = require("youtube-chat");
const {events} = require("./events")
const {config} = require("./config")
let ev1 ="";
let ev2="";
let ev1_cnt =0;
let ev2_cnt=0;
let sondage_actif = false;
console.log("Anarchy Events")
const liveChat = new LiveChat(config.liveId);
console.log("This project is realised by")
console.log(`
 _   ___       ___            
| | / / |     /   |           
| |/ /| |__  / /| |_ __ _   _ 
|    \\| '_ \\/ /_| | '__| | | |
| |\\  \\ | | \\___  | |  | |_| |
\\_| \\_/_| |_|   |_/_|   \\__,_|

`);

const bot = mineflayer.createBot({
  host: config.host, // minecraft server ip
  username: config.username, // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  auth: config.auth.offline, // for offline mode servers, you can set this to 'offline'
  port: config.port,              // set if you need a port that isn't 25565
  // version: false,           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
})
function sondage(){
  sondage_actif = true;
  ev1_cnt = 0;
  ev2_cnt = 0;
  let r_index1 = Math.floor(Math.random() * events.length);
  let r_index2 = Math.floor(Math.random() * events.length);
  if(r_index2 == r_index1){
     r_index2 = Math.floor(Math.random() * events.length);
  }
  ev1 = events[r_index1];
  ev2 = events[r_index2];
  bot.chat('/title @a title {"text":"Votez !","color":"green"}')
  bot.chat(`Il est temps de voter entre ${ev1.name} et ${ev2.name}`);
  setTimeout(function(){
    sondage_actif = false
    if(ev1_cnt > ev2_cnt){
      bot.chat(`/title @a actionbar {"text":"${ev1.name}","color":"red"}`)
      bot.chat(ev1.command)
    }
    if(ev1_cnt < ev2_cnt){
      bot.chat(`/title @a actionbar {"text":"${ev2.name}","color":"red"}`)
      bot.chat(ev2.command)
    }
    setTimeout(sondage,config.delay)
  },config.delay)
}
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

bot.on("spawn",() =>{
  liveChat.start();
  setTimeout(() =>{
    sondage();
  },10000)
})
liveChat.on("start", (liveId) => {
  console.log("🟢 Live chat démarré pour :", liveId);
});

liveChat.on("chat", (chatItem) => {
  let message = chatItem.message.map(item =>{
      if("text" in item) return item.text
    })
  if(message.includes("!1") & sondage_actif){
    ev1_cnt = ev1_cnt + 1
  }
  if(message.includes("!2") & sondage_actif){
    ev2_cnt = ev2_cnt + 1
  }
});

liveChat.on("end", () => {
  console.log("🔴 Live terminé ou chat arrêté.");
});

liveChat.on("error", (err) => {
  console.error("⚠️ Erreur :", err);
});

bot.on('kicked', console.log)
bot.on('error', console.log)
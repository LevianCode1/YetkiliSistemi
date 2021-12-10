
const kingman = require("./alive/keep_work.js")
const { MessageEmbed  ,  Collection , Client } = require("discord.js");
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.commands = new Collection();
client.eventss = new Collection();
client.aliases = new Collection();
const fs = require('fs');
kingman();
const colors = require("colors");

const config = require('./me-config.json');
const TOKEN_BOT = config.token
const PREFIX = config.prefix
client.on("error", console.error);
["komut", "events"].forEach(p => {
  require(`./işleyici/${p}`)(client);
});
client.on('message', levmsg => {
  const pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (levmsg.content.match(pmention)) {
    return levmsg.reply(`**BENİM ÖNEKİM: ${PREFIX}**`)
  }
  if (levmsg.author.bot) return;
  if (!levmsg.guild) {
    return levmsg.reply("**SADECE SUNUCULARDA ÇALIŞMAKTADIR DM`de ÇALIŞMAZ!!**")
  }
  if (!levmsg.content.startsWith(PREFIX)) return;
  const args = levmsg.content
    .slice(PREFIX.length)
    .trim() 
    .split(/ +/g); 
  const kmcommand = args.shift().toLowerCase();
  if (kmcommand.length === 0) return;
  let kmcode = client.commands.get(kmcommand);
  if (!kmcode) kmcode = client.commands.get(client.aliases.get(kmcommand));
  if (kmcode) kmcode.run(client, levmsg, args, PREFIX);
});


client.login(TOKEN_BOT)

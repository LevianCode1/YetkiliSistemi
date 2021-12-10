
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "yardım",
   category: "geliştirici",
   aliases: ['help'],
   description: "Bu Menüyü Göterir",
   run: async (client, levmsg, args, PREFIX) => {
    let commands = levmsg.client.commands.array();
    let EMBED = new MessageEmbed()
    .setTitle(`Levian Yetkili Sistemi`)
    .setDescription(`**[Discord](https://discord.gg/WkYxnD3Zyg)**`)
    .setColor("GOLD");
    commands.forEach((cmd) => {
        EMBED.addField(
          `**${PREFIX}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
          `\`${cmd.description}\``,
          false
        );
      });
    levmsg.channel.send(EMBED)
     
} 
}

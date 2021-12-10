
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch(); 
    let gdata = await si.findOne({GuildID:reaction.message.guild.id})
    if(!gdata) return;
    if(reaction.emoji.name === '✅'){
      if(!reaction.message.guild.member(user).hasPermission('MANAGE_ROLES')) return
    if(user.bot) return;

    let data = await sa.findOne({MsgID:reaction.message.id})
    if(!data) return;
    let role = gdata.Role 
    let user2 = reaction.message.guild.members.cache.get(data.UserID)

    try {
    await reaction.message.guild.member(user2.id).roles.add(role)
    } catch(e) {
      return
    }
    let es = new MessageEmbed()
    .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 1024 }))
    .setColor('BLUE')
    .setDescription(`**${user2}, Yetkili başvurunuz kabul edildi**`)
    .setFooter(`Sunucu İsmi:`,reaction.message.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
    let es2 = new MessageEmbed()
    .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 1024 }))
    .setColor('BLUE')
    .setDescription(`** ${user2}, <@${user.id}> tarafından kabul edildi **`)
    .setFooter(reaction.message.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
    try {
      user2.send(es)
      await sa.findOneAndRemove({MsgID:reaction.message.id})
    } catch(e) {
      console.log(` `)
    }
    try {
      reaction.message.channel.send(es2)
    } catch(e) {
      console.log(` `)
    }
      
    }
    
  }
}

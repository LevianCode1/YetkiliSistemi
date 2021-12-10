
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
    if(reaction.emoji.name === '❌'){
      let gdata = await si.findOne({GuildID:reaction.message.guild.id})
    if(!gdata) return;
    if(!reaction.message.guild.member(user).hasPermission('MANAGE_ROLES')) return
    if(user.bot) return;
    let data = await sa.findOne({MsgID:reaction.message.id})
    if(!data) return;
    let es2 = new MessageEmbed()
    .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 1024 }))
    .setColor('BLUE')
    .setDescription(`**<@${data.UserID}>, <@${user.id}> tarafından reddedildi**`)
    .setFooter(reaction.message.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
    try {
      reaction.message.channel.send(es2).then(async e =>{
        let x = await sa.findOneAndRemove({MsgID:reaction.message.id})
      })
    } catch(e) {
      console.log(` `)
    }
    }
  }
}

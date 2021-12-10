
const { MessageEmbed } = require("discord.js");
class ME {
  constructor(message){
    this.message = message
  }
  async GetUser(id){
    let user =  this.message.mentions.members.first() || this.message.guild.members.cache.get(id)
    if(!id){
      user = this.message.mentions.members.first()
    }
    return user
  }
  async GetChannel(id){
    let channel = this.message.mentions.channels.first() || this.message.guild.channels.cache.get(id)
    if(!id){
      channel = this.message.mentions.channels.first()
    }
    return channel
  }
  async SEND(x, y){
    let send = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setTitle(`**\✅ ${x}**`)
    .setDescription(`**${y}**`)
    .setFooter(`${this.message.author.tag} Tarafından Kullanıldı`, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    this.message.channel.send(send)
    }
  async ERR(x){
    let err = new MessageEmbed()
    .setColor('RED')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setTitle(`**\⚠ Hata**`)
    .setDescription(`**\⛔ ${x}**`)
    .setFooter(`Bu Mesaj 10 Saniye Sonra Silinicektir`, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    this.message.channel.send(err).then(m => m.delete({timeout: 10000}));
  }
  async GetRoles(id){
    let role;
    if(!id){
      role = this.message.mentions.roles.first() 
    }
    role = this.message.mentions.roles.first() || this.message.guild.roles.cache.get(id)
    return role;
  }
  async GetRoles2(id){
    let role =  this.message.guild.roles.cache.get(id)
    return role;
  }
}
module.exports = {
	ME
}

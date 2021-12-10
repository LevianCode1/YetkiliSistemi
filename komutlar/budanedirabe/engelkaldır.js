
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
const levian = require('../../işleyici/levian/mesaj')
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "engel-kaldır",
   category: "application",
   description: "Bu komut, kişiye tekrar başvurma izni vermek için kullanılır.",
   run: async (client, levmsg, args, PREFIX) => {
     const me = new levian.ME(levmsg)
     if(!levmsg.member.hasPermission('ADMINISTRATOR')){
       return me.ERR(`You need \`ADMINISTRATOR \`permissions to do this action`)
     }
     let data = await si.findOne({GuildID:levmsg.guild.id})
     if(!data){
       return me.ERR(`No Data Found`)
     }
     let user = await me.GetUser(args[0])
     if(!user){
       return me.ERR(`I Cant Find This User`)
     }
     let userdata = await sa.findOneAndUpdate({GuildID:levmsg.guild.id,UserID:user.id}, {
       $set : {
         Blocked : false
       }
     })
     if(!userdata){
       userdata = await sa.create({GuildID:levmsg.guild.id,UserID:user.id,Blocked:false})
     }
     userdata.save()

    await me.SEND(`Unbloacked User`,`this user has been  unblocked <@${user.id}>`)

    }
 }

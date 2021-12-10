
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
const levian = require('../../işleyici/levian/mesaj')
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "engelle",
   category: "application",
   description: "Bu komut, birinin tekrar başvurmasını engellemek için kullanılır.",
   run: async (client, levmsg, args, PREFIX) => {
     const me = new levian.ME(levmsg)
     if(!levmsg.member.hasPermission('ADMINISTRATOR')){
       return me.ERR(`Bu eylemi gerçekleştirmek için \`ROLLERİ_YÖNET\` izinlerine ihtiyacınız var`)
     }
     let data = await si.findOne({GuildID:levmsg.guild.id})
     if(!data){
       return me.ERR(`Veri bulunamadı`)
     }
     let user = await me.GetUser(args[0])
     if(!user){
       return me.ERR(`Bu Kullanıcıyı Bulamıyorum`)
     }
     let userdata = await sa.findOneAndUpdate({GuildID:levmsg.guild.id,UserID:user.id}, {
       $set : {
         Blocked : true
       }
     })
     if(!userdata){
       userdata = await sa.create({GuildID:levmsg.guild.id,UserID:user.id,Blocked:true})
     }
     userdata.save()

    await me.SEND(`Engellenen Kullanıcı`,`bu kullanıcı engellendi <@${user.id}>`)

    }
 }

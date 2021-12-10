
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
const levian = require('../../işleyici/levian/mesaj')
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "reddet",
   category: "application",
   description: "Bu, manuel olarak başvuran kişiyi reddedecektir.",
   run: async (client, levmsg, args, PREFIX) => {
     const me = new levian.ME(levmsg)
     if(!levmsg.member.hasPermission('ADMINISTRATOR')){
       return me.ERR(`You need \`ADMINISTRATOR\`permissions to do this action`)
     }
     let data = await si.findOne({GuildID:levmsg.guild.id})
     if(!data){
       return me.ERR(`No Data Found`)
     }
     let user = await me.GetUser(args[0])
     if(!user){
       return me.ERR(`I Cant Find This User`)
     }
     let userdata = await sa.findOneAndDelete({GuildID:levmsg.guild.id,UserID:user.id})
     if(!userdata){
       return me.ERR(`Sorre This is invilde User`)
     }
    await me.SEND(`Deleted`,`This user deleted from our data bace <@${user.id}>`)

    }
 }

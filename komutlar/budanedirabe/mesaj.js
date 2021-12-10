const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
const levian = require('../../işleyici/levian/mesaj')
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "mesaj",
   category: "application",
   description: "Bu komut Başvuru işleminin nasıl çalıştığını göterir.",
   run: async (client, levmsg, args, PREFIX) => {
      const me = new levian.ME(levmsg)
         let adata = await si.findOne({GuildID:levmsg.guild.id})
    if(!adata.Quzz[0]){
      return await me.ERR(`Lütfen Soru Ekleyin .ayarla SoruEkle`)
    }
   let questions = adata.Quzz

   levmsg.channel.send(new MessageEmbed()
.addField(`Kullanım`,`\`${PREFIX}başvuru\` **Yazdıktan Sonra Gelen Soruları 1 Dakika İçerisinde Cevaplayın!**`)
.addField(`Karşılacağınız Sorular`,`**・ ${adata.Quzz.join(`\n・ `)}**`)
.setThumbnail(levmsg.author.displayAvatarURL({dynamic: true}))
.setImage(`https://cdn.discordapp.com/attachments/917902424419754024/918624741760315442/Baslksz-1_kopya.png`)
.setTimestamp()
.setFooter(`Levian Code .gg/ht3djkDecQ`)
.setColor(levmsg.guild.me.displayColor)
)

}
 }
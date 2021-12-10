
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const sa = require('../../abebunedir/app-sistem/uygulama')
const levian = require('../../işleyici/levian/mesaj')
const config = require(`../../me-config.json`)
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "başvuru",
   category: "application",
   aliases: [''],
   description: "Bu komut Başvuru işlemini çalıştırmak için kullanılır.",
   run: async (client, levmsg, args, PREFIX) => {
     levmsg.delete()
     let basvurukanal = config.basvurukanal
      if(levmsg.channel.id !== basvurukanal) return levmsg.channel.send(
	  	new MessageEmbed()
	  	.setAuthor(levmsg.author.username, levmsg.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`Bu Komutu Yalnızca <#${basvurukanal}> Kanalında Kullanabilirsiniz!**`)
	  	.setThumbnail(levmsg.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(levmsg.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));

     const me = new levian.ME(levmsg)
    let udata = await sa.findOne({
      GuildID:levmsg.guild.id,
      UserID:levmsg.author.id
    })
    if(!udata){
      udata = await sa.create({
        GuildID:levmsg.guild.id,
        UserID:levmsg.author.id
      })
      udata.save();
    }
    if(udata.Content[0]){
      return await me.ERR(`Zaten yetkili başvurdunuz`)
    }
    if(udata.Blocked === true) {
      return await me.ERR(`Başvurmanız yasaklandı`)
    }
    let adata = await si.findOne({GuildID:levmsg.guild.id})
    if(!adata){
      adata = await si.create({GuildID:levmsg.guild.id})
      adata.save()
    }
    if(!adata.ChannelID){
      return await me.ERR(`Lütfen Kanal Ayarlayın .ayarla KanalAyarla`)
    }
    if(!adata.Quzz[0]){
      return await me.ERR(`Lütfen Soru Ekleyin .ayarla SoruEkle`)
    }
    
    let applych = client.guilds.cache.get(levmsg.guild.id).channels.cache.get(adata.ChannelID);
    let questions = adata.Quzz
    let answer = []
    for(let i = 0; i < questions.length; i++){
      let filter = (m) => m.author.id === levmsg.author.id;
      let qusstion = await levmsg.channel.send(new MessageEmbed()
.setAuthor(levmsg.author.username, levmsg.author.displayAvatarURL({dynamic: true}))
.setDescription(`**\`[${i+1}/${questions.length}]\`** **Soru:** **${questions[i]}**`)
.setThumbnail(levmsg.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setFooter(`1 Dakika İçerisinde Lütfen Cevaplayın`)
.setColor(levmsg.guild.me.displayColor))



      let an = await levmsg.channel.awaitMessages(filter,{
        max: 1,
        time: 60000,
        errors: ["time"]
      }).catch(() => {
        return
        });
      try{
        qusstion.delete();
        an.first().delete();
        answer.push(`**[${i + 1}] ${questions[i]} : \`${an.first().content}\`**`)
      } catch(e) {
        return await me.ERR(`Başvuru İptal Edildi \n\`Sebep: Zaman Aşımı\``)
      }
  if(an.first().content === "iptal"){
    return await me.ERR(`Başvuru İptal Edildi`)
  }
    }
    let qmsg = await me.SEND(`Cevaplar alındı`, `Başvurunuzu onaylamak istiyor musunuz?\n**・ ${answer.join(`\n・ `)}**`)
    levmsg.channel.send(`**Onaylamak için [✅] ve İptal etmek için [❌] tepki verin**`).then(m => {
      m.react(`✅`)
      m.react(`❌`)
      let re = (react, user) => react.emoji.name  === "✅" && user.id === levmsg.author.id;
      let re2 = (react, user) => react.emoji.name  === "❌" && user.id === levmsg.author.id;
      let rec = m.createReactionCollector(re, {time: 0});
      let re2c = m.createReactionCollector(re2, {time: 0});
      rec.on('collect', async c =>{
        let apply = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(levmsg.author.tag, levmsg.author.avatarURL({ dynamic: true, size: 1024 }))
        .setTitle(`**\✅ Yeni Başvuru Var**`)
        .setDescription(answer)
        .addField(`**Kullanıcı İD**`, `\`${levmsg.author.id}\``)
        .addField(`**Onaylamak İçin**`, `\`Rolleri Yönet Yetkisine Sahip Olmalısın!\``)
        .setFooter(`Levian Yetkili Sistemi`, levmsg.author.avatarURL({ dynamic: true, size: 1024 }))
        let msgid = await applych.send(apply)
        msgid.react(`✅`)
        msgid.react(`❌`)
        let savedata = await sa.findOneAndUpdate({
              GuildID:levmsg.guild.id,
              UserID:levmsg.author.id
            }, {
          $push:{
            Content :answer
          }
        })
        let savedata2 = await sa.findOneAndUpdate({
              GuildID:levmsg.guild.id,
              UserID:levmsg.author.id
            }, {
          $set:{
            MsgID : msgid.id
          }
        })
        savedata.save()
        savedata2.save()
        m.edit(`**Başvuru gönderildi**`).then(d => {
          d.delete({ timeout: 5000 })
        });
      })
      re2c.on('collect', async c2=>{
        m.edit(`**Başvuru İptal Edildi**`).then(m2=>{
          m2.delete({ timeout: 5000 })
        })
      })
    })
    }
 }

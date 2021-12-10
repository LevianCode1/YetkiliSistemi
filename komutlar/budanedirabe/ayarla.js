
const si = require("../../abebunedir/app-sistem/sunucukurulumu")
const { MessageEmbed } = require("discord.js");
const levian = require('../../işleyici/levian/mesaj')
 module.exports = {
   name: "ayarla",
   category: "application",
   aliases: ['config'],
   description: "Bu komut bot ayarlarını kontrol etmek için kullanılır",
   run: async (client, levmsg, args, PREFIX) => {
     const me = new levian.ME(levmsg)
     if(!levmsg.member.hasPermission('ADMINISTRATOR')){
       return me.ERR(`You need \`ADMINISTRATOR\`permissions to do this action`)
     }
     let ops = [
       "KanalAyarla",
       "SoruEkle",
       "SorularıKaldır",
       "SorularıGöster",
       "GenelGöster",
       "RolAyarla"
     ]
      if(!args[0]){
        return me.SEND(`Seçenekler Menüsü`, `${PREFIX}${module.exports.name} ${ops.join(`\n ${PREFIX}${module.exports.name} `)}`)
      }
      function check(msg, arr) {
			return arr.some(op => op.toLowerCase() === msg.toLowerCase());
		}
      if (check(args[0],ops) === false) {
        return levmsg.channel.send(ops)
      } 
      switch(args[0].toLowerCase()) {
        case ops[0].toLocaleLowerCase():
        let ch = await me.GetChannel(args[1])
        if(!ch) {
          return await me.ERR(`Kanalı seçmelisiniz\n Kullanım:\`${PREFIX}${module.exports.name} ${ops[0].toLocaleLowerCase()} <KANAL>\``)
        }
        let channeldata = await si.findOneAndUpdate({
          GuildID:levmsg.guild.id
        },{
          $set:{
            ChannelID:ch.id
          }
        })
        if(!channeldata){
          channeldata = await si.create({
            GuildID:levmsg.guild.id,
            ChannelID: ch.id
          })
        }
        channeldata.save().then(s=> {
          levmsg.react('✅')
        }).catch(()=>{
          levmsg.react('❌')
        })
        await me.SEND(`Kanal Başarıyla Seçildi`, `Kanali'i Şimdi [<#${ch.id}>] içinde uygulayın`)
        break;
        case ops[1].toLocaleLowerCase(): 
        let qustion = levmsg.content.split(' ').slice(2).join(" ")
        let addq = await si.findOneAndUpdate({
          GuildID:levmsg.guild.id
        }, {
          $push :{
            Quzz : qustion
          }
        }
        )
        if(!addq){
          addq = await si.create({
            GuildID:levmsg.guild.id,
            Quzz : qustion
          })
        }
        addq.save().then(s=> {
          levmsg.react('✅')
        }).catch(()=>{
          levmsg.react('❌')
        })
        await me.SEND(`Soru eklendi`,`\`${qustion}\``)
        break;
        case ops[2].toLocaleLowerCase(): 
        let qustion2 = levmsg.content.split(' ').slice(2).join(" ")
        let srddq = await si.findOne({
          GuildID:levmsg.guild.id
        })
        if(!srddq){
          srddq = await si.create({
            GuildID:levmsg.guild.id
          })
        }
        srddq.save();
        if(!srddq.Quzz.includes(qustion2)){
          return await me.ERR(`Soru bulunamadı`)
        }      
        let rddq = await si.findOneAndUpdate({
          GuildID:levmsg.guild.id
        }, {
          $pull :{
            Quzz : qustion2
          }
        })
        rddq.save().then(s=> {
          levmsg.react('✅')
        }).catch(()=>{
          levmsg.react('❌')
        })
        await me.SEND(`Soru kaldırıldı`, `\`${qustion2}\``)        
        break;
        case ops[3].toLocaleLowerCase(): 
        let adata = await si.findOne({GuildID:levmsg.guild.id})
        if(!adata.Quzz[0]) {
          return me.ERR(`Şuradan veri bulunamadı`)
        }
        if(!adata){
          return await me.ERR(`Veri bulunamadı`)
        }
        levmsg.channel.send(`**・ ${adata.Quzz.join(`\n・ `)}**`)
        break;
        case ops[4].toLocaleLowerCase():
        let alldata = await si.findOne({GuildID:levmsg.guild.id})
        if(!alldata){
          alldata = await si.create({GuildID:levmsg.guild.id})
          alldata.save()
        }
        let ach = alldata.ChannelID;
        let Role = alldata.Role
        let aquz = alldata.Quzz.length;
        await me.SEND(`Kurulum bilgileri`, `Kanal : <#${ach}>\nSoru sayısı : ${aquz}\n Rol: <@&${Role}>`)
        break;
        case ops[5].toLocaleLowerCase():
        let role = await me.GetRoles(args[1]);
        if(!role){
          return me.ERR(`Rol seçmelisiniz\n Kullanım:\`${PREFIX}${module.exports.name} ${ops[5].toLocaleLowerCase()} <Rol>\``)
        }
        let rodata = await si.findOneAndUpdate({GuildID:levmsg.guild.id}, {
          $set :{
            Role : role.id
          }
        })
        if(!rodata){
          rodata = await si.create({
            GuildID:levmsg.guild.id,
            Role : role.id
          })
        }
        rodata.save().then(s=> {
          levmsg.react('✅')
        }).catch(()=>{
          levmsg.react('❌')
        })
        await me.SEND(`Rol Başarıyla Seçildi`,`Rol:\n[<@&${role.id}>]`)
        break;
        
      }
    }
 }


const { Schema, model } = require('mongoose');
const GuildApplicatio = Schema({
    GuildID: {
        type: String,
        required: true
    },
    ChannelID:{
      type : String
    },
    Quzz :{
      type : [String]
    },
    Role :{
      type : String
    },
});
module.exports = model('Uygulama Kurulumu', GuildApplicatio);

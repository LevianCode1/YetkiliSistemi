
const colors = require("colors");
const mongoose = require('mongoose');
const discord = require("discord.js");
const config = require(`../../me-config.json`)
const MONGO_DDB = config.mongodb
module.exports = {
	name: 'ready',
async execute(client) {
    mongoose.connect(MONGO_DDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(console.log(`
_______________________________
[✅]==> Mongo-DB Bağlantısı Olumlu
_______________________________
    `.brightGreen));
}
}

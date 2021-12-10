
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const fs = require("fs")
const colors = require("colors");
let table = new ascii("Komutlar");
table.setHeading("Komut", "Durumu");

module.exports = (client) => {
    readdirSync("./komutlar/").forEach(dir => {
        const komutlar = readdirSync(`./komutlar/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of komutlar) {
            let pull = require(`../komutlar/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString().brightCyan);    
}

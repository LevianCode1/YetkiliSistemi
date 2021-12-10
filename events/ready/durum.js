
const colors = require("colors");
const figlet = require('figlet');
module.exports = {
	name: 'ready',
async	execute(client) {
    figlet(`LEVIAN      CODE`, function(err, data) {
        if (err) {
            console.dir(err);
            return;
        }
        console.log(data.brightRed)
    });
    client.user.setPresence({
      status: 'online',
      activity:{
        name:'Levian',
        type:'STREAMING',
        url: 'https://www.twitch.tv/'
      }
    })
	}
}

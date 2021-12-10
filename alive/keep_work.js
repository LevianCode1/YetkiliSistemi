
const express = require('express');
const colors = require("colors");
const server = express();
server.all('/', (req, res)=>{
    res.send('Levian Code https://discord.gg/ht3djkDecQ ')
})
function keepAlive(){
  server.listen(3000, ()=>{
      console.log(`
_______________________________
[✅] ===> SUNUCU HAZIR
_______________________________    
      `.yellow)
  });
}
module.exports = keepAlive;

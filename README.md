# Installation

**Windows**

- `npm i dba-api.js`

**Linux**

- `sudo npm i dba-api.js`

# Usage

```js

const { Client } = require("discord.js")
const bot = new Client();
const DBA = require("dba-api.js")
const dba = new DBA("Your Id Bot","Your token Bot")
let prefix = "!";


bot.on('ready', async () => {
console.log("Bot has started !")!
})

bot.on("message", async (message) => {
const msg = message.content.toLowerCase()
const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()

if (command === "dba"){
const id = args[0]
if (!id) return message.reply("Provided some id bot")

dba.getBot(id).then(data => {
message.channel.send(`
Name: ${data.bot.tag}
Owner : ${data.ownerTag}
Prefix : ${data.prefix}
Approved : ${data.approve}
`)
})
}

})

bot.login("Your bot token Discord")

```

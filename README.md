# DiscordExtremeList's API Wrapper

## Getting Started

#### Importing and "initializing" the package
```js
const DEL = require('del.js') // importing del
const del = new DEL("auth token", "client id") // initializing it
```

###### Arguments
Parameter | Type | Optional | Description
|--------------|----------|--------------|--------------|
key | String | false | The API Token found on your bot's page.
id | Snowflake | false | Your bot's client ID.

--- 

### example

```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "del.";
const DEL = require("del.js")
const del = new DEL("auth token", client.user.id,)

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}.`)
setInterval(() => {
   del.post(client.guilds.cache.size, 0) // You will probably need to change this.
  }, 600000) // 10 minutes in Milliseconds
});

client.login("token")
```

# DEL.js API Wrapper
This is a JavaScript API wrapper for Discord Extreme List's API.

## Getting Started

#### Importing and "initialising" the package
```js
const DEL = require("del.js"); // Importing DEL.js
const del = new DEL("API auth token", "Discord client ID"); // Initialising it
```

###### Arguments
Parameter | Type | Optional | Description
|--------------|----------|--------------|--------------|
key | String | false | The API Token found on your bot's page.
id | Snowflake | false | Your bot's client ID.

--- 

### Discord.JS Example

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "del.";
const DEL = require("del.js");
const del = new DEL("API auth token", client.user.id);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`);
    setInterval(() => {
        del.post(client.guilds.cache.size, 0) // You will probably need to change this.
    }, 600000); // 10 minutes in milliseconds
});

client.login("bot token");
```

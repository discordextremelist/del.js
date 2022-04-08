const fetch = require("node-fetch");
const { version } = require("./packages.json");

class del {
    constructor(key, id) {
        this.key = key // DEL API token
        this.id = id // Discord client ID
    }

    async post(guildCount, shardCount) {
        let body = shardCount ? { "guildCount": guildCount, "shardCount": shardCount } : { "guildCount": guildCount, "shardCount": 0 }

        await fetch(`https://api.discordextremelist.xyz/v2/bot/${this.id}/stats`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "User-Agent": `DEL.js/${version}`, "Content-Type": "application/json", "Authorization": this.key },
        }).then(async (res) => { console.log(await res.json()) })
    }
}

module.exports = del;

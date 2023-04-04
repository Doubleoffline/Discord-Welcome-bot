/* These lines of code are importing the necessary modules and configuration file for the Discord bot. */
const Discord = require("discord.js");
const config = require("./config.json");

// Create a new instance of the Discord client
const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.Guilds]
});


/* This code sets up an event listener for the "ready" event, which is emitted by the Discord client
when it has successfully connected to the Discord API and is ready to start receiving and sending
messages. When the "ready" event is emitted, the code inside is executed, which
logs a message to the console indicating that the bot has successfully logged in and displays the
bot's username and tag. */

client.once("ready", () => {
    console.log(`Logged in as ${
        client.user.tag
    }!`);
});

/* This code sets up an event listener for the "guildMemberAdd" event, which is emitted by the Discord
client when a new member joins a server that the bot is a part of. When the "guildMemberAdd" event
is emitted, the code inside is executed, which sends a welcome message to the server's designated
welcome channel with an embed that includes the new member's username and avatar. */

client.on("guildMemberAdd", member => { 
    
    // Get the welcome channel by its ID
    let welcomeChannel = member.guild.channels.cache.get(config.channelId)

    // Return if the channel wasn't found on this server
    if (! welcomeChannel) 
        return;
    


    // Create a new embed with the desired properties
    const embed = new Discord.EmbedBuilder().setColor("#0099ff").setTitle("Welcome to the server!").setDescription(`Welcome, ${
        member.user.username
    }! We"re glad to have you on board!`).setThumbnail(member.user.displayAvatarURL())

    // Send the embed to the desired channel
    welcomeChannel.send({embeds: [embed]});

});


// Log the bot in using the token from the config file
client.login(config.token);

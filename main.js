// Import the required libraries
const Discord = require('discord.js');
const config = require('./config.json');

// Create a new instance of the Discord client with intents
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS] });

// When the bot is ready, log a message to the console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// When a new member joins the server, send a welcome message with a gif/image
client.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.get(config.channelId);
  if (!welcomeChannel) return;

  // Create the embed
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Welcome to the server!')
    .setDescription(`Welcome, ${member.user.username}! We're glad to have you on board!`)
    .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    
  // Send the message with the embed
  welcomeChannel.send(embed);
});

// Log in to the Discord server using your bot token
client.login(config.token);

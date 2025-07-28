js
ΑντιγραφήΕπεξεργασία
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once('ready', () => {
  console.log(`✅ Συνδέθηκε ως ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const logChannel = client.channels.cache.get(process.env.CHANNEL_ID);
  if (!logChannel) return;

  const userTag = (oldState.member || newState.member).user.tag;

  if (!oldState.channelId && newState.channelId) {
    logChannel.send(`🔊 Ο ${userTag} μπήκε στο φωνητικό κανάλι **${newState.channel.name}**.`);
  } else if (oldState.channelId && !newState.channelId) {
    logChannel.send(`📤 Ο ${userTag} βγήκε από το φωνητικό κανάλι **${oldState.channel.name}**.`);
  } else if (oldState.channelId !== newState.channelId) {
    logChannel.send(`➡️ Ο ${userTag} μετακινήθηκε από το **${oldState.channel.name}** στο **${newState.channel.name}**.`);
  }
});

client.login(process.env.TOKEN);

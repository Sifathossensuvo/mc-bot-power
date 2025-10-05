const mineflayer = require('mineflayer');
const autoAuth = require('mineflayer-auto-auth');
const schedule = require('node-schedule');

const SERVER_IP = 'YOUR_SERVER_IP';
const USERNAME = 'YOUR_USERNAME';
const PASSWORD = 'YOUR_PASSWORD';

function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: 25565,
    username: USERNAME,
    password: PASSWORD
  });

  // Auto login for login/plugin protected server
  autoAuth(bot, { type: 'mojang', password: PASSWORD });

  bot.on('login', () => console.log('Bot logged in!'));
  bot.on('end', () => setTimeout(createBot, 10000)); // reconnect after 10 sec
  bot.on('error', console.log);
}

// Run bot immediately
createBot();

// Schedule bot to join every 2 min
schedule.scheduleJob('*/2 * * * *', () => createBot());

const tmi = require('tmi.js');
const bot = require('./bot/bot')
const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
      username: "PUBG_stat",
      password: "oauth:3vrlfyu2nu61tl9qzl1ovtrsymm7hm"
  },
  channels: ['#pubg_stat']
};
const client = new tmi.client(options);

// Connect the client to the server..
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    var splitMsg = message.split(' ')
    var firstWord = splitMsg[0]
    var restOfWords = splitMsg.slice(1)

    // Do your stuff.
    if(firstWord === '!pubgstats') {
      if(!restOfWords[0] || restOfWords.length > 4) {
        client.say(channel, 'Invalid command: try `!pubgstats help`')
      }

      if(restOfWords.length === 1) {
        if(restOfWords[0] === 'help') {
          client.say(channel, 'You can specify what stats you want with the following syntax. [REGION] [QUEUE] [MODE] [ID]. Region, Queue, and Mode is optional.')
          return
        }

        bot.search({ id: restOfWords[0] })
          .then((result) => {
            client.say(channel, result)
          })
          .catch((err) => {
            client.say(channel, 'something went wrong MrDestructoid')
          })
      }
    }
});

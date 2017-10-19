require('dotenv').config()
const tmi = require('tmi.js');
const bot = require('./bot/bot')

//TMI.JS -- 
const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
      username: process.env.TWITCH_USERNAME,
      password: process.env.TWITCH_PASSWORD
  },
  channels: ['#pubg_stat']
};
const client = new tmi.client(options);
// Connect the client to the server..
client.connect();

/*
EXAMPLE COMMANDS:

!pubgstats [ID]
!pubgstats [QUEUE] [ID]
!pubgstats [MODE] [ID]
!pubgstats [REGION] [QUEUE] [ID]
!pubgstats [REGION] [MODE] [ID]
!pubgstats [QUEUE] [MODE]  [ID]
!pubgstats [REGION] [QUEUE] [MODE] [ID]


*/


// OBJECT WITH VALID COMMANDS, GROUPED BY TYPE
const commands = {
  queue: ['SOLO', 'DUO', 'SQUAD'],
  mode: ['FPP', 'TPP'],
  region: ['AS', 'NA', 'EU', 'OCE', 'SA', 'SEA'],
}

// EX: whatCommand('solo') => { type: 'queue', command: 'solo' }
// EX: whatCommand('sols') => Error
const whatCommand = function(word) {
  console.log('the word for command: ', word)
  for (var key in commands) {
    if(commands[key].includes(word.toUpperCase())) {
      return { type: key, command: word }
    }
  }

  return new Error('Invalid command')
}

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    /*

    !pubgstats [ID]
    !pubgstats [QUEUE] [ID]
    !pubgstats [MODE] [ID]
    !pubgstats [REGION] [QUEUE] [ID]
    !pubgstats [REGION] [MODE] [ID]
    !pubgstats [QUEUE] [MODE]  [ID]
    !pubgstats [REGION] [QUEUE] [MODE] [ID]


    */

    var splitMsg = message.split(' ')
    var firstWord = splitMsg[0]
    var restOfWords = splitMsg.slice(1)

    // Do your stuff.
    if(firstWord === '!pubgstats') {
      if(!restOfWords[0] || restOfWords.length > 4) {
        client.say(channel, 'Invalid command: try `!pubgstats help`')
      }

      //Only one argument: assume player id
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
            client.say(channel, 'Invalid command: try `!pubgstats help`')
          })
      }

      if(restOfWords.length === 2) {
        const id = restOfWords[1]
        const other = whatCommand(restOfWords[0])

        let config = { id }
        config[other.type] = other.command
        bot.search( config )
          .then((result) => {
            client.say(channel, result)
          })
          .catch((err) => {
            client.say(channel, 'Invalid command: try `!pubgstats help`')
          })
      }

      if(restOfWords.length === 3) {
        const id = restOfWords[2]
        const otherWords = restOfWords.slice(0,2)

        let config = { id }
        otherWords.map(whatCommand).forEach(command => {
          if(command instanceof Error) {
            client.say(channel, 'Invalid command: try "!pubgstats help"')
            config['invalid'] = true
          }
          config[command.type] = command.command
        })

        if(!config.invalid) {

          bot.search( config )
            .then((result) => {
              client.say(channel, result)
            })
            .catch((err) => {
              client.say(channel, 'Invalid command: try `!pubgstats help`')
            })
        }
      }

      if(restOfWords.length === 4) {
        const id = restOfWords[3]
        const otherWords = restOfWords.slice(0,3)

        let config = { id }

        otherWords.map(whatCommand).forEach(command => {
          if(command instanceof Error) {
            client.say(channel, 'Invalid command: try "!pubgstats help"')
            config['invalid'] = true
          }
          config[command.type] = command.command
        })

        if(!config.invalid) {

          bot.search( config )
            .then((result) => {
              client.say(channel, result)
            })
            .catch((err) => {
              client.say(channel, 'Invalid command: try `!pubgstats help`')
            })
        }
      }
    }
});

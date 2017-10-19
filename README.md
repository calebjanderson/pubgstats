# !pubgstats
Bot that talks about the game PLAYERUNKNOWN'S BATTLEGROUNDS (aka [pubg](https://www.playbattlegrounds.com))

Designed for use in [twitch](https://www.twitch.tv) chat

Responds with player data from [pubg.net](http://www.pubg.net)

Connects to twitch chat with help from a pretty cool library [tmi.js](https://www.docs.tmijs.org)

See [specs](specs.txt) for design details

## Getting Started

To setup you need [node](https://www.nodejs.org) >= v8.0.0 on your computer

Run `npm install` at the top level of this directory

**Must have credentials for twitch oauth.
Create a file called `.env` refer to `.env-example` for what to write in it**

To start run `npm start`

To test run `npm test`

## TODO

1. Write more tests
2. Debounce requests to prevent crash
3. Document more





# !pubgstats
Bot that talks about the game PLAYERUNKNOWN'S BATTLEGROUNDS (aka [pubg](https://www.playbattlegrounds.com))

Designed for use in [twitch](https://www.twitch.tv) chat

Responds with player data from [pubg.net](http://www.pubg.net)

Connects to twitch chat with help from a pretty cool library [tmi.js](https://www.docs.tmijs.org)

See [specs](specs.txt) for design details

## Usage

Visit https://www.twitch.tv/pubg_stat

### Example Commands
All commands must begin with `!pubgstats ` for the bot to respond

Only required parameter is **id** aka in-game name (ex: NinjaKappa, summit1g)

```
!pubgstats [ID]
!pubgstats [QUEUE] [ID]
!pubgstats [MODE] [ID]
!pubgstats [REGION] [QUEUE] [ID]
!pubgstats [REGION] [MODE] [ID]
!pubgstats [QUEUE] [MODE]  [ID]
!pubgstats [REGION] [QUEUE] [MODE] [ID]
```
Valid types - casing should not matter

```
{
  queue: ['SOLO', 'DUO', 'SQUAD'],
  mode: ['FPP', 'TPP'],
  region: ['AS', 'NA', 'EU', 'OCE', 'SA', 'SEA'],
}
```

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





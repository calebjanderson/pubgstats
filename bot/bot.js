const axios = require('axios');
const serverurl = 'http://pubg.net/api/pubgsite/user/by-nickname/'

module.exports = {
  search: function(config) {
    const { region, queue, mode, id } = config

    console.log('[DEV] - Search config: ', config)
    if(!id) {
      return 'missing id'
    }

    return axios.get(serverurl + config.id + '/stats?season=2017-pre4' )
      .then((response) => {
        const res = response.data

        //
        // create res.sortedStats, an array of stats sorted by Rating
        //
        res.sortedStats = res.stats.sort((a,b) => {
          if(a.Rating > b.Rating) {
            return -1
          }

          return 1
        })

        const stats = this.getRating(config, res)
        const info = this.printRating(stats)

        if(!info) {
          return 'No stats for that search'
        }
        return `${res.profile.Nickname} - ${info.region.toUpperCase()} ${info.queue[0].toUpperCase() + info.queue.slice(1).toLowerCase()} ${info.mode.toUpperCase()}: rating ${info.rating}, rank #${info.rank}, K/D ${info.kd}, Avg Dmg ${info.avgDmg} view more at http://www.pubg.net/player/${res.profile.Nickname.toLowerCase()}`
      })

  },

  printRating: function(info) {
    if(!info) {
      return null
    }

    return {
      rating: Number(Math.floor(info.Rating)).toLocaleString(),
      kd: info.KillDeathRatio.toFixed(2),
      rank: info.LadderPosition,
      avgDmg: info.AverageDamagePerMatch.toFixed(2),
      region: info.Region,
      queue: info.Queue,
      mode: info.Perspective,
    }
  },

  getRating: function(config, res) {
    const { region, queue, mode } = config
    const stats = res.sortedStats

    //
    // Filter based on provided config
    //



    return filterStatsBy({region, mode, queue}, stats)[0]
  }
}


function filterStatsBy(config, stats) {
  const { region, mode, queue } = config

  if(!region && !mode && !queue) return stats

  const filters = {
    region: (obj) => obj.Region === region.toLowerCase(),
    mode: (obj) => obj.Perspective === mode.toLowerCase(),
    queue: (obj) => obj.Queue === queue.toLowerCase(),
  }

  return stats.filter(x => {
    let condition = ''
    for(var key in config) {
      if(config[key]) {
        if(condition.length === 0) {
          condition += filters[key](x)
        } else {
          condition += ` && ${filters[key](x)}`
        }
      }
    }

    return eval(condition)
  })

}

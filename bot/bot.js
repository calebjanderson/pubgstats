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
    const { region, queue, mode, id } = config
    const stats = res.sortedStats

    //
    //  Filter based on provided config
    //

    if(!region && !queue && !mode) {
      //Get absolute highest rating between the 3 groups

      return stats[0]
    }

    if(region && !queue && !mode) {
      //Get highest from all modes and queues but only from region
      var matchingRegion = stats.filter(x => x.Region === region.toLowerCase())

      return matchingRegion[0]
    }

    if(region && queue && !mode) {
      var matchingRegionAndQueue = stats.filter(x => x.Region === region.toLowerCase() && x.Queue === queue.toLowerCase())

      return matchingRegionAndQueue[0]
    }

    if(region && !queue && mode) {
      var matchingRegionAndMode = stats.filter(x => x.Region === region.toLowerCase() && x.Perspective === mode.toLowerCase())

      return matchingRegionAndMode[0]
    }

    if(!region && queue && !mode) {
      var matchingQueue = stats.filter(x => x.Queue === queue.toLowerCase())

      return matchingQueue[0]
    }

    if(!region && !queue && mode) {
      var matchingMode = stats.filter(x => x.Perspective === mode.toLowerCase())

      return matchingMode[0]
    }

    if(region && mode && queue) {
      var mathingAll = stats.filter(x => x.Region === region.toLowerCase() && x.Perspective === mode.toLowerCase() && x.Queue === queue.toLowerCase())

      return mathingAll[0]
    }

  }
}

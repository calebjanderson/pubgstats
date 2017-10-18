const axios = require('axios');
const serverurl = 'http://pubg.net/api/pubgsite/user/by-nickname/'

module.exports = {
  search: function(config) {
    const { region, queue, mode, id } = config

    if(!id) {
      return 'missing id'
    }
    if(!region && !queue && !mode) {

    }


    return axios.get(serverurl + config.id + '/stats?season=2017-pre4' )
      .then((response) => {
        var res = response.data
        res.stats = res.stats.sort((a,b) => {
          if(a.Rating > b.Rating) {
            return -1
          }

          return 1
        })
        var info = this.getRating(config, res)
        return `${res.profile.Nickname} - ${info.region.toUpperCase()} ${info.queue[0].toUpperCase() + info.queue.slice(1).toLowerCase()} ${info.mode.toUpperCase()}: rating ${info.rating}, rank #${info.rank}, K/D ${info.kd}, Avg Dmg ${info.avgDmg} view more at http://www.pubg.net/player/${res.profile.Nickname.toLowerCase()}`
      })

  },

  printRating: function(selected) {
    return {
      rating: Number(Math.floor(selected.Rating)).toLocaleString(),
      kd: selected.KillDeathRatio.toFixed(2),
      rank: selected.LadderPosition,
      avgDmg: selected.AverageDamagePerMatch.toFixed(2),
      region: selected.Region,
      queue: selected.Queue,
      mode: selected.Perspective,
    }
  },

  getRating: function(config, res) {
    const { region, queue, mode, id } = config
    const stats = res.stats
    if(!region && !queue && !mode) {
      //Get absolute highest rating between the 3 groups

      return this.printRating(res.stats[0])
    }

    if(region && !queue && !mode) {
      //Get highest from all modes and queues but only from region

      var matchingRegion = stats.filter(x => x.Region === region.toLowerCase())
      return this.printRating(matchingRegion[0])
    }

    if(region && queue && !mode) {
      var selected = res.queues[queue.toLowerCase()]

      return this.printRating(selected)

    }

    if(region && !queue && mode) {
      var max = {Rating: 0}
      var matchingRegionAndMode = res.stats.filter(x => x.Region === region.toLowerCase() && x.Perspective === mode.toLowerCase())
      return this.printRating(matchingRegionAndMode[0])
    }

    if(!region && queue && !mode) {
      var selected = res.queues[queue.toLowerCase()]
      var matchingQueue = res.stats.filter(x => x.Queue === queue.toLowerCase())

      return this.printRating(stats[0])
    }

  }
}
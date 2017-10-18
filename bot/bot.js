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

    return axios.get(serverurl + config.id + '/stats')
      .then((response) => {
        console.log('asdf: ', response.data)
        var res = response.data
        var message = ''
        this.getRating(config)
        return `${res.Nickname} - `
      })

  },

  getRating: function(config) {
    const { region, queue, mode, id } = config

    if(!region && !queue && !mode) {
      //Get absolute highest rating between the 3 groups
    }

    if(region && !queue && !mode) {
      //Get highest from all modes and queues but only from region
    }

    if(region && queue && !mode) {

    }

    if(region && !queue && mode) {

    }

    if(!region && queue && mode) {

    }

    if(!region && queue && mode) {

    }

    if(region && queue && mode) {

    }
  }
}
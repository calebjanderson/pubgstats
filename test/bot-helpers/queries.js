var assert = require('assert');
var should = require('chai').should()
var ex = require('../exampleResponse')
console.log(ex)

var bot = require('../../bot/bot')

var idealResponse = 'NinjaKappa - NA Solo FPP: rating 2,013,  rank #93, K/D 6.21, Avg Dmg 533.16 view more at http://www.pubg.net/player/ninjakappa'


describe('!pubgstats', function() {
  describe("Regions - AS, NA, EU, OCE, SA, SEA (not case sensitive, optional) ", function() {
    it("should show only selected Region’s stats.", async function() {
      var response = await bot.search({ region: 'NA', id: 'NinjaKappa' })

      response.should.equal(idealResponse)
    });
    it("should show highest of all the Regions by default.", function() {

    })
  });
  describe('Queue - Solo, Duo, Squad (not case sensitive, optional)', function() {
    it('should only show stats for selected Queue', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('should show highest Queue if none is provided', function() {

    })
  });
  describe('Mode - FPP TPP (not case sensitive, optional). ', function() {
    it('should show only stats for selected mode', function() {

    })
    it('should show highest score if none provided', function() {

    })
  })
  describe('ID - Names (not case sensitive, required)', function() {
    it('should respond with missing id if no id provided', function() {
      bot.search({region: 'NA', queue: 'Solo', mode: 'FPP', id: null}).should.equal('missing id')
    })
  })
});





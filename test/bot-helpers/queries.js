var assert = require('assert');
var should = require('chai').should()
var ex = require('../exampleResponse')

var bot = require('../../bot/bot')

var idealResponse = 'NinjaKappa - NA Solo FPP: rating 2,013, rank #93, K/D 6.21, Avg Dmg 533.17 view more at http://www.pubg.net/player/ninjakappa'
var idealResponse2 = "NinjaKappa - NA Duo TPP: rating 2,251, rank #18, K/D 10.14, Avg Dmg 666.69 view more at http://www.pubg.net/player/ninjakappa"
var idealResponse3 = "summit1g - NA Duo FPP: rating 2,208, rank #36, K/D 6.84, Avg Dmg 497.14 view more at http://www.pubg.net/player/summit1g"

describe('!pubgstats', function() {
  describe("Regions - AS, NA, EU, OCE, SA, SEA (not case sensitive, optional) ", function() {
    it("should show only selected Region’s stats.", async function() {
      var response = await bot.search({ region: 'NA', id: 'NinjaKappa' })

      response.should.equal(idealResponse2)
    });
    xit("should show highest of all the Regions by default.", function() {

    })
  });
  describe('Queue - Solo, Duo, Squad (not case sensitive, optional)', function() {
    xit('should only show stats for selected Queue', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    xit('should show highest Queue if none is provided', function() {

    })
  });
  describe('Mode - FPP TPP (not case sensitive, optional). ', function() {
    xit('should show only stats for selected mode', function() {

    })
    xit('should show highest score if none provided', function() {

    })
  })
  describe('ID - Names (not case sensitive, required)', function() {
    it('should respond with missing id if no id provided', function() {
      bot.search({region: 'NA', queue: 'Solo', mode: 'FPP', id: null}).should.equal('missing id')
    })
    it('should respond with max rating if all other fields are empty', async function() {
      var response = await bot.search({id: 'NinjaKappa'})

      response.should.equal(idealResponse2)
    })
  })

  describe('NinjaKappa queries - Check responses vs specs', function() {
    it('should match the first ninjakappa query', async function() {
      var response = await bot.search({region: 'NA', queue: 'Solo', id: 'NinjaKappa'})

      response.should.equal(idealResponse)
    })

    it('should match the second ninjakappa query with only queue and id', async function() {
      var response = await bot.search({ queue: 'Duo', id: 'NinjaKappa'})

      response.should.equal(idealResponse2)
    })

    it('should match the second drdisrespect query with only queue and id', async function() {
      var response = await bot.search({ id: 'summit1g' })

      response.should.equal(idealResponse3)
    })
  })
});





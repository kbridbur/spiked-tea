// Spiked tea tests
// @author Anthony Liu
// @date 2016-08-22

var snn = require('../src/spiked-tea.js');
var assert = require('assert');

var spike = snn();

describe('spike', function() {
  describe('#learn', function() {
    it('should return 1', function() {
      var actual = spike.learn();
      var expected = 1;
      assert.deepEqual(actual, expected);
    });
  });
});

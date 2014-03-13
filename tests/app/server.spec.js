'use strict';
var assert = require('assert');

describe('A suite', function(){
  it('contains spec with an expectation', function testAssertions(){
assert.equal(1, [1,2,3].indexOf(4));
  });
});
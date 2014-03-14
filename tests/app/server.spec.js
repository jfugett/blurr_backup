/* globals describe, it */
'use strict';
var server = require('../../app/server.js');

var assert = require('assert');

describe('Server', function(){
    it('Should have a value', function(){
        assert.equal(server.value, 2, 'of two');
    });
});
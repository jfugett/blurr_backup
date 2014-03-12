'use strict';

var basePath = '../../app/';

delete require.cache[require.resolve(basePath + 'server')];
var server = require(basePath + 'server');

describe('Server Test', function(){
    it('Should be 2.', function(){
        expect(server.server).toBe(2);
    });
});
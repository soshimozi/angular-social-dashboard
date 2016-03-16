'use strict';
var app = require('angular').module('angular-social-media');

// hook up modules to services
app.service('TestService', require('./test/test-service'));
app.service('SessionService', require('./session-service'));
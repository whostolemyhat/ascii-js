'use strict';

var context = require.context('./', true, /^(?!.*(?:\/auxiliary)).*\-test$/ );
var tests = context.keys().forEach(context);
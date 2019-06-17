const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = window;
global.document = document;
global.jQuery = require('jquery')(window);
global.$ = jQuery;
global.window = window;
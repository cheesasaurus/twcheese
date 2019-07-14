const { JSDOM } = require('jsdom');
const w = (new JSDOM('', { url: 'https://example.com' })).window;
global.jQuery = require('jquery')(w);
global.$ = jQuery;

// must be done after requiring jquery
global.window = w;
global.document = w.document;
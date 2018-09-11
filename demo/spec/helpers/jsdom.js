import { jsdom } from 'jsdom';

// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.PageRunner=n()}(this,function(){"use strict";var t=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var u in n=arguments[e])Object.prototype.hasOwnProperty.call(n,u)&&(t[u]=n[u]);return t};return function(){function n(e){this.options=t({},n.defaultOptions,e)}return n.prototype.on=function(t,n){var e=this.pages.slice();return e.forEach(function(n){n.name===t&&e.push({name:t,resolved:!1,functions:[]})}),this.pages=e.map(function(e){return e.name===t&&e.functions.push(n),e}),this},n.prototype.onAll=function(t){return this.globals.push(t),this},n.prototype.run=function(t){var n=this;void 0===t&&(t=null),this.globals.map(function(t){return t(document.body)}),this.pages=this.pages.map(function(t){return n.options.testFn(t.name,document.body)?(t.functions.map(function(n){return n(t,document.body)}),t.resolved=!0,t):t}),t&&t()},n.testFn=function(t,n){return n.getAttribute("data-page")===t},n.defaultOptions={testFn:n.testFn},n}()});
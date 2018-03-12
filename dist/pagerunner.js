(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.PageRunner = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

/** ========================================================================= *\
 * PageRunner v0.1.0
 * A JavaScript helper library that helps you run page-specific code.
 *
 * @author James Ooi
 * ========================================================================== */
var PageRunner = /** @class */ (function () {
    // Constructor ------------------------------------------------------------ */
    function PageRunner(options) {
        // Class Properties ------------------------------------------------------- */
        this.options = {};
        this.pages = [];
        this.globals = [];
        this.options = __assign({}, PageRunner.defaultOptions, options);
    }
    // Public Methods --------------------------------------------------------- */
    /**
     * Registers a new page function
     * @param {String} pageName Name of page
     * @param {Function} fn Function to run in this page
     */
    PageRunner.prototype.on = function (pageName, fn) {
        var pages = this.pages.slice();
        // Add new page if it hasn't been registered
        var found = false;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].name === pageName) {
                found = true;
                break;
            }
        }
        if (!found) {
            pages.push({ name: pageName, resolved: false, functions: [] });
        }
        // Register new function
        this.pages = pages.map(function (page) {
            if (page.name === pageName) {
                page.functions.push(fn);
            }
            return page;
        });
        return this;
    };
    /**
     * Registers a new global function that runs on all pages
     * @param {Function} fn
     */
    PageRunner.prototype.onAll = function (fn) {
        this.globals.push(fn);
        return this;
    };
    /**
     * Run pages
     * @param {Function} callbackFn
     */
    PageRunner.prototype.run = function (callbackFn) {
        var _this = this;
        if (callbackFn === void 0) { callbackFn = null; }
        // Run global functions
        this.globals.map(function (fn) { return fn(document.body); });
        // Run page specific functions
        this.pages = this.pages.map(function (page) {
            // Check if we should run this page
            if (!_this.options.testFn(page.name, document.body)) {
                return page;
            }
            // Run all page functions
            page.functions.map(function (fn) { return fn(page, document.body); });
            page.resolved = true;
            return page;
        });
        // Call the callback function
        if (callbackFn) {
            callbackFn();
        }
    };
    // Static Properties ------------------------------------------------------ */
    /** Function to determine whether a page should be run */
    PageRunner.testFn = function (pageName, body) {
        return body.getAttribute('data-page') === pageName;
    };
    /** Default Options */
    PageRunner.defaultOptions = {
        testFn: PageRunner.testFn
    };
    return PageRunner;
}());

return PageRunner;

})));

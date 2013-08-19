'use strict';

var DetectBrowser = function (config) {
    var path = require('path'),
        fs = require('fs'),
        browsers = require('./browsers');

    /**
     * Returns all browser names found on the current system.
     *
     * @param {!Object} browsers The object with all browsers fro the browsers directory.
     * @returns {Array}
     */
    function getInstalledBrowsers (browsers) {
        var i, length,
            browserNames = Object.keys(browsers),
            result = [];

        // iterate over all browsers in the browsers folder
        for (i = 0, length = browserNames.length; i < length; i++) {
            var browser = browsers[browserNames[i]],
                browserPaths = browser.DEFAULT_CMD[process.platform] || [],
                y, paths = browserPaths.length;

            // iterate over all browser paths
            for (y = 0; y < paths; y++) {
                if (fs.existsSync(browserPaths[y]) || process.env[browser.ENV_CMD] || fs.existsSync(path.join('/', 'usr', 'bin', browserPaths[y]))) {
                    // add browser when found in file system or when env variable is set
                    result.push(browser.name);

                    // set env variable on win32 when it does not exist yet
                    if (process.platform === 'win32' && !process.env[browser.ENV_CMD]) {
                        process.env[browser.ENV_CMD] = browserPaths[i];
                    }

                    break;
                }
            }
        }

        return result;
    }

    var availableBrowser = getInstalledBrowsers(browsers);

    console.log('Following browsers where detected on your system:');
    console.log(availableBrowser);

    config.browsers = availableBrowser;
};

// inject karma runner config
DetectBrowser.$inject = ['config'];

// PUBLISH DI MODULE
module.exports = {
    'framework:detectBrowsers': ['factory', DetectBrowser]
};
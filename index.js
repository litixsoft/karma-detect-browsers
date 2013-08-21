'use strict';

var DetectBrowsers = function (config) {
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
                        process.env[browser.ENV_CMD] = browserPaths[y];
                    }

                    break;
                }
            }
        }

        return result;
    }

    config = config || {};
    config.detectBrowsers = config.detectBrowsers || {};

    if (config.detectBrowsers.enabled === false) {
        console.log('Detecting browsers is disabled. The browsers of the browsers array are used.');
        return;
    }

    var availableBrowser = getInstalledBrowsers(browsers);

    // override the browsers in the config only when browsers where find by this plugin
    if (availableBrowser.length > 0) {
        // check for PhantomJS option
        if (config.detectBrowsers.usePhantomJS !== false) {
            availableBrowser.push('PhantomJS');
        }

        console.log('Following browsers where detected on your system:');
        console.log(availableBrowser);

        config.browsers = availableBrowser;
    } else {
        console.log('No browser was detected. The browsers of the browsers array are used.');
    }
};

// inject karma runner config
DetectBrowsers.$inject = ['config'];

// PUBLISH DI MODULE
module.exports = {
    'framework:detectBrowsers': ['factory', DetectBrowsers]
};
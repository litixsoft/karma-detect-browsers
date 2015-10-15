'use strict';

var DetectBrowsers = function (config, logger) {
    var fs = require('fs'),
        which = require('which'),
        browsers = require('./browsers'),
        log = logger.create('framework.detect-browsers');

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
                try {
                    if (fs.existsSync(browserPaths[y]) || process.env[browser.ENV_CMD] || which.sync(browserPaths[y])) {
                        // add browser when found in file system or when env variable is set
                        result.push(browser.name);

                        // set env variable on win32 when it does not exist yet
                        if (process.platform === 'win32' && !process.env[browser.ENV_CMD]) {
                            process.env[browser.ENV_CMD] = browserPaths[y];
                        }

                        break;
                    }
                } catch (e) {
                    // which.sync() failed to find the browser.
                }
            }
        }

        return result;
    }

    config = config || {};
    config.detectBrowsers = config.detectBrowsers || {};

    if (config.detectBrowsers.enabled === false) {
        log.info('Detecting browsers is disabled. The browsers of the browsers array are used.');
        return;
    }

    var availableBrowser = getInstalledBrowsers(browsers);

    // override the browsers in the config only when browsers where find by this plugin
    if (availableBrowser.length >= 0) {
        // check for PhantomJS option
        if (config.detectBrowsers.usePhantomJS !== false) {
            availableBrowser.push('PhantomJS');
        }

        log.info('The following browsers were detected on your system:', availableBrowser);

        if (config.detectBrowsers.postDetection && typeof config.detectBrowsers.postDetection === 'function') {
            //Add specific process to manage browsers list
            availableBrowser = config.detectBrowsers.postDetection(availableBrowser);
        }

        if (availableBrowser.length > 0) {
            config.browsers = availableBrowser;
        }
    } else {
        log.warn('No browsers were detected. The browsers of the browsers array are used.');
    }
};

// inject karma runner config
DetectBrowsers.$inject = ['config', 'logger'];

// PUBLISH DI MODULE
module.exports = {
    'framework:detectBrowsers': ['factory', DetectBrowsers]
};

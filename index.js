'use strict';

var DetectBrowser = function (config) {
    var path = require('path'),
        fs = require('fs'),
        browsers = [
            {
                name: 'Chrome',
                DEFAULT_CMD: {
                    linux: ['google-chrome'],
                    darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
                    win32: [
                        process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
                        process.env.ProgramW6432 + '\\Google\\Chrome\\Application\\chrome.exe',
                        process.env.ProgramFiles + '\\Google\\Chrome\\Application\\chrome.exe',
                        process.env['ProgramFiles(x86)'] + '\\Google\\Chrome\\Application\\chrome.exe'
                    ]
                },
                ENV_CMD: 'CHROME_BIN'
            },
            {
                name: 'ChromeCanary',
                DEFAULT_CMD: {
                    linux: ['google-chrome-canary'],
                    darwin: ['/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'],
                    win32: [
                        process.env.LOCALAPPDATA + '\\Google\\Chrome SxS\\Application\\chrome.exe',
                        process.env.ProgramW6432 + '\\Google\\Chrome SxS\\Application\\chrome.exe',
                        process.env.ProgramFiles + '\\Google\\Chrome SxS\\Application\\chrome.exe',
                        process.env['ProgramFiles(x86)'] + '\\Google\\Chrome SxS\\Application\\chrome.exe'
                    ]
                },
                ENV_CMD: 'CHROME_CANARY_BIN'
            },
            {
                name: 'Firefox',
                DEFAULT_CMD: {
                    linux: ['firefox'],
                    darwin: ['/Applications/Firefox.app/Contents/MacOS/firefox-bin'],
                    win32: [
                        process.env.LOCALAPPDATA + '\\Mozilla Firefox\\firefox.exe',
                        process.env.ProgramW6432 + '\\Mozilla Firefox\\firefox.exe',
                        process.env.ProgramFiles + '\\Mozilla Firefox\\firefox.exe',
                        process.env['ProgramFiles(x86)'] + '\\Mozilla Firefox\\firefox.exe'
                    ]
                },
                ENV_CMD: 'FIREFOX_BIN'
            },
            {
                name: 'Safari',
                DEFAULT_CMD: {
                    darwin: ['/Applications/Safari.app/Contents/MacOS/Safari'],
                    win32: [
                        process.env.LOCALAPPDATA + '\\Safari\\Safari.exe',
                        process.env.ProgramW6432 + '\\Safari\\Safari.exe',
                        process.env.ProgramFiles + '\\Safari\\Safari.exe',
                        process.env['ProgramFiles(x86)'] + '\\Safari\\Safari.exe'
                    ]
                },
                ENV_CMD: 'SAFARI_BIN'
            },
            {
                name: 'IE',
                DEFAULT_CMD: {
                    win32: [
                        process.env.ProgramW6432 + '\\Internet Explorer\\iexplore.exe',
                        process.env.ProgramFiles + '\\Internet Explorer\\iexplore.exe',
                        process.env['ProgramFiles(x86)'] + '\\Internet Explorer\\iexplore.exe'
                    ]
                },
                ENV_CMD: 'IE_BIN'
            }
        ];

    function getInstalledBrowsers (browsers) {
        var result = [];

        browsers.forEach(function (browser) {
            var browserPaths = browser.DEFAULT_CMD[process.platform] || [],
                i, length = browserPaths.length;

            for (i = 0; i < length; i++) {
                if (fs.existsSync(browserPaths[i]) || process.env[browser.ENV_CMD] || fs.existsSync(path.join('/', 'usr', 'bin', browserPaths[i]))) {
                    result.push(browser.name);

                    if (process.platform === 'win32' && !process.env[browser.ENV_CMD]) {
                        process.env[browser.ENV_CMD] = browserPaths[i];
                    }

                    return;
                }
            }
        });

        return result;
    }

    console.log(config.browsers);

    var availableBrowser = getInstalledBrowsers(browsers);

    console.log(availableBrowser);

    config.browsers = ['Firefox'];

    console.log(config.browsers);

};

// inject karma runner config
DetectBrowser.$inject = ['config'];

// PUBLISH DI MODULE
module.exports = {
    'framework:detectBrowsers': ['factory', DetectBrowser]
};
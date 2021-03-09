var linux, darwin, win32;

try {
    var CMD = require('@chiragrupani/karma-chromium-edge-launcher')['launcher:Edge'][1].prototype.DEFAULT_CMD;
    linux = CMD.linux, darwin = CMD.darwin, win32 = CMD.win32;
} catch (ignore) {}

try {
    win32 = require.resolve('edge-launcher/dist/x86/MicrosoftEdgeLauncher.exe');
} catch (ignore) {}

module.exports = {
    name: 'Edge',
    DEFAULT_CMD: {
        linux: [linux || ''],
        darwin: [darwin || ''],
        win32: [win32 || '']
    },
    ENV_CMD: 'EDGE_BIN'
};

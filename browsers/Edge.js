var resolve = require('resolve');
var CMD;

try {
    CMD = resolve.sync('edge-launcher/Win32/MicrosoftEdgeLauncher.exe');
} catch (e) {
    CMD = '';
}

module.exports = {
    name: 'Edge',
    DEFAULT_CMD: {
        win32: [CMD]
    },
    ENV_CMD: 'EDGE_BIN'
};

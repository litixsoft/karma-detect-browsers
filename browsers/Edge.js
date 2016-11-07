var resolve = require('resolve');

module.exports = {
    name: 'Edge',
    DEFAULT_CMD: {
        win32: [resolve.sync('edge-launcher/Win32/MicrosoftEdgeLauncher.exe')]
    },
    ENV_CMD: 'EDGE_BIN'
};

var CMD;

try {
    CMD = require.resolve('edge-launcher/Win32/MicrosoftEdgeLauncher.exe');
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

module.exports = {
    name: 'Chromium',
    DEFAULT_CMD: {
        // Try chromium-browser before chromium to avoid conflict with the legacy
        // chromium-bsu package previously known as 'chromium' in Debian and Ubuntu.
        linux: ['chromium-browser', 'chromium'],
        darwin: [],
        win32: []
    },
    ENV_CMD: 'CHROMIUM_BIN'
};

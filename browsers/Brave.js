module.exports = {
    name: 'Brave',
    DEFAULT_CMD: {
      win32: [
        process.env.LOCALAPPDATA + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        process.env.ProgramW6432 + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        process.env.ProgramFiles + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        process.env['ProgramFiles(x86)'] + '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
      ]
    },
};  
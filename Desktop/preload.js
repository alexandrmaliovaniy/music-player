const customTitlebar = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded', () => {
    const title = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#333')
    });
    title.updateMenu(null);
})

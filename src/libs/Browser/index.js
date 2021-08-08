const electron = require('electron')

class Browser {
    constructor() {
        this.win = null;
        this.electron = electron;

        this.init();
    }

    init = () => {
        const { app } = this.electron;

        app.whenReady().then(() => {
            this.createWindow();
        });
        
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }

    createWindow = () => {
        this.win = new this.electron.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: false
            }
        });
    
        this.win.loadFile('./src/public/index.html');
        // this.win.webContents.openDevTools()

        this.win.maximize();
    }
}

module.exports = Browser;
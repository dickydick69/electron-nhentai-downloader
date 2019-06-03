const electron = require('electron');
const { ipcMain, dialog } = electron
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const homedir = require('os').homedir()
const tempDir = `${app.getPath("temp")}/nhentai-downloader`
let downloadPath = app.getPath("documents") + "/nhentai-downloader"
const DownloadManager = require("electron-download-manager");
const fs = require('fs-extra')
const archiver = require('archiver')

DownloadManager.register({
  downloadFolder: tempDir
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 480, height: 854, resizable: false });
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(`${path.join(__dirname, '../build/index.html')}`);
  }

  if (isDev) {
    // Open the DevTools.
    BrowserWindow.addDevToolsExtension(`${homedir}/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0`);
    //Redux DevTool
    BrowserWindow.addDevToolsExtension(`${homedir}/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0`);
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('get-current-download-path', event => {
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }
  fs.ensureDir(downloadPath,desiredMode).then(() => {
    event.sender.send('download-path', downloadPath)
  })
})

ipcMain.on('download', (event, links, data) => {
  const length = links.length;
  let counter = 0
  const title = data.title.pretty.replace(/[\\\/\:\*\?\"\<\>\|]/, "")
  for (let i = 0; i < length; i++) {
    DownloadManager.download({
      url: links[i],
      path: title
    }, (error, info) => {
      counter += 1;
      let percentage = Math.floor(((counter / length) * 100) - 5)
      event.sender.send('download-progress', percentage, data.id)
      if (counter === length) {
        let output = fs.createWriteStream(`${downloadPath}/${title}.zip`)
        let archive = archiver('zip', {
          zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function () {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
          event.sender.send('download-progress', percentage + 5, data.id)
          fs.remove(`${tempDir}/${title}`)
        });

        archive.pipe(output);
        archive.directory(`${tempDir}/${title}`, title);
        archive.finalize();
      }

    })
  }
})

ipcMain.on('open-dialog', event => {
  let options = { properties: ["openDirectory"] }
  dialog.showOpenDialog(options, (dir) => {
    if (dir) {
      downloadPath = dir
      event.sender.send('download-path', downloadPath)
    }
  })
})
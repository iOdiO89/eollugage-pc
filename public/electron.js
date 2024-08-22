const { app, BrowserWindow } = await import('electron')
const path = await import('path')
const { fileURLToPath } = await import('url')
// const isDev = await import('electron-is-dev')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    resizable: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // devTools: isDev,
      preload: path.join(__dirname, 'proload.js'),
    },
  })

  mainWindow.loadURL('http://localhost:3000')
  // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  // if (isDev)
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
  mainWindow.focus()
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

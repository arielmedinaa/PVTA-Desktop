import { app, shell, BrowserWindow, ipcMain, net } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; connect-src 'self' http://localhost:8000/api/v1/ http://localhost:8000/api/v1/licenses/validate; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        ]
      }
    });
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.commandLine.appendSwitch('ignore-certificate-errors');

app.whenReady().then(() => {
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (url.startsWith('http://localhost:8000/')) {
      event.preventDefault();
      callback(true);
    } else {
      callback(false);
    }
  });

  ipcMain.handle('api-request', async (event, options) => {
    const { method = 'GET', endpoint, data } = options;
    const baseUrl = 'http://localhost:8000/api/v1';
    
    return new Promise((resolve, reject) => {
      const request = net.request({
        method: method,
        url: `${baseUrl}/${endpoint}`,
        rejectUnauthorized: false 
      });
      
      // Configurar headers
      request.setHeader('Content-Type', 'application/json');
      
      let responseData = '';
      
      request.on('response', (response) => {
        response.on('data', (chunk) => {
          responseData += chunk.toString();
        });
        
        response.on('end', () => {
          console.log(`API Response (${response.statusCode}):`, responseData);
          
          try {
            const data = responseData ? JSON.parse(responseData) : {};
            resolve({
              status: response.statusCode,
              headers: response.headers,
              data: data
            });
          } catch (error) {
            console.error('Error parsing response:', error);
            resolve({
              status: response.statusCode,
              headers: response.headers,
              data: responseData,
              parseError: error.message
            });
          }
        });
      });
      
      request.on('error', (error) => {
        console.error('Network error:', error);
        reject(error);
      });
      
      if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        const jsonData = JSON.stringify(data);
        console.log(`Sending data to API: ${jsonData}`);
        request.write(jsonData);
      }
      
      request.end();
    });
  });

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.send('ping')
})

contextBridge.exposeInMainWorld('api', {
  request: (options) => ipcRenderer.invoke('api-request', options)
})
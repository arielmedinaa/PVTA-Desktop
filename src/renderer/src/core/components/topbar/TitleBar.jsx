import React, { useEffect, useState } from 'react';

const ipcRenderer = window.require ? window.require('electron').ipcRenderer : null;

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [title, setTitle] = useState('PVTA');

  useEffect(() => {
    const updateTitle = () => setTitle(document.title || 'PVTA');
    const titleObserver = new MutationObserver(updateTitle);

    if (document.title) {
      updateTitle();
    }

    titleObserver.observe(document.querySelector('title'), { childList: true });

    const unlisten = window.addEventListener('resize', () => {
      setIsMaximized(window.outerHeight === screen.availHeight);
    });

    return () => {
      titleObserver.disconnect();
      window.removeEventListener('resize', unlisten);
    };
  }, []);

  const handleMinimize = () => {
    if (ipcRenderer) {
      ipcRenderer.send('minimize-window');
    }
  };

  const handleMaximize = () => {
    if (ipcRenderer) {
      if (isMaximized) {
        ipcRenderer.send('unmaximize-window');
      } else {
        ipcRenderer.send('maximize-window');
      }
      setIsMaximized(!isMaximized);
    }
  };

  const handleClose = () => {
    if (ipcRenderer) {
      ipcRenderer.send('close-window');
    }
  };

  return (
    <div
      data-tauri-drag-region
      className="h-8 bg-white text-slate-800 flex items-center justify-center px-3 select-none"
    >

      <div className="text-sm font-medium">
        {title}
      </div>

      <div className="w-12">
        {/* Espacio vacío para equilibrar el diseño */}
      </div>
    </div>
  );
};

export default TitleBar;

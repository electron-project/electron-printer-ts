import { BrowserWindow, shell } from 'electron';

export const initEvent = (mainWindow: BrowserWindow | null) => {
  // Open urls in the user's browser
  mainWindow?.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  mainWindow?.on('ready-to-show', () => {
    if (!mainWindow) throw new Error('"主窗口没有定义');

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow?.on('closed', () => {
    mainWindow = null;
  });
};

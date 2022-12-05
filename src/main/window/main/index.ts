import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { isDebug } from '@/constant/env';
import installExtensions from '@/main/config/plugin/dev-tools';
import AppUpdater from '@/main/config/plugin/auto-update';
import { resolveHtmlPath } from '@/main/utils/path';
import { iconPath } from '@/constant/icon';
import { initEvent } from '@/main/window/main/event';
import initTray from '@/main/window/main/tray';
import createMenu from '@/main/window/main/menu';
import initElectronRemote from '@/main/window/main/electron-remote';
import { regGlobalShortcut } from '@/main/window/main/global-shortcut';
import '@/main/ipc/accept/example';
import * as process from 'process';

const createWindow = async () => {
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    show: true,
    width: 1024,
    height: 728,
    icon: iconPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(process.cwd(), '.erb/dll/preload.js'),
    },
  });

  // objc[85955]: Class WebSwapCGLLayer is implemented in both xxxxx One of the two will be used. Which one is undefined.
  // Failed to fetch extension, trying 4 more times
  // 是因为安装开发者工具 没有外网
  // 必须在 loadURL 之前进行安装
  if (isDebug) await installExtensions();

  // 设置为最顶层
  // win.setAlwaysOnTop(true)
  // 可以让主进程打开文件或者一个链接;
  // win.loadURL(`www.baidu.com`)
  await mainWindow.loadURL(resolveHtmlPath('index.html'));

  initTray(mainWindow);
  createMenu(mainWindow);
  regGlobalShortcut(mainWindow);

  initEvent(mainWindow);
  await initElectronRemote(mainWindow);

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

export default createWindow;

import { BrowserWindow, globalShortcut } from 'electron';

export function regGlobalShortcut(win: BrowserWindow) {
  globalShortcut.register('CmdOrCtrl + e', async () => {
    console.log('创建快捷键');
  });

  globalShortcut.register('F12', () => {
    const { webContents } = win;
    webContents.toggleDevTools();
  });
}

// 检测是否注册成功
export function isReg() {
  const isDevTool = globalShortcut.isRegistered('ctrl + e')
    ? 'success'
    : 'fail';
  console.log(isDevTool);
}

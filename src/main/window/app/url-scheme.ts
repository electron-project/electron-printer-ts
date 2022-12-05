// https://cloud.tencent.com/developer/article/1781419
// https://www.electronjs.org/zh/docs/latest/tutorial/launch-app-from-url-in-another-app#windows-%E4%B8%8B%E4%BB%A3%E7%A0%81

import { app, ipcMain, shell } from 'electron';
import { PROTOCOL } from '@/constant/url-scheme';
import path from 'path';

// process.defaultApp 当应用程序启动时被作为参数传递给默认应用，这个属性在主进程中是 true，否则是undefined
if (process.defaultApp && !app.isPackaged && process.argv.length >= 2) {
  //  将当前可执行文件的设置为协议(也就是 URI scheme) 的默认处理程序。 该方法允许你将应用更深入地集成到操作系统中。
  //  一旦注册了，所有 your-protocol:// 开头的链接将使用当前可执行文件打开。 整个链接，包括协议部分，将作为参数传递给你的应用程序。
  // 后边两个参数是 windows 特有
  app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
    // 在开发阶段，我们是通过 electron . 或者 electron path/to/script.js 来启动的应用，
    // 所以 process.argv[1] 是我们的脚本路径，传给系统时，这个参数也不能少，
    // 否则启动的就是一个纯粹的 Electron 壳，而不是我们的应用了
    path.resolve(process.argv[1]),
  ]);
} else {
  app.setAsDefaultProtocolClient(PROTOCOL);
}

// 获取 app 锁，防止启动第二个实例
//    获取失败则代表有实例已经运行了
//    如果当前进程是应用程序的主要实例，则此方法返回true
// 在 macOS 上, 当用户尝试在 Finder 中打开您的应用程序的第二个实例时, 系统会通过发出 open-file 和 open-url 事件来自动强制执行单个实例。
// 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 您必须手动调用此方法来确保单实例
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  // Windows
  // 当第二个实例被执行并且调用 app.requestSingleInstanceLock() 时，这个事件将在你的应用程序的首个实例中触发
  // argv 是第二个实例的命令行参数的数组, workingDirectory 是这个实例当前工作目录。 通常, 应用程序会激活窗口并且取消最小化来响应
  app.on('second-instance', (event, argv) => {
    if (process.platform === 'win32') {
      const prefix = `${PROTOCOL}:`;
      const offset = app.isPackaged ? 1 : 2;
      const url = argv.find((arg, i) => i >= offset && arg.startsWith(prefix));
      if (url) urlSchemeParams(url);
    }
  });

  // macOS
  app.on('open-url', (event, url) => {
    urlSchemeParams(url);
  });
}

function urlSchemeParams(url: string) {
  // printApp://?name=1&pwd=2
  const urlObj = new URL(url);
  const { searchParams } = urlObj;

  let userId = searchParams.get('name');
  let sectionId = searchParams.get('pwd');
}

// 通过 electron 的 ipc 通信，从 render 传递参数来唤醒别的 app
ipcMain.on('shell:open', async () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
  const pagePath = path.join('file://', pageDirectory, 'index.html');
  await shell.openExternal(pagePath);
});

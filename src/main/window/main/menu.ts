import {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  shell,
} from 'electron';
import { isDebug } from '@/constant/env';
import CurrentPlatform from '@/constant/platform';

let win: BrowserWindow;

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

function buildDarwinTemplate(): MenuItemConstructorOptions[] {
  const subMenuAbout: DarwinMenuItemConstructorOptions = {
    label: 'Electron',
    submenu: [
      {
        label: '关于 ElectronReact',
        selector: 'orderFrontStandardAboutPanel:',
      },
      // 分隔符
      { type: 'separator' },
      { label: 'Services', submenu: [] },
      { type: 'separator' },
      {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:',
      },
      {
        label: '隐藏其他',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:',
      },
      { label: '展示所有', selector: 'unhideAllApplications:' },
      { type: 'separator' },
      {
        label: '退出',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  };
  const subMenuEdit: DarwinMenuItemConstructorOptions = {
    label: '编辑',
    submenu: [
      { label: '撤消', accelerator: 'Command+Z', selector: 'undo:' },
      { label: '重做', accelerator: 'Shift+Command+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
      { label: '复制', accelerator: 'Command+C', selector: 'copy:' },
      { label: '粘贴', accelerator: 'Command+V', selector: 'paste:' },
      {
        label: '选择所有',
        accelerator: 'Command+A',
        selector: 'selectAll:',
      },
    ],
  };
  const subMenuViewDev: MenuItemConstructorOptions = {
    label: '视图',
    submenu: [
      {
        label: '刷新',
        accelerator: 'Command+R',
        click: () => {
          win.webContents.reload();
        },
      },
      {
        label: '切换全屏',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          win.setFullScreen(!win.isFullScreen());
        },
      },
      {
        label: '切换开发者工具',
        accelerator: 'Alt+Command+I',
        click: () => {
          win.webContents.toggleDevTools();
        },
      },
    ],
  };
  const subMenuViewProd: MenuItemConstructorOptions = {
    label: '视图',
    submenu: [
      {
        label: '切换全屏',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          win.setFullScreen(!win.isFullScreen());
        },
      },
    ],
  };
  const subMenuWindow: DarwinMenuItemConstructorOptions = {
    label: '窗口',
    submenu: [
      {
        label: '最小化',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:',
      },
      { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
      { type: 'separator' },
      { label: 'Bring All to Front', selector: 'arrangeInFront:' },
    ],
  };
  const subMenuHelp: MenuItemConstructorOptions = {
    label: '帮助',
    submenu: [
      {
        label: '学习更多',
        click() {
          shell.openExternal('https://electronjs.org');
        },
      },
      {
        label: '文档',
        click() {
          shell.openExternal(
            'https://github.com/electron/electron/tree/main/docs#readme'
          );
        },
      },
      {
        label: '社区讨论',
        click() {
          shell.openExternal('https://www.electronjs.org/community');
        },
      },
      {
        label: '搜索 Issues',
        click() {
          shell.openExternal('https://github.com/electron/electron/issues');
        },
      },
    ],
  };

  const subMenuView =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
      ? subMenuViewDev
      : subMenuViewProd;

  return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
}

function buildDefaultTemplate() {
  return [
    {
      label: '&文件',
      submenu: [
        {
          label: '&打开窗口',
          accelerator: 'Ctrl+O',
        },
        {
          label: '&关闭窗口',
          accelerator: 'Ctrl+W',
          click: () => {
            win.close();
          },
        },
      ],
    },
    {
      label: '&开发者工具',
      submenu: isDebug
        ? [
            {
              label: '&刷新',
              accelerator: 'Ctrl+R',
              click: () => {
                win.webContents.reload();
              },
            },
            {
              label: '切换全屏',
              accelerator: 'F11',
              click: () => {
                win.setFullScreen(!win.isFullScreen());
              },
            },
            {
              label: '切换开发者工具',
              // 添加快捷键
              accelerator: 'CmdOrCtrl + shift + i',
              click: () => {
                const { webContents } = win;
                webContents.toggleDevTools();
              },
            },
          ]
        : [
            {
              label: '切换全屏',
              accelerator: 'F11',
              click: () => {
                win.setFullScreen(!win.isFullScreen());
              },
            },
          ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '学习更多',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'electron 文档',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: '交流社区',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: '搜索 issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    },
  ];
}

function setupDevelopmentEnvironment(): void {
  win.webContents.on('context-menu', (_, props) => {
    const { x, y } = props;

    const popUpTemplate = [
      {
        label: '检查元素',
        click: () => {
          win.webContents.inspectElement(x, y);
        },
      },
    ];

    Menu.buildFromTemplate(popUpTemplate).popup({ window: win });
  });
}

const template = CurrentPlatform.isMac
  ? buildDefaultTemplate()
  : buildDarwinTemplate();

export default function createMenu(windows: BrowserWindow) {
  win = windows;

  if (isDebug) {
    setupDevelopmentEnvironment();
  }

  // 从模板中创建菜单
  // https://www.electronjs.org/docs/latest/api/menu-item#menuitemid
  const myMenu = Menu.buildFromTemplate(template);

  // 设置为应用程序菜单
  Menu.setApplicationMenu(myMenu);
}

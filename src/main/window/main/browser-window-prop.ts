import { iconPath } from '@/constant/icon';
import { app } from 'electron';
import path from 'path';
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import WebPreferences = Electron.WebPreferences;

const webPreferences: WebPreferences = {
  devTools: true, // 是否可使用开发者工具
  // 是否集成Node
  nodeIntegration: true, // 默认false
  nodeIntegrationInWorker: false, // 是否在Web工作器中启用了Node集成. 默认值为 false
  // 脚本路径为文件的绝对路径。 在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API  当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志
  preload: app.isPackaged
    ? path.join(__dirname, 'preload.js')
    : path.join(process.cwd(), '.erb/dll/preload.js'),
  sandbox: false, // 如果设置该参数, 沙箱的渲染器将与窗口关联, 使它与Chromium OS-level 的沙箱兼容, 并禁用 Node. js 引擎。 它与 nodeIntegration 的选项不同，且预加载脚本的 API 也有限制.
  // session:  // 默认 session 设置页面的 session 而不是直接忽略 Session 对象, 也可用 partition 选项来代替，它接受一个 partition 字符串. 同时设置了session 和 partition时, session 的优先级更高. 默认使用默认的 session.
  // partition  // 通过 session 的 partition 字符串来设置界面session. 如果 partition 以 persist:开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个partition. 如果没有 persist: 前缀, 页面将使用 in-memory session. 通过分配相同的 partition, 多个页可以共享同一会话。 默认使用默认的 session.
  // 设置后不还原 清除缓存 C:\Users\ta\AppData\Roaming
  zoomFactor: 1.0, // 页面内容放大倍数, 3.0 表示 300%。 默认值为 1.0.
  javascript: true, // 是否启用 JavaScript 支持。 默认值为 true
  // electron 12 之后 需要设置其为 false 才能在网页通过 window.require('electron')集成 Node 否则通过预加载脚本集成
  // 只能暴露方法，不能把 Api 直接暴露出去
  // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
  // 预加载脚本所运行的上下文环境只能访问其自身专用的文档和全局窗口，其自身一系列内置的JavaScript (Array, Object, JSON, 等等) 也是如此，这些对于已加载的内容都是不可见的。
  // Electron API 将只在预加载脚本中可用，在已加载页面中不可用。 这个选项应被用于加载可能不被信任的远程内容时来确保加载的内容无法篡改预加载脚本和任何正在使用的Electron api。
  // 该选项使用的是与Chrome内容脚本相同的技术。 你可以在开发者工具Console选项卡内顶部组合框中选择 'Electron Isolated Context'条目来访问这个上下文。
  // 隔离上下文 true 加载 preload.js false 关闭警告
  contextIsolation: true,
  webSecurity: false, // 取消跨域限制,如果此选项不是由开发者设置的，还会把 allowRunningInsecureContent设置为 true.
  allowRunningInsecureContent: true, // 允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins。
  images: true, // 允许加载图片
  imageAnimationPolicy: 'animate', // - 指定如何运行图像动画 (比如： GIF等).
  textAreasAreResizable: true, // 允许调整 TextArea 元素大小。
  webgl: true, // 启用 WebGL 支持
  plugins: true, // 是否应该启用插件。
  experimentalFeatures: true, // 启用 Chromium 的实验功能。 默认值为 false.

  // 为font-family用于设置 font-family 的默认字体。
  defaultFontFamily: {
    standard: 'Times New Roman', //  string (可选) - 默认值为 Times New Roman
    serif: 'Times New Roman', //  string (可选) - 默认值为 Times New Roman
    sansSerif: 'Arial', //  string (可选) - 默认值为 Arial
    monospace: 'Courier New', //  string (可选) - 默认值为 Courier New
    cursive: 'Script', //  string (可选) - 默认值为 Script
    fantasy: 'Impact', //  string (可选) - 默认值为 Impact
  },

  defaultFontSize: 16, //  Integer (可选) - 默认值为 16.
  defaultMonospaceFontSize: 13, // Integer (可选) - 默认值为 13.
  minimumFontSize: 0, // 默认值为 0.
  defaultEncoding: 'ISO-8859-1', // 默认值为 ISO-8859-1
  backgroundThrottling: true, // 是否在页面成为背景时限制动画和计时器。
  offscreen: false, // 是否绘制和渲染可视区域外的窗口. 默认值为 false

  webviewTag: true, // 是否启用 <webview> tag标签. 默认值为 false. 注意: 为 < webview> 配置的 preload 脚本在执行时将启用node集成, 因此应确保远程或不受信任的内容无法创建恶意的 preload 脚本 。 可以使用 webContents 上的 will-attach-webview 事件对 preload 脚本进行剥离, 并验证或更改 <webview> 的初始设置。
  additionalArguments: process.argv, //  一个将被附加到当前应用程序的渲染器进程中process.argv的字符串列表 。 可用于将少量的数据传递到渲染器进程预加载脚本中。
  safeDialogs: false, // 否启用浏览器样式的持续对话框保护。 默认值为 false.
  disableDialogs: false, // 是否完全禁用对话框。 覆盖 safeDialogs。 默认值为 false.
  safeDialogsMessage: '浏览器样式的持续对话框保护(持续触发)', // 当持续对话框保护被触发时显示的消息。 如果没有定义,就使用默认值
  navigateOnDragDrop: false, //  将文件或链接拖放到页面上时是否触发页面跳转。 默认值为 false.
  autoplayPolicy: 'no-user-gesture-required', // 窗口中内容要使用的自动播放策略，值可以是 no-user-gesture-required, user-gesture-required, document-user-activation-required。 默认为 no-user-gesture-required
  disableHtmlFullscreenWindowResize: false, // 是否阻止窗口在进入 HTML 全屏时调整大小。 默认值为 false.
  spellcheck: true, // 是否启用内置拼写检查器。 默认值为 true。
  enableWebSQL: true, // 是否启用 WebSQL api。 默认值为 true
  v8CacheOptions: 'code', // 强制 blink 使用 v8 代码缓存策略。 可接受的值为 none - 禁用代码缓存  code - 基于启发式代码缓存  bypassHeatCheck - 绕过启发式代码缓存，但使用懒编译  bypassHeatCheckAndEagerCompile - 与上面相同，除了编译是及时的。 默认策略是 code。
  // 是否启用第一屏大小模式。 首选大小是包含文档布局所需的最小大小--无需滚动内容。
  // 启用该属性将导致在第一屏大小发生变化时，在WebContents 上触发 preferred-size-changed 事件。 默认值为 false.
  enablePreferredSizeMode: false,

  // Mac 配置
  scrollBounce: true, // 在 macOS 启用弹力动画 (橡皮筋) 效果。

  // accessibleTitle: // - 仅提供给如屏幕读取器等辅助工具的替代标题字符串
  // enableBlinkFeatures: // string(可选) - 以逗号分隔的需要启用的特性列表，譬如CSSVariables,KeyboardEventKey 在 RuntimeEnabledFeatures.json5文件中查看被支持的所有特性.
  // disableBlinkFeatures  // string (可选) - 以 ,分隔的禁用特性列表, 如 CSSVariables,KeyboardEventKey. 在RuntimeEnabledFeatures.json5 文件中查看被支持的所有特性.
};

const browserWindowProp: BrowserWindowConstructorOptions = {
  show: true, // 是否启动时展示
  // 当show为false并且渲染器刚刚被创建时，它是否应激活。 为了让document.visibilityState 在show: false的情况下第一次加载时正确地工作，你应该把这个设置成false. 设置为 false 将会导致ready-to-show 事件不触发。 默认值为 true。
  paintWhenInitiallyHidden: true,
  // frame: false, // false:让桌面应用没有边框，这样菜单栏也会消失
  // transparent: true, // 无边框下生效 , windows 下为让边框变为直角
  // backgroundColor: "#ffffff", // 设置应用背景色,配合无边框、transparent 可通过 css 设置不一样的外形
  parent: undefined, // 指定父窗口 默认值为 null.
  disableAutoHideCursor: false, // 是否在打字时隐藏光标。 默认值为 false
  // type: "", // 选项的候选值和行为与平台相关。 可能的值有 在 Linux 上, 可能的类型有 desktop、dock、toolbar、splash、notification。 在 Windows 上, 可能的类型为 toolbar. 在 macOS 上，可能的类型是 desktop, textured。 textured 类型增加金属色泽的外观 (NSTexturedBackgroundWindowMask). desktop 类型将窗口置于桌面背景级别 (kCGDesktopWindowLevel - 1). 注意，桌面窗口不会接收焦点、键盘或鼠标事件，但您可以使用< 0> globalShortcut < /0 >接收快捷键的消息

  resizable: true, // 是否用户改变窗口大小
  movable: true, // 窗口是否可移动 默认为true Linux上未实现
  minimizable: true, // 窗口是否可最小化 默认为true Linux上未实现
  maximizable: true, // 窗口是否可最大化 默认为true Linux上未实现
  closable: true, // 窗口是否可关闭 默认为true Linux上未实现

  icon: iconPath('icon.png'), // 应用运行时的标题栏图标及 Windows 任务栏图标,默认使用可执行文件的图标.
  alwaysOnTop: false, // 窗口是否永远在别的窗口的上面。 默认值为 false.
  center: true, // 是否居中
  // x:0, 相对于屏幕左侧偏移量
  // y:0, 相对于屏幕顶部偏移量
  useContentSize: false, // width 和 height 将设置为 web 页面的尺寸 (不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false.
  width: 1024,
  height: 728,
  // 当使用 minWidth/maxWidth/minHeight/maxHeight 设置最小或最大窗口大小时, 它只限制用户。 它不会阻止您将不符合大小限制的值传递给 setBounds/setSize 或 BrowserWindow 的构造函数。
  // minWidth: 300, // 最小宽度
  // minHeight: 500, // 最小高度
  // maxWidth: 1600, // 最大宽度
  // maxHeight: 900, // 最大高度

  // 窗口属性
  fullscreen: false, // 全屏
  skipTaskbar: false, // 是否在任务栏中显示窗口。 默认值为 false。
  focusable: true, // 窗口是否可以聚焦. 默认值为 true。 在 Windows 中设置 focusable: false 也意味着设置了skipTaskbar: true. 在 Linux 中设置 focusable: false 时窗口停止与 wm 交互, 并且窗口将始终置顶
  kiosk: false, // 窗口是否进入 kiosk 模式。 默认值为 false.
  modal: false, // 当前是否为模态窗口。 只有当窗口是子窗口时才起作用。 默认值为 false.
  autoHideMenuBar: false, // 自动隐藏菜单栏，除非按了Alt键。 默认值为 false.
  hasShadow: true, // 窗口是否有阴影. 默认值为 true
  opacity: 1, // 仅支持Windows 和 macos，设置窗口整体的不透明度, 0.0 - 1.0
  // followWindow 当窗口处于激活状态时，后台应自动显示为激活状态，当窗口处于非激活状态时，后台应自动显示为非激活状态
  // active - 后台应一直显示为激活状态。
  // inactive - 后台应一直显示为非激活状态。
  // 鼠标点击别的地方时，窗口是否有内容
  visualEffectState: 'followWindow',
  // hiddenInset hidden 设置 Mac 窗口只有左上角的最大化、关闭、缩小
  // hidden 对于 windows 会隐藏窗口和最大化、关闭、缩小，需要搭配 titleBarOverlay 的 color 使最大化、关闭、缩小功能展示
  titleBarStyle: 'hidden', // default - 分别返回 macOS 或者 Windows 的标准标题栏  hiddenInset - 隐藏标题栏, 显示小的控制按钮在窗口边缘 ,hidden - 在一个隐藏的标题栏和一个全尺寸大小的内容窗口中取得结果。 在 macOS 内, 窗口将一直拥有位于左上的标准窗口控制器 (“traffic lights”)。 在 Windows上，当与 titleBarOverlay: true 合并时，它将激活窗口控件叠加(详情请参阅 titleBarOverlay)，否则将不会显示窗口控件。
  //  Object | Boolean (可选) 默认值为 false
  // 在 macOS 使用无框窗口结合 win.setWindowButtonVisibility(true) 或使用 titleBarStyle 以便标准窗口控制 (在 macOS为 "traffic lights") 可见，
  // 此属性将启用 Window Controls Overlay JavaScript APIs 和 CSS Environment Variables. 指定 true 将导致覆盖默认系统颜色。
  // color String (可选) Windows - 放大缩小关闭控件的颜色背景颜色 默认是系统颜色。
  // symbolColor String (可选) Windows - 放大缩小关闭控件的颜色
  // height Integer (可选) macOS Windows - 标题栏和 Window Controls Overlay，以像素为单位。 默认值为系统高度 (放大缩小关闭控件的高度)
  titleBarOverlay: { color: '#eeeeee', symbolColor: '#000000', height: 5 },
  thickFrame: true, // 对 Windows 上的无框窗口使用WS_THICKFRAME 样式，会增加标准窗口框架。 设置为 false 时将移除窗口的阴影和动画.
  darkTheme: false, //  强制窗口使用深色主题，只在部分GTK+3桌面环境下有效。 默认值为 false.

  // Mac 独有配置
  trafficLightPosition: { x: 10, y: 10 }, //  Point 对象 设置 Mac (交通灯)控制按钮在无边框窗口中的位置。
  roundedCorners: true, // 无框窗口是否应该在 macOS 上 圆角。 默认值为 true。
  fullscreenable: true, //  窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 true。
  simpleFullscreen: false, // 在 macOS 上使用 pre-Lion 全屏。 默认值为 false.
  acceptFirstMouse: false, // 单击非活动窗口是否同时触发点击进入里面的网页内容 在 macOS 默认 false。 此选项在其他平台上不可配置。
  enableLargerThanScreen: false, // 是否允许改变窗口的大小使之大于屏幕的尺寸. 仅适用于 macOS，因为其它操作系统默认允许 大于屏幕的窗口。 默认值为 false.
  vibrancy: 'window', //  窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. 可选值为 appearance-based, light, dark, titlebar, selection, menu, popover, sidebar, medium-light, ultra-dark, header, sheet, window, hud, fullscreen-ui, tooltip, content, under-window 或 under-page。 请注意： appearance-based, light, dark, medium-light, and ultra-dark 已被弃用，并将在即将推出的 macOS Catalina (10.15版本) 中被移除。
  tabbingIdentifier: '图片压缩', // 选项组卡的名称，在macOS 10.12+上可使窗口在原生选项卡中打开. 具有相同标识符的窗口将被组合在一起。 这还会在窗口的标签栏中添加一个原生的新选项卡按钮, 并允许 app 和窗口接收 new-window-for-tab 事件。
  zoomToPageWidth: false, // 控制 macOS 上，当选择性单击工具栏上的绿色stoplight按钮或单击 Window > Zoom menu item时的行为。 如果为 true, 窗口将放大到网页的本身宽度, false 将使其缩放到屏幕的宽度。 这也会影响直接调用 maximize() 时的行为。

  webPreferences,
};

export default browserWindowProp;

// 文章：https://juejin.cn/post/7054540026700365855
// 文章：https://cloud.tencent.com/developer/article/2136456
import { app, crashReporter } from 'electron'
import { ElectronPath } from '@/main/constant/path'

// 本机（MacBook Pro）上 Electron 的路径：/usr/local/lib/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron
// 本机 Electron 数据文件路径：/Users/bianchengsanmei/Library/Application Support/Electron
// 本地 dump_sysm 路径：/Users/bianchengsanmei/Library/Developer/Xcode/DerivedData/Breakpad-ebqwamwdejfpicartmwratdgdbnc/Build/Products/Release/dump_syms
// minidumps_stackwalk 路径 /Users/bianchengsanmei/Public/CODE/google_breakpad/breakpad/src/processor/minidump_stackwalk

// google_breakpad
// git clone https://github.com/google/breakpad.git
// 编译 google_breakpad ./configure && make
// 安装构建的库 make install

// 解析 dump 文件
// 直接打开查看 dump 文件，为 16 进制数据
// 需要把该文件转换为可读、可分析的文件，使用工具为 google_breakpad 中的 minidumps_stackwalk
// 命令：/Users/bianchengsanmei/Public/CODE/google_breakpad/breakpad/src/processor/minidump_stackwalk ./crash/test.dump > ./crash/test.info
// Crash reason ,是导致崩溃的原因描述。

export const initCrashReporter = () => {
  app.setPath('crashDumps', ElectronPath.log)

  crashReporter.start({
    productName: '产品名字',
    uploadToServer: false,
    ignoreSystemCrashHandler: false // 不忽略系统自带的奔溃处理，为 true 时表示忽略，奔溃时不会生成奔溃堆栈文件
  })

  // 日志中添加额外信息
  // 在主进程中添加extra参数，这些参数将不会与渲染器或其它子进程的崩溃报告一起发送。 同样，在渲染器进程中添加的extra参数不会与其它渲染器进程或主进程中发生的崩溃一起发送。
  crashReporter.addExtraParameter('info', 'params')
}

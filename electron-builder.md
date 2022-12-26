## 安装程序协议配置

https://zhuanlan.zhihu.com/p/466273067
https://zhuanlan.zhihu.com/p/461247573

## 打包
1. `electron-builder build -c electron-builder.yml --publish never` 命令默认打包平台是当前电脑的环境
2. 指定当前环境打包其他环境添加命令 `electron-builder build -mwl -c electron-builder.yml --publish never`
   m: mac w: win l:linux
3. [如果你的应用程序有原生依赖，它只能在目标平台上编译，除非不使用预构建。](https://www.electron.build/multi-platform-build)
   预构建是一种解决方案，但大多数节点模块不提供预构建的二进制文件。
   macOS 代码签名仅适用于 macOS

### 默认协议

1. 在 directories/buildResources 设置的目录下创建 license.txt 文件，并写下协议内容(这个是默认的协议)
2. 文件编码：windows 可以设置为 `ANSI`，但是 mac 不支持 `ANSI` ，所以设置为 `带有 BOM 的 UTF-8` 编码
3. 关于语言代码官网给出的参考是 [language code to name](https://github.com/meikidd/iso-639-1/blob/master/src/data.js)
4. 注意：如果不设置 `displayLanguageSelector: true`，那么安装程序会寻找 license.txt 或者当前安装程序语言对应的协议.txt 文件

### 多语言协议

1. nisi 下设置 `displayLanguageSelector: true`
2. 在 directories/buildResources 设置的目录下创建 license_en.txt 和 license_zh_CN.txt 文件

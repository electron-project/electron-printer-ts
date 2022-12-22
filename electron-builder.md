## 安装程序协议配置

### 默认协议

1. 在 directories/buildResources 设置的目录下创建 license.txt 文件，并写下协议内容(这个是默认的协议)
2. 文件编码：windows 可以设置为 `ANSI`，但是 mac 不支持 `ANSI` ，所以设置为 `带有 BOM 的 UTF-8` 编码
3. 关于语言代码官网给出的参考是 [language code to name](https://github.com/meikidd/iso-639-1/blob/master/src/data.js)
4. 注意：如果不设置 `displayLanguageSelector: true`，那么安装程序会寻找 license.txt 或者当前安装程序语言对应的协议.txt 文件

### 多语言协议

1. nisi 下设置 `displayLanguageSelector: true`
2. 在 directories/buildResources 设置的目录下创建 license_en.txt 和 license_zh_CN.txt 文件

import path from 'path'
import process from 'process'

const getProgramExecParams = () => {
  const devPath = process.cwd()

  return [
    // 在开发阶段，我们是通过 electron . 或者 electron path/to/script.js 来启动的应用，
    // 所以 正常 electron 版本(非魔改)的 process.argv[1] 是我们的脚本路径，传给系统时，这个参数也不能少
    // 魔改的就是启动这个 electron main 进程的命令
    '-r',
    path.resolve(devPath, 'script/url-scheme-dev'),
    path.resolve(devPath),

    // 此处有一个安全漏洞，加一个 `--` 以确保后面的参数不被 Electron 处理，https://www.nsfocus.com.cn/html/2018/39_0125/732.html
    '--'
  ]
}

export default getProgramExecParams

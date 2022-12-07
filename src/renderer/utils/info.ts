const getSystemInfo = () => {
  console.log('getCPUUsage', process.getCPUUsage())
  // 获取环境参数
  console.log('env', process.env)
  // 获取windows系统位数
  console.log('arch', process.arch)
  // 获取系统版本
  console.log('SystemVersion', process.getSystemVersion())
  // 获取 electron 版本
  console.log('version', process.version)
}

export default getSystemInfo

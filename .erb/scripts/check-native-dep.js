import fs from 'fs'
import chalk from 'chalk'
import { execSync } from 'child_process'
import { dependencies } from '../../package.json'

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies)
  const nativeDeps = fs.readdirSync('node_modules').filter((folder) => {
    fs.existsSync(`node_modules/${folder}/binding.gyp`)
  })

  if (nativeDeps.length === 0) {
    process.exit(0)
  }

  try {
    // 如果已安装,查找安装依赖项的原因。
    // 因为一个开发依赖关系，那没关系。安装时发出警告
    // because of a dependency
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString()
    )

    const rootDependencies = Object.keys(dependenciesObject)
    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      dependenciesKeys.includes(rootDependency)
    )
    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1

      console.log(chalk.whiteBright.bgYellow.bold('Webpack不能与本机依赖项一起工作.'))
      console.log(chalk.bold(filteredRootDependencies.join(', ')))
      console.log(
        plural ? '是原生依赖' : '是本机依赖项',
        '并且应该安装在 "./release/app" 文件夹中.\n 首先, 从 "./package.json":卸载 the packages '
      )
      console.log(chalk.whiteBright.bgGreen.bold('npm uninstall your-package'))
      console.log(chalk.bold('然后，不是将包安装到根目录"./package.json":'))
      console.log(chalk.whiteBright.bgRed.bold('npm install your-package'))
      console.log(chalk.bold('安装依赖去 "./release/app/package.json"'))
      console.log(chalk.whiteBright.bgGreen.bold('cd ./release/app && npm install your-package'))
      console.log(
        '在以下位置阅读有关本机依赖项的更多信息:\n',
        chalk.bold('https://electron-react-boilerplate.js.org/docs/adding-dependencies/#module-structure')
      )

      process.exit(1)
    }
  } catch (e) {
    console.log('Native dependencies could not be checked')
  }
}

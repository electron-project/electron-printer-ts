import fs from 'fs'
import path from 'path'
import webpackPaths from '../configs/webpack.paths'

fs.promises.cp(path.resolve(webpackPaths.assetsPath, 'copy'), path.resolve(webpackPaths.appPath,'copy'), { recursive: true })

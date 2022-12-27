const ts_node = require('ts-node')
const path = require('path')
const old = process.cwd

// const basePath = path.resolve('C:\\Users\\h\\Desktop\\print-project\\electron-printer')
const basePath = path.resolve('D:\\soft-dev\\code\\web\\frame\\React\\electron-printer')

process.cwd = () => basePath

ts_node.register({
  transpileOnly: true,
  pretty: true,

  files: true,
  cwd: basePath,
  dir: basePath,

  projectSearchDir: basePath,
  project: path.join(basePath, 'tsconfig.json'),
  require: [path.join(basePath, 'node_modules', 'tsconfig-paths/register')],
})

process.cwd = old

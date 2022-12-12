// electron-store 存储 json 插件 ，可通过 app.getPath("userData") 获取应用存储路径

// https://juejin.cn/post/6844903966568873992#heading-18
// 数据持久化可选的方案有很多，比如 electron-store等基于 JSON 文件实现的存储方案。对于更复杂的应用场景还可以使用 lowdb，nedb ，sqlite等。
import { app } from 'electron'
import Store from 'electron-store'
import ElectronStore from 'electron-store'

app.getPath('userData')

let electronStore: null | ElectronStore = null

export const initStore = () => {
  // Renderer 进程中使用需要开启 node 集成，并且 new store 实例，用 require 引入
  Store.initRenderer()
  electronStore = new Store()
}

export const getElectronStore = () => electronStore

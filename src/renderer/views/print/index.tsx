import styles from './index.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import WebviewTag = Electron.WebviewTag
import PrinterInfo = Electron.PrinterInfo
import IpcMessageEvent = Electron.IpcMessageEvent
const ipcRenderer = window.require('electron').ipcRenderer

const Print = () => {
  const containerClass = `${styles['print']} ${'print' || ''}`

  const webviewRef = useRef<WebviewTag | null>(null)
  const [printList, setPrintList] = useState<PrinterInfo[]>([])

  useEffect(() => {
    ipcRenderer.send('ipc-printer-getList')

    ipcRenderer.once('ipc-printer-getList', (event, list: unknown) => {
      if (Array.isArray(list)) {
        console.log(list)
        setPrintList(list)
      }
    })

    initWebView()
  }, [])

  const initWebView = () => {
    const webview: WebviewTag | null = webviewRef.current

    webview?.addEventListener('ipc-message', (event: IpcMessageEvent) => {
      if (event.channel === 'webview-start-print') {
        // 如果收到<webview>传过来的事件，名为"webview-print-do"，就执行 webview.print打印方法，打印<webview>里面的内容。
        webview.print({
          // 是否是静默打印
          silent: true,
          printBackground: false,
          // 打印机的名称
          deviceName: 'Microsoft Print to PDF',
        })
      }
    })

    webview?.addEventListener('console-message', (e) => {
      console.log('%cWebview 中控制台信息:\r\n', 'color:red', e.message)
    })
  }

  const startPrint = () => {
    const data = {
      batchNo: '1',
      pn: '2',
    }

    webviewRef.current?.send('webview-set-html', data)
  }

  return (
    <div className={containerClass}>
      <div onClick={startPrint}>开始打印</div>

      {printList.map((p, pIndex) => {
        return (
          <Fragment key={pIndex}>
            <div>名字：{p.name}</div>
            <div>是否是默认：{p.isDefault.toString()}</div>
          </Fragment>
        )
      })}

      {/* printWindow.loadFile('xx.html'); */}
      {/* 也可以使用 mainWindow.webContents.print 进行打印 */}
      {/* https://www.jianshu.com/p/0de0d17106a9 */}
      <webview
        ref={webviewRef}
        id="printWebview"
        src={'D:\\soft-dev\\code\\web\\frame\\React\\electron-printer\\assets\\html\\print\\index.html'}
        // 用于打印的属性
        //@ts-ignore
        // 需要在窗口设置中及 webview 中都设置 nodeintegration webpreferences
        nodeintegration={1} // 是为了让webview访问的页面具有Node集成, 并且可以使用像 require 和 process 这样的node APIs 去访问低层系统资源
        webpreferences={'contextIsolation=no'} // 也是同样的目的，为了在index.html中使用require。
      />
    </div>
  )
}

Print.defaultProps = {
  className: '',
}

export default Print

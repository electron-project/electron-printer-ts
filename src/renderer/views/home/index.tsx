const Hello = () => {
  window.electron.ipcRenderer.getPrinterList('ipc-printer-getList')

  window.electron.ipcRenderer.once('ipc-printer-getList', (printList) => {
    console.log(printList)

    // 执行渲染
    // document.getElementById('bd').innerHTML = info.html;
    // ipcRenderer.sendToHost('webview-print-do')
  })

  return (
    <div>
      <webview
        id="printWebview"
        src="fullPath"
        style={{ width: '80mm', visibility: 'hidden' }}
        // 用于打印的属性
        nodeintegration // 是为了让webview访问的页面具有Node集成, 并且可以使用像 require 和 process 这样的node APIs 去访问低层系统资源
        webpreferences="contextIsolation=no" // 也是同样的目的，为了在index.html中使用require。
      ></webview>
    </div>
  )
}

export default Hello

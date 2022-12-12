window.onload = () => {
  const { ipcRenderer } = require('electron')
  const qrcode = require('qrcode')

  // ★★★★★★因为打印机的大小未做调整，搞了好久没搞好，需要到系统里面设置打印机的纸张大小★★★★★★
  //引入ipcRenderer对象
  // const JsBarcode = require('jsbarcode');
  //监听渲染线程传过来的webview-print-render事件
  ipcRenderer.on('WEBVIEW_SET_HTML', (event, data) => {
    qrcode.toDataURL(data.link, { margin: 0 }, function (error, url) {
      const qr = document.getElementById('qrcode')
      qr.setAttribute('src', url)
    })

    const name = document.querySelector('.name')
    name.innerHTML = name.innerHTML.replace('{{name}}', data.name)

    const code = document.querySelector('.code')
    code.innerHTML = code.innerHTML.replace('{{code}}', data.code)

    const category = document.querySelector('.category')
    category.innerHTML = category.innerHTML.replace('{{category}}', data.categoryName)

    // 替换占位符
    // let html = document.getElementsByClassName('title')[0].innerHTML
    // html = html.replace('{{title}}', data.categoryName)
    //
    // //var obj = document.getElementById('bd')
    // document.getElementsByClassName('content')[0].innerHTML = html
    //通过ipcRenderer对象的sendToHost方法和渲染线程通讯，告诉渲染线程打印的内容已经准备完毕
    ipcRenderer.sendToHost('WEBVIEW_START_PRINT')
  })
}

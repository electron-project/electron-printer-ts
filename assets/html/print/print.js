window.onload = () => {
  const { ipcRenderer } = require('electron')
  const qrcode = require('qrcode')


  qrcode.toDataURL( 'sample text', {margin:0},function (error,url) {
   const qr =  document.getElementById('qrcode')
    qr.setAttribute('src',url)
    console.log(url);
  })

  // ★★★★★★因为打印机的大小未做调整，搞了好久没搞好，需要到系统里面设置打印机的纸张大小★★★★★★
  //引入ipcRenderer对象
  // const JsBarcode = require('jsbarcode');
  //监听渲染线程传过来的webview-print-render事件
  ipcRenderer.on('webview-set-html', (event, data) => {
    // const width = data.barCode.length > 14 ? 1 : 2
    // 生成条形码
    // JsBarcode('#barCode', data.barCode, {
    //   width: width,//条形码中每条线的宽度
    //   height: 100,//条形码高度
    //   displayValue: false//条形码下面是否显示对应的值
    // });
    // 替换占位符
    let html = document.getElementsByClassName('content')[0].innerHTML
    html = html.replace('{{batchNo}}', data.batchNo)
    html = html.replace('{{pn}}', data.pn)
    html = html.replace('{{specifications}}', data.specifications)
    html = html.replace('{{quantity}}', data.quantity)
    html = html.replace('{{date}}', data.date)
    html = html.replace('{{employee}}', data.employee)
    html = html.replace('{{barCode}}', data.barCode)
    //var obj = document.getElementById('bd')
    document.getElementsByClassName('content')[0].innerHTML = html
    //通过ipcRenderer对象的sendToHost方法和渲染线程通讯，告诉渲染线程打印的内容已经准备完毕
    ipcRenderer.sendToHost('webview-start-print')
  })
}

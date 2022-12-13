window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron')
  const qrcode = require('qrcode')

  ipcRenderer.on('WEBVIEW_SET_HTML', (event, data) => {
    qrcode.toDataURL(data.link || '', { margin: 0 }, function (error, url) {
      const qr = document.getElementById('qrcode')
      qr.setAttribute('src', url)
      const name = document.querySelector('.name')
      name.innerHTML = name.innerHTML.replace('{{name}}', data.name || '')
  
      const code = document.querySelector('.code')
      code.innerHTML = code.innerHTML.replace('{{code}}', data.code || '')
  
      const category = document.querySelector('.category')
      category.innerHTML = category.innerHTML.replace('{{category}}', data.categoryName || '')
  
      ipcRenderer.sendToHost('WEBVIEW_START_PRINT')
    })

  })
})

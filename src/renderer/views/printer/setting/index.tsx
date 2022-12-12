import styles from './index.module.scss'
import { Button, message, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'

const PrintSetting = ({ className }: any) => {
  const ipcRenderer = window.electron.ipcRenderer
  const containerClass = `${styles['print-setting']} ${className || ''}`
  const sureDeviceRef = useRef<string>('')
  const [messageApi, contextHolder] = message.useMessage()

  const [printList, setPrintList] = useState<any[]>([])

  useEffect(() => {
    ipcRenderer.on('SETTING_LIST', (args: any) => {
      const arr: any = []
      args.map((item: any) => {
        arr.push({ label: item.name, value: item.name })
      })
      setPrintList(arr)
    })
    return () => {}
  }, [])

  const change = (v: string) => {
    sureDeviceRef.current = v
  }

  const sure = async () => {
    if (!sureDeviceRef.current) {
      await messageApi.warning('请选择设备')
      return
    }

    ipcRenderer.send('PRINTER_SURE_DEVICE', sureDeviceRef.current)
  }

  return (
    <div className={containerClass}>
      <Select className={styles.select} defaultValue="请选择打印机" onChange={change} options={printList} />

      {contextHolder}
      <Button className={styles.button} type="primary" onClick={sure}>
        确定
      </Button>
    </div>
  )
}

PrintSetting.defaultProps = {
  className: '',
}

export default PrintSetting

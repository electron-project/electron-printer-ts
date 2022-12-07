import { PrinterChannels } from '@/typings/channel'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(channel: string, func: (...args: unknown[]) => void): (() => void) | undefined
        once(channel: string, func: (...args: unknown[]) => void): void
        send(channel: string, ...args: unknown[]): void
      }
    }
  }
}

export {}

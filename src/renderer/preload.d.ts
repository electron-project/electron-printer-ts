import { Channels, PrinterChannels } from '@/type/channel';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;

        sendMessage(channel: Channels, args: unknown[]): void;
        getPrinterList(channel: PrinterChannels, args?: any): void;
      };
    };
  }
}

export {};

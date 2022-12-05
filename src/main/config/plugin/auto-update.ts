import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify().then();
  }
}

export default AppUpdater;

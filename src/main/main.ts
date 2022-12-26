import { isDev } from '@/main/constant/env'
import { initCrashReporter } from '@/main/utils/log'
import '@/main/window/app/app'

initCrashReporter()

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (isDev) {
  require('electron-debug')()
}

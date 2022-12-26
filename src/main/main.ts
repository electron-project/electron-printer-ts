import { isDev } from '@/constant/env'
import '@/main/window/app/app'
import { initCrashReporter } from '@/main/utils/log'

initCrashReporter()

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (isDev) {
  require('electron-debug')()
}

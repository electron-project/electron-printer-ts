# setAsDefaultProtocolClient 会在用户启动应用后，在主进程中进行注册操作，之后web端即可唤起应用。
# 但是如果用户是第一次安装，并没有打开过app，仍然需要通过deeplink唤起的话，
# 可以通过 nsis 去进行应用的安装和卸载的相关配置，在应用安装和卸载的时候进行注册

# 会在文件安装后自动调用（electron-builder实现）
!macro customInstall
  DetailPrint "Register printapp URI Handler" # DetailPrint 执行打印
  DeleteRegKey HKCR "printapp" # 删除注册表
  WriteRegStr HKCR "printapp" "" "URL:printapp"
  WriteRegStr HKCR "printapp" "URL Protocol" ""
  WriteRegStr HKCR "printapp\shell" "" ""
  WriteRegStr HKCR "printapp\shell\Open" "" ""
  WriteRegStr HKCR "printapp\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1" # $INSTDIR是所选的文件安装路径
!macroend

# 自定义卸载
!macro customUnInstall
  DeleteRegKey HKCR "printapp"
!macroend

!macro customHeader
  !system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader"
!macroend

!macro preInit
  ; This macro is inserted at the beginning of the NSIS .OnInit callback
  !system "echo '' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend

!macro customInit
  !system "echo '' > ${BUILD_RESOURCES_DIR}/customInit"
!macroend

!macro customInstallMode
  # set $isForceMachineInstall or $isForceCurrentInstall
  # to enforce one or the other modes.
!macroend

import { ElectronPath } from '@/main/constant/path'

const toastXmlString = `
      <toast>
        <audio silent='false' />
        <visual>
          <!--  template ToastImageAndText01 || ToastGeneric-->
          <!--          <binding template='ToastGeneric'>-->
          <!--            <group>-->
          <!--              <subgroup>-->
          <!--                  <text hint-style="base">分组1</text>-->
          <!--                  <text hint-style="captionSubtle">分组2</text>-->
          <!--              </subgroup>-->
          <!--              <subgroup>-->
          <!--                  <text hint-style="captionSubtle" hint-align="right">分组1 子</text>-->
          <!--                  <text hint-style="captionSubtle" hint-align="right">分组2 子</text>-->
          <!--              </subgroup>-->
          <!--            </group>-->

          <binding template='ToastImageAndText01'>
              <image id='1' src='${ElectronPath.icon}' alt='img'/>
              <text id='1'>标签</text>
              <text placement='attribution'>打印机开始打印</text>
          </binding>
        </visual>

        <actions>
          <input id="textBox" type="text" placeHolderContent="一个回复类型"/>
          <action
            content="发送"
            arguments="action=reply&amp;convId=01"
            activationType="background"
            hint-inputId="textBox"/>

          <action
           content="打开 deeplink"
           arguments="printapp:action=viewDetails&amp;contentId=351"
           activationType="protocol"/>
        </actions>
      </toast>
`

export default toastXmlString

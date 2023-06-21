import { createApp } from 'vue'
import App from '@/App.vue'

import ElementPlus from 'element-plus'

//@ts-ignore
import zhcn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
//获取应用实例对象

const app = createApp(App)

//安装element-plus插件
app.use(ElementPlus, {
  locale: zhcn, //设置国际化
})

console.log(import.meta.env)
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon',SvgIcon)
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
app.use(globalComponent)

// 引入模板的全局样式
import '@/styles/index.scss'

// 测试代码，测试假的接口能否使用

import axios from 'axios'

// 登录接口
axios({
  url: '/api/user/login', // 请求地址
  method: 'post', // 请求方式
  data: {
    username: 'admin',
    password: '111111',
  },
})

//将应用挂载到挂载点上
app.mount('#app')

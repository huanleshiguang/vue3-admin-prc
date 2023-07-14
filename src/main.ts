/*
 * @Descripttion:
 * @version:
 * @Author: Zhou Hao
 * @Date: 2023-06-12 21:40:52
 * @LastEditors: ZhouHao
 * @LastEditTime: 2023-07-14 22:31:58
 */
import { createApp } from 'vue'
import App from '@/App.vue'
// 引入模板的全局样式
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import globalComponent from '@/components'
//@ts-ignore
import zhcn from 'element-plus/dist/locale/zh-cn.mjs'
//引入路由
import router from './router'
import pinia from './store'
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
// 引入自定义插件对象：注册整个项目的全局组件-
// 安装仓库pinia
app.use(pinia)
app.use(globalComponent)
//注册模板路由
app.use(router)

//将应用挂载到挂载点上
app.mount('#app')

/*
 * @Descripttion:
 * @version:
 * @Author: Zhou Hao
 * @Date: 2023-07-09 13:51:15
 * @LastEditors: Zhou Hao
 * @LastEditTime: 2023-07-09 14:38:17
 */
// 通过vue-router插件实现模板路由配置

import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
// 创建路由器
let router = createRouter({
  // 路由模式 hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

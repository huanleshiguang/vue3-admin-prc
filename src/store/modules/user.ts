/*
 * @Author: ZhouHao
 * @Date: 2023-07-14 22:33:32
 * @LastEditors: ZhouHao
 * @LastEditTime: 2023-07-19 22:49:05
 * @Descripttion:
 */
// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具文件
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  // 小仓库（存储数据）
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //存储用户的唯一标识token
    }
  },
  // 异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      // success 200=>token
      if (result.code === 200) {
        // 成功了，通过pinia仓库存储一下token
        // 由于pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string | null
        SET_TOKEN(result.data.token as string)
        // 这样可以保证当前async(userLogin)函数返回一个成功的Promise
        return 'ok' // 返回一个成功的promise
      } else {
        return Promise.reject(new Error(result.data.message))
      }
      // error 201=>error.message
    },
  },
  getters: {},
})

// 对外暴露获取小仓库的方法

export default useUserStore

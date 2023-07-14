// 统一管理用户相关的接口

import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'

//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 对外暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request<any, loginResponseData>({ url: '/user/login', method: 'post', data })

//获取用户信息接口方法
export const reqUserInfo = () =>
  request<any, userResponseData>({ url: '/user/info', method: 'get' })

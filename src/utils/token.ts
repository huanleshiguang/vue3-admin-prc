/*
 * @Author: ZhouHao
 * @Date: 2023-07-19 21:40:25
 * @LastEditors: ZhouHao
 * @LastEditTime: 2023-07-19 21:45:56
 * @Descripttion: 封装本地存储数据和读取数据方法
 */

// 本地存储 存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 本地存储 获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
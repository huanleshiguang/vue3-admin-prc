/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-18 12:11:32
 * @LastEditors: ZhouHao
 * @LastEditTime: 2023-07-19 22:45:49
 */
// 二次封装axios
import axios from 'axios'

/* 
 error: Module '"element-plus"' has no exported member 'ElMessage'
 solution: ts配置文件中将 "moduleResolution": "bundler" 改为  "moduleResolution": "node"
*/
import { ElMessage } from 'element-plus'
// import useUserStore from '@/store/modules/user'
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use(
  //config配置对象有一个header属性请求头，经常给服务端携带公共参数
  (config) => {
    // let userStore = useUserStore()

    // if (userStore.token) {
    //   config.headers.token = userStore.token
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    console.log(response, 'response')

    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        message = '未登录'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.data.message
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
console.log(request, 'request')
export default request

/* 

new Promise((resolve, reject) => {
  reject(new Error("出错了"))
})

//等价于
Promise.reject(new Error("出错了")) 

*/

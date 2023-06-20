//引入项目中所有的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

// 全局对象
const allGlobalComponent = { SvgIcon, Pagination }

// 对外暴露一个插件对象
export default {
  // 务必叫做install方法, 不然不会自动执行
  install(app) {
    // console.log('components/intex.ts install()', app)
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((item) => {
      app.component(item, allGlobalComponent[item])
    })
  },
}

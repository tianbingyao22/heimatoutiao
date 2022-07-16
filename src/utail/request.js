import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.create()=>axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 由于该案例中多处使用到headertoken参数，因此在拦截器中给每个请求都加上token参数
// 请求拦截器
request.interceptors.request.use(
  // // config 本次请求的配置
  // (config) => {
  //   console.log(config)
  //   return config
  //   // 在拦截器中一定要把配置config返回回去
  // },
  // // 请求错误时处理的方法
  // (error) => {
  //   return Promise.reject(error)
  // }
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request

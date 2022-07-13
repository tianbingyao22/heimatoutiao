import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.create()=>axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
export default request

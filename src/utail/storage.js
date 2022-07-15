// 封装本地存储token
// 类  封装 继承 多态
class Storage {
  // 存储token   localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify(payload))
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  // 获取token  JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}
  get(key) {
    const value = localStorage.getItem(key)
    try {
      // 当本地存储的不是需要JSON.parse转换的就会报错
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage

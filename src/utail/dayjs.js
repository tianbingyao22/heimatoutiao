import dayjs from 'dayjs'
import '@/assets/css/news.css'
// 相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
export default dayjs

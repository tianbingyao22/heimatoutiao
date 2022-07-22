import request from '@/utail/request'

/**
 * 获取搜索建议
 * @param {String} q //参数搜索关键词
 * @returns promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 * @params {String} q //关键词参数
 * @returns promise
 */

export const getSearchResult = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: { q, page, per_page: perPage }
  })
}

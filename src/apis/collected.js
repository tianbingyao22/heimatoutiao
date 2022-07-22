import request from '@/utail/request'

/**
 * 收藏文章
 * @param {String} target //收藏文章的id
 * @returns promise
 */

export const getCollected = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
}
/**
 * 取消收藏文章
 * @param {string} target
 * @returns promise
 */

export const concelCollected = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

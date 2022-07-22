import request from '@/utail/request'

/**
 * 点赞文章
 * @param {String}
 * @returns promise
 */
export const getLike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target
    }
  })
}

/**
 * 取消文章点赞
 * @param {String}
 * @returns promise
 */
export const concelLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

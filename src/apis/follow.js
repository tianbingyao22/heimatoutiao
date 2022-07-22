import request from '@/utail/request'

/**
 * 关注用户
 * @param {String} target //关注用户的id
 * @returns promise
 */

export const getFollow = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 * @param {String} target //被取消关注用户的id
 * @returns promise
 */

export const concelFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

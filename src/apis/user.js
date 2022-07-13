import request from '@/utail/request'

/**
 * 登录
 * @param {String} from mobile 手机号
 * @param {String} from code 验证码
 * @returns  promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

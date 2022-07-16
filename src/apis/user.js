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

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // 在拦截器中加了headers,token
  })
}

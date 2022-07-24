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

/**
 * 获取用户个人资料（发布文章数等）
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // 在拦截器中加了headers,token
  })
}

/**
 * 获取用户自己的信息（包括性别，头像，生日等）
 * @returns promise
 */
export const getUserFile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑用户信息
 * @param {String} name //昵称
 * @param {String} gender //性别 0-男 1-女
 * @param {String} birthday //生日 格式'2018-12-20'
 * @param {String} realName //真正姓名
 * @param {String} intro //个人介绍
 * @returns promise
 */
export const editUserInfo = (userinfo) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: userinfo.name,
      gender: userinfo.gender,
      birthday: userinfo.birthday,
      real_name: userinfo.realName,
      intro: userinfo.intro
    }
  })
}

/**
 * 更新头像
 * @param {file} photo //上传的头像
 * @returns promise
 */
export const uploadPhoto = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}

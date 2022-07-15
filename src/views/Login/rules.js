// 手机号校验规则
export const mobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^1[0-9]{10}$/,
    message: '手机号格式不正确'
  }
]
// 验证码校验规则
export const codeRules = [
  { required: true, message: '请输入验证码' },
  {
    pattern: /^[0-9]{6}$/,
    message: '验证码格式不正确'
  }
]

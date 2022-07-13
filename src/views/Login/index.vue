<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="BackToPrePage"
      class="navbar"
    >
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单验证 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <!-- <template v-slot:label>
          <span class="toutiao toutiao-shouji"></span>
        </template> -->
        <template v-slot:left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <!-- <template v-slot:label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template> -->
        <template v-slot:left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template v-slot:right-icon>
          <van-button color="#ededed" size="mini" round class="icon-btn"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#6db4fb"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/apis/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    BackToPrePage() {
      this.$router.back()
    },
    async login() {
      //   console.log('submit', values)
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  //   由于scoped导致样式不生效时可以使用 :deep(类名等)穿透scoped样式
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  .toutiao {
    font-size: 0.49333rem;
  }
  .icon-btn {
    padding: 0 10px;
    color: #666666 !important;
  }
}
</style>

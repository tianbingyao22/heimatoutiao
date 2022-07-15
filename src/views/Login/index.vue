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
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <!-- <template v-slot:label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template> -->
        <template v-slot:left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template v-slot:right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
            format="ss"
          />
          <van-button
            v-else
            color="#ededed"
            size="mini"
            round
            class="icon-btn"
            @click.stop="sendCode"
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
import { login, sendCode } from '@/apis/user'
import { mobileRules, codeRules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    BackToPrePage() {
      this.$router.back()
    },
    async login() {
      //   console.log('submit', values)

      this.$toast.loading({
        message: '稍等一下，正在加载...',
        // loading时，不能点击
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 用vuex存储token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
        this.$router.push('/profile')
      } catch (err) {
        // console.log(err)
        // this.$toast.fail('登录失败')
        const status = err.response.status
        let message = '访问人数过多，请刷新重试'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     // 参数缺失
        //     this.$toast.fail(err.response.data.message)
        //     break
        //   case 507:
        //     // 服务端错误
        //     this.$toast.fail('访问人数过多，请刷新重试')
        //     break
        //   default:
        //     this.$toast.fail('访问人数过多，请刷新重试')
        //     break
        // }
      }
    },
    async sendCode() {
      // 验证手机号是否合法
      try {
        await this.$refs.form.validate('mobile')
        // 验证成功后发送验证码请求
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (err) {
        // 具体分析错误
        // 如果res.response证明手机号校验未通过，未能发送验证码请求
        if (!err.response) {
          this.$toast.fail('手机号码格式不对')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
      // this.isShowCountDown = true
    },
    increment() {
      // console.log(this)
      this.$store.commit('setNumber')
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

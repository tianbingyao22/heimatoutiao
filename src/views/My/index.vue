<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登陆的盒子 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 第一行占位 -->
        <van-row></van-row>
        <!-- 用户信息：头像手机号等 -->
        <van-row>
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11" class="v-col">
            <van-row type="flex" align="center" justify="end">
              <van-button
                color="#ededed"
                size="mini"
                round
                class="code-row"
                @click="editUserInfo"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="$router.push('/login')">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid column-num="2" class="grid">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出按钮</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/apis'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    // 标识是否登录
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getUserInfo() {
      // 并没有因为没有token发送请求而报错？
      try {
        if (this.isLogin) {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        }
      } catch (err) {
        this.$toast.fail('请重新登录')
      }
    },
    // 编辑用户信息
    editUserInfo() {
      this.$router.push({
        path: '/user',
        query: {
          userInfo: this.userInfo
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  .van-row {
    height: 100%;
    flex: 1;
    .mobile {
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .v-col {
    height: 100%;
    .code-row {
      color: #333 !important;
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
    .van-grid-item {
      color: #fff;
      font-size: 0.34667rem;
      :deep(.van-grid-item__text) {
        font-size: 0.29333rem;
        color: #fff;
      }
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 0.37333rem;
    img {
      width: 1.76rem;
      height: 1.76rem;
      margin-bottom: 10px;
    }
  }
}
</style>

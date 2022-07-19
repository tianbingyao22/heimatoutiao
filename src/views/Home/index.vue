<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <articleList :id="item.id"></articleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="editPopupFn"></span>
      <editchannel
        ref="popup"
        :myChannels="myChannels"
        @deleteChannel="deleteChannelFn"
        @changeActive="changeActiveFn"
        @addMyChannel="addmyChannelFn"
      >
      </editchannel>
    </van-tabs>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsToLocal,
  deleteChannel,
  addChannel
} from '@/apis/channel'
import editchannel from './component/editchannel.vue'
// 引入文章列表组件
import articleList from './component/articleList.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    articleList,
    editchannel
  },
  created() {
    this.getMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getMyChannels() {
      // const { data } = await getMyChannels()
      // this.myChannels = data.data.channels
      // 如果过是离线状态
      // 1。本地存储有数据，直接用本地存储的数据
      // 2.如果本地存储没数据，发送请求获取默认频道数据
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          // 如果你是登录状态
          // 发送请求获取的
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('获取频道失败，请重新获取')
      }
    },
    editPopupFn() {
      this.$refs.popup.show = true
    },
    async deleteChannelFn(id) {
      // 在视图上删除频道
      this.myChannels = this.myChannels.filter((ele) => ele.id !== id)
      // 如果是离线状态
      // 数据存储在本地存储中
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存放在本地中
        setMyChannelsToLocal(this.myChannels)
      } else {
        // 如果你是登录状态
        // 数据存放在数据库中
        try {
          await deleteChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changeActiveFn(index) {
      this.active = index
    },
    async addmyChannelFn(mychannel) {
      this.myChannels.push(mychannel)
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存放在本地中
        setMyChannelsToLocal(this.myChannels)
      } else {
        // 如果你是登录状态
        // 数据存放在数据库中
        try {
          console.log(mychannel.id, this.myChannels.length)
          await addChannel(mychannel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
        this.$toast.success('添加用户频道成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    // 不设置最大宽度
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  z-index: 99;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>

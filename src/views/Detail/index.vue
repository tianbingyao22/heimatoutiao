<template>
  <div class="newsDetail">
    <van-nav-bar title="黑马头条" left-arrow @click-left="BackToPrePage" />
    <div class="article-detail">
      <h1>{{ newsInfo.title }}</h1>
      <div class="user-info">
        <div class="user-touxiang">
          <img :src="newsInfo.aut_photo" alt="" />
        </div>
        <div class="use-title">
          <div class="user-name">{{ newsInfo.aut_name }}</div>
          <div class="user-time">{{ newsInfo.pubdate }}</div>
        </div>
        <div class="user-follow" @click="getFollowFn(newsInfo.aut_id)">
          <van-button type="info" v-if="!newsInfo.is_followed">
            <van-icon name="plus" />
            关注
          </van-button>
          <van-button type="info" v-else> 已关注 </van-button>
        </div>
      </div>
      <div class="article-content">
        <div
          v-html="newsInfo.content"
          class="article-content markdown-body"
        ></div>
      </div>
      <div class="article-end">
        <van-divider>正文结束</van-divider>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadCommit"
    >
      <van-cell v-for="(item, index) in commitList" :key="index">
        <commitPart :item="item" @getReply="getReplyFn"></commitPart>
      </van-cell>
    </van-list>

    <!-- 评论回复的弹出层 -->
    <!-- <div v-if="show"> -->
    <van-popup
      v-model="isReplyShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <replyList></replyList>
    </van-popup>
    <!-- </div> -->

    <div class="article-bottom">
      <van-button type="default" @click="isCommitShow = true"
        >写评论</van-button
      >

      <!-- 文章评论的弹出层 -->
      <van-popup
        v-model="isCommitShow"
        position="bottom"
        :style="{ height: '18%' }"
        class="commit-pop"
      >
        <commitPop @postCommit="postCommitFn"></commitPop>
      </van-popup>
      <van-badge :content="total_count">
        <i class="toutiao toutiao-wenda child"></i>
      </van-badge>
      <div @click="isCollectedFn(newsInfo.art_id)">
        <van-icon name="star-o" v-if="!newsInfo.is_collected" />
        <van-icon name="star" v-else />
      </div>
      <div @click="isLikeFn(newsInfo.art_id)">
        <van-badge :content="like_count">
          <van-icon name="good-job-o" v-if="newsInfo.attitude === -1" />
          <van-icon name="good-job" v-else />
        </van-badge>
      </div>

      <i class="toutiao toutiao-fenxiang" @click="showShare = true"></i>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import {
  getNewsDetail,
  getCommit,
  postCommit,
  getFollow,
  concelFollow,
  getCollected,
  concelCollected,
  getLike,
  concelLike
} from '@/apis'

import replyList from './Reply'
import commitPart from './Commit'
import commitPop from './message-pop'
export default {
  components: { replyList, commitPart, commitPop },
  data() {
    return {
      allCommits: '',
      newsInfo: {},
      commitList: [],
      isCommitShow: false,
      isReplyShow: false,
      loading: false,
      finished: false,
      last_id: '',
      end_id: '',
      total_count: '',
      like_count: '',
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
      // show: true
    }
  },
  created() {
    this.getNewsDetail()
    this.getCommit()
  },
  methods: {
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    },
    BackToPrePage() {
      this.$router.back()
    },
    getReplyFn() {
      // this.show = false
      // this.show = true
      this.isReplyShow = true
    },
    // 上传评论
    async postCommitFn(words) {
      try {
        await postCommit(this.$route.query.art_id, words)
        this.getCommit()
        this.$toast.success('评论成功')
        this.isCommitShow = false
      } catch (error) {
        this.$toast.fail('上传评论失败')
      }
    },
    // 获取文章详情
    async getNewsDetail() {
      try {
        const res = await getNewsDetail(this.$route.query.art_id)
        this.newsInfo = res.data.data
        this.like_count = res.data.data.like_count
      } catch (error) {
        this.$toast.fail('获取文章详情失败')
      }
    },
    // 获取评论
    async getCommit() {
      try {
        const res = await getCommit('a', this.$route.query.art_id)
        this.commitList = res.data.data.results
        this.allCommits = res.data.data.total_count
        this.last_id = res.data.data.last_id
        this.end_id = res.data.data.end_id
        this.total_count = res.data.data.total_count
      } catch (error) {
        this.$toast.fail('获取评论失败')
      }
    },
    async loadCommit() {
      if (!this.last_id) {
        this.loading = false
        return
      }
      if (this.last_id === this.end_id) {
        this.finished = true
        return
      }
      const res = await getCommit('a', this.$route.query.art_id, this.last_id)
      this.commitList.push(...res.data.data.results)
      this.last_id = res.data.data.last_id
      this.end_id = res.data.data.end_id
      this.loading = false
    },

    // 关注用户
    async getFollowFn(id) {
      try {
        this.newsInfo.is_followed = !this.newsInfo.is_followed
        if (this.newsInfo.is_followed) {
          await getFollow(id)
        } else {
          await concelFollow(id)
        }
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 收藏文章  getCollected,concelCollected
    async isCollectedFn(id) {
      try {
        this.newsInfo.is_collected = !this.newsInfo.is_collected
        if (this.newsInfo.is_collected) {
          await getCollected(id)
        } else {
          await concelCollected(id)
        }
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 点赞文章  getLike,concelLike
    async isLikeFn(id) {
      this.newsInfo.attitude = -this.newsInfo.attitude
      if (this.newsInfo.attitude === 1) {
        await getLike(id)
        this.like_count = this.like_count + 1
      } else if (this.newsInfo.attitude === -1) {
        await concelLike(id)
        this.like_count = this.like_count - 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.newsDetail {
  padding-bottom: 100px;
}
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}
.article-detail {
  padding-top: 100px;
  h1 {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .user-info {
    padding: 0 0.42667rem;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #fff;
    .user-touxiang {
      width: 1rem;
      height: 1rem;
      margin-right: 0.22667rem;
      overflow: hidden;
      border-radius: 50%;
      position: relative;
      display: inline-block;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .use-title {
      .user-name {
        font-size: 0.32rem;
        color: #3a3a3a;
      }
      .user-time {
        font-size: 0.30667rem;
        color: #b7b7b7;
      }
    }
    .user-follow {
      position: relative;
      overflow: hidden;
      color: #969799;
      text-align: right;
      vertical-align: middle;
      word-wrap: break-word;
      flex: 1;
      .van-button {
        width: 2.26667rem;
        height: 0.77333rem;
        border-radius: 26.64rem;
      }
    }
  }
  .article-content {
    padding: 0px 20px;
  }
  :deep(.article-end) {
    align-items: center;
    margin: 0.42667rem 0;
    color: #969799;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    border-color: #ebedf0;
    border-style: solid;
    border-width: 0;
  }
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 1.17333rem;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  .van-button--normal {
    width: 3.76rem;
    height: 0.61333rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
    border-radius: 26.64rem;
  }
  :deep(.toutiao) {
    font-size: 35px !important;
  }
}
.commit-pop {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}
.van-icon-star {
  color: red;
}
.van-icon-good-job {
  color: red;
}
</style>

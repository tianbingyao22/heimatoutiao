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
          <van-button type="info" v-show="!newsInfo.is_followed">
            <van-icon name="plus" />
            关注
          </van-button>
          <van-button type="info" v-show="newsInfo.is_followed">
            已关注
          </van-button>
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
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadCommit"
    > -->
    <van-cell v-for="(item, index) in commitList" :key="index">
      <commitPart :item="item" @getReply="getReplyFn"></commitPart>
    </van-cell>
    <!-- 评论回复的弹出层 -->
    <van-popup
      v-model="isReplyShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <replyList></replyList>
    </van-popup>
    <!-- </van-list> -->
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
      <van-badge :content="commitList.length">
        <i class="toutiao toutiao-wenda child"></i>
      </van-badge>
      <div @click="isCollectedFn(newsInfo.aut_id)">
        <van-icon name="star-o" v-show="!newsInfo.is_collected" />
        <van-icon name="star" v-show="newsInfo.is_collected" />
      </div>
      <div @click="isLikeFn(newsInfo.aut_id)">
        <van-icon name="good-job-o" v-show="newsInfo.attitude === -1" />
        <van-icon name="good-job" v-show="newsInfo.attitude === 1" />
      </div>

      <i class="toutiao toutiao-fenxiang"></i>
    </div>
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
      // words: '',
      isCommitShow: false,
      isReplyShow: false
      // loading: false,
      // finished: false,
      // last_id: '',
      // end_id: ''
    }
  },
  created() {
    this.getNewsDetail()
    this.getCommit()
  },
  // computed: {
  //   getwords() {
  //     return this.words.length
  //   }
  // },
  methods: {
    BackToPrePage() {
      this.$router.back()
    },
    getReplyFn() {
      this.isReplyShow = true
    },
    // 上传评论
    async postCommitFn(words) {
      try {
        const res = await postCommit(this.$store.state.article_id, words)
        this.words = ''
        console.log(res)
        this.getCommit()
        this.$toast.success('评论成功')
        this.isCommitShow = false
      } catch (error) {
        this.toast.fail('上传评论失败')
      }
    },
    // 获取文章详情
    async getNewsDetail() {
      try {
        const res = await getNewsDetail(this.$store.state.article_id)
        this.newsInfo = res.data.data
        console.log(this.newsInfo)
        // this.last_id = res.data.data.last_id
        // this.end_id = res.data.data.end_id
      } catch (error) {
        this.toast.fail('获取文章详情失败')
      }
    },
    // 获取评论
    async getCommit() {
      try {
        const res = await getCommit('a', this.$store.state.article_id)
        this.commitList = res.data.data.results
        this.allCommits = res.data.data.total_count
      } catch (error) {
        this.toast.fail('获取评论失败')
      }
    },
    // async loadCommit() {
    //   const res = await getCommit(
    //     'a',
    //     this.$store.state.article_id,
    //     this.last_id
    //   )
    //   console.log(res)
    //   this.commitList.push(res.data.data.result)
    //   if (this.commitList.length >= res.data.data.total_count) {
    //     this.finished = true
    //   }
    //   this.loading = false
    // },

    // 关注用户
    async getFollowFn(id) {
      try {
        this.newsInfo.is_followed = !this.newsInfo.is_followed
        if (this.newsInfo.is_followed) {
          const res = await getFollow(id)
          console.log(res)
        } else {
          const res = await concelFollow(id)
          console.log(res)
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
          const res = await getCollected(id)
          console.log(res)
        } else {
          const res = await concelCollected(id)
          console.log(res)
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
        const res = await getLike(id)
        console.log(res)
        console.log('带你赞')
      } else if (this.newsInfo.attitude === -1) {
        const res = await concelLike(id)
        console.log(res)
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

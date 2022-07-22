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
        <div class="user-follow">
          <van-button type="info">
            <van-icon name="plus" />
            关注
          </van-button>
        </div>
      </div>
      <div class="article-content">
        <div v-html="newsInfo.content"></div>
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
        <div class="commit">
          <div class="commit-info">
            <div class="commit-img">
              <img :src="item.aut_photo" alt="" />
            </div>
            <div class="commit-text">
              <div class="commit-title">
                <div class="commit-id">{{ item.aut_name }}</div>
                <div class="dianzan">
                  <van-icon name="good-job-o" />
                  点赞
                </div>
              </div>
              <div class="commit-coment">
                <p>{{ item.content }}</p>
                <div class="bottom-info">
                  <span class="commit-time">{{ item.pubdate }}</span>
                  <van-button type="default"
                    >回复{{ item.reply_count }}</van-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-cell>
    <!-- </van-list> -->
    <div class="article-bottom">
      <van-button type="default" @click="isCommitShow = true"
        >写评论</van-button
      >
      <van-popup
        v-model="isCommitShow"
        position="bottom"
        :style="{ height: '18%' }"
        class="commit-pop"
      >
        <div class="commit-post">
          <div class="post-field">
            <div class="van-field__body">
              <textarea
                rows="2"
                placeholder="请输入留言"
                v-model="words"
              ></textarea>
            </div>
            <div class="word-limit">
              <span class="word-num">{{ getwords }}</span
              >/50
            </div>
          </div>
        </div>
        <div class="fabu">
          <van-button type="default" class="fabu-btn" @click="postCommit"
            >发布</van-button
          >
        </div>
      </van-popup>
      <van-badge :content="commitList.length">
        <i class="toutiao toutiao-wenda child"></i>
      </van-badge>
      <i class="toutiao toutiao-shoucang"></i>
      <i class="toutiao toutiao-dianzan2"></i>
      <i class="toutiao toutiao-fenxiang"></i>
    </div>
  </div>
</template>

<script>
import { getNewsDetail, getCommit, postCommit } from '@/apis'
export default {
  data() {
    return {
      allCommits: '',
      newsInfo: {},
      commitList: [],
      words: '',
      isCommitShow: false,
      loading: false,
      finished: false,
      last_id: '',
      end_id: ''
    }
  },
  created() {
    this.getNewsDetail()
    this.getCommit()
  },
  computed: {
    getwords() {
      return this.words.length
    }
  },
  methods: {
    BackToPrePage() {
      this.$router.back()
    },
    async getNewsDetail() {
      const res = await getNewsDetail(this.$store.state.article_id)
      this.newsInfo = res.data.data
      this.last_id = res.data.data.last_id
      this.end_id = res.data.data.end_id
    },
    async getCommit() {
      const res = await getCommit('a', this.$store.state.article_id)
      this.commitList = res.data.data.results
      this.allCommits = res.data.data.total_count
      //   console.log(this.commitList)
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
    async postCommit() {
      const res = await postCommit(this.$store.state.article_id, this.words)
      this.words = ''
      console.log(res)
      this.getCommit()
      this.$toast.success('评论成功')
      this.isCommitShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.newsDetail {
  padding-bottom: 100px;
}
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}
.article-detail {
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
    padding: 0.73333rem 0.42667rem;
    :deep(h2) {
      margin-top: 0 !important;
      font-size: 15px;
      padding-bottom: 0.3em;
      border-bottom: 0.01333rem solid #eaecef;
      margin-bottom: 0.21333rem;
      font-weight: 600;
      line-height: 1.25;
    }
    :deep(p) {
      font-size: 0.21333rem;
    }
    :deep(h1) {
      font-size: 20px;
    }
    :deep(h3) {
      font-size: 15px;
    }
    :deep(h4) {
      font-size: 15px;
    }
    :deep(h5) {
      font-size: 15px;
    }
    :deep(pre) {
      padding: 0.21333rem;
      overflow: auto;
      font-size: 12px;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 0.04rem;
    }
    :deep(li) {
      font-size: 16px;
    }
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
.commit {
  .commit-info {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #fff;
    .commit-img {
      width: 0.96rem;
      height: 0.96rem;
      margin-right: 0.33333rem;
      overflow: hidden;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .commit-text {
      flex: 1;
      .commit-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        height: 24px;
        padding-top: 10px;
        .commit-id {
          color: #406599;
          font-size: 0.34667rem;
        }
        .dianzan {
          height: 0.4rem;
          padding: 0;
          border: none;
          font-size: 0.25333rem;
          line-height: 0.4rem;
          margin-right: 0.09333rem;
          .van-icon-good-job-o {
            font-size: 0.4rem;
          }
        }
      }
      :deep(.comiit-coment) {
        p {
          font-size: 0.42667rem;
          color: #222;
          word-break: break-all;
          text-align: justify;
        }
      }
    }
  }
}
.bottom-info {
  display: flex;
  align-items: center;
  .commit-time {
    font-size: 0.25333rem;
    color: #222;
    margin-right: 0.33333rem;
  }
  .van-button--normal {
    width: 1.8rem;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.28rem;
    color: #222;
    border-radius: 26.64rem;
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
  .commit-post {
    background-color: #f5f7f9;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    .post-field {
      color: #323233;
      text-align: left;
      position: relative;
      vertical-align: middle;
      word-wrap: break-word;
      flex: 1;
      .van-field__body {
        color: #323233;
        text-align: left;
        textarea {
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          color: #323233;
          line-height: inherit;
          text-align: left;
          background-color: transparent;
          border: 0;
          resize: none;
        }
      }
      .word-limit {
        margin-top: 0.10667rem;
        color: #646566;
        font-size: 0.32rem;
        line-height: 0.42667rem;
        text-align: right;
      }
    }
  }
  .fabu-btn {
    height: 100%;
    border-radius: 0;
    width: 2rem;
    border: none;
    padding: 0;
    color: #6ba3d8;
    :deep(.van-button__text) {
      margin-right: 40px;
    }
  }
}
</style>

<template>
  <div>
    <div class="commit">
      <div class="commit-info">
        <div class="commit-img">
          <img :src="item.aut_photo" alt="" />
        </div>
        <div class="commit-text">
          <div class="commit-title">
            <div class="commit-id">{{ item.aut_name }}</div>
            <div class="dianzan" @click="getLikeFn(item.com_id)">
              <van-icon name="good-job-o" v-show="!islike" />
              <van-icon name="good-job" v-show="islike" />
              {{ islike ? '取消赞' : '点赞' }}
            </div>
          </div>
          <div class="commit-coment">
            <p>{{ item.content }}</p>
            <div class="bottom-info">
              <span class="commit-time">{{ item.pubdate }}</span>
              <van-button type="default" @click="replyFn(item)"
                >回复{{ item.reply_count }}</van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLike, concelLike } from '@/apis'
export default {
  data() {
    return {
      islike: ''
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    replyFn(item) {
      this.$emit('getReply')
      this.$store.state.replyCommit = item
      this.islike = item.is_liking
    },
    async getLikeFn(id) {
      this.islike = !this.islike
      console.log(this.islike)
      if (this.islike) {
        console.log(id)
        const res = await getLike(id)

        console.log('点赞')
        console.log(res)
      } else {
        console.log(id)
        const res = await concelLike(id)

        console.log('取消赞')
        console.log(res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>

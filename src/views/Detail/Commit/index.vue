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
              <van-badge :content="like_count">
                <van-icon name="good-job-o" v-show="!islike" />
                <van-icon name="good-job" v-show="islike" />
              </van-badge>
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
import { getLikeComment, concelLikeComment } from '@/apis'
export default {
  data() {
    return {
      islike: this.item.is_liking,
      like_count: this.item.like_count
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    replyFn(item) {
      this.$emit('getReply', item)
      this.$store.commit('setItem', item)
    },
    async getLikeFn(id) {
      this.islike = !this.islike
      if (this.islike) {
        await getLikeComment(id)
        this.like_count = this.like_count + 1
      } else {
        await concelLikeComment(id)
        this.like_count = this.like_count - 1
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
    width: 2.2rem;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.28rem;
    color: #222;
    border-radius: 26.64rem;
  }
}
</style>

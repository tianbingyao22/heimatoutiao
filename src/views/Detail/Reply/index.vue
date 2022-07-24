<template>
  <div class="reply-pop">
    <van-nav-bar title="暂无回复" class="reply-navbar" />
    <!-- 单个评论组件 -->
    <commitpart :item="item"></commitpart>
    <van-cell title="全部回复" />
    <!-- 单个回复评论组件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadReplyFn"
    >
      <commitpart
        v-for="item1 in replyList"
        :key="item1.com_id"
        :item="item1"
      ></commitpart>
    </van-list>
    <!--底部按钮  -->
    <div class="reply-btn">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        @click="replyCommitShow = true"
        >评论</van-button
      >
      <!-- 留言组件 -->
      <van-popup
        v-model="replyCommitShow"
        position="bottom"
        :style="{ height: '18%' }"
        class="commit-pop"
      >
        <messagepart @postCommit="postRelyFn"></messagepart>
      </van-popup>
    </div>
  </div>
</template>

<script>
import commitpart from '../Commit'
import messagepart from '../message-pop'
import { getCommit, postCommit } from '@/apis'
export default {
  components: {
    commitpart,
    messagepart
  },
  data() {
    return {
      replyCommitShow: false,
      replyList: [],
      loading: false,
      finished: false,
      last_id: '',
      end_id: ''
    }
  },
  created() {
    this.getCommitList()
  },
  computed: {
    item() {
      return this.$store.state.replyCimmit
    }
  },
  watch: {
    item() {
      this.getCommitList()
    }
  },
  methods: {
    async getCommitList() {
      const res = await getCommit('c', this.item.com_id)
      this.replyList = res.data.data.results
      this.last_id = res.data.data.last_id
      this.end_id = res.data.data.end_id
      // console.log(res)
    },
    async loadReplyFn() {
      if (!this.last_id) {
        this.loading = false
        return
      }
      if (this.last_id === this.end_id) {
        this.finished = true
        return
      }
      const res = await getCommit('c', this.item.com_id, this.last_id)
      this.replyList.push(...res.data.data.results)
      this.last_id = res.data.data.last_id
      this.end_id = res.data.data.end_id
      this.loading = false
    },
    async postRelyFn(words) {
      await postCommit(this.item.com_id, words, this.$route.query.art_id)
      this.getCommitList()
      this.replyCommitShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.reply-navbar {
  background-color: #fff;
}
.reply-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 45px;
  background-color: #1989fa;
  button {
    background-color: #fff;
    color: #333;
  }
}
.commit-pop {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}
.reply-pop {
  padding-bottom: 2rem;
}
</style>

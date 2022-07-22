<template>
  <div>
    <van-nav-bar title="暂无回复" class="reply-navbar" />
    <!-- 单个评论组件 -->
    <commitInfo :item="item"></commitInfo>
    <van-cell title="全部回复" />
    <!-- 单个回复评论组件 -->
    <commitInfo
      v-for="(item1, index) in replyList"
      :key="index"
      :item="item1"
    ></commitInfo>

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
        <replyCommit @postCommit="postCommitFn"></replyCommit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import commitInfo from '../Commit'
import { getCommit, postCommit } from '@/apis'
import replyCommit from '../message-pop'
export default {
  created() {
    this.item = this.$store.state.replyCommit
    this.getCommit()
  },
  data() {
    return {
      item: {},
      replyList: [],
      replyCommitShow: false
    }
  },
  components: { commitInfo, replyCommit },
  methods: {
    async getCommit() {
      const res = await getCommit('c', this.$store.state.replyCommit.com_id)
      this.replyList = res.data.data.results
    },
    async postCommitFn(words) {
      const res = await postCommit(
        this.$store.state.replyCommit.com_id,
        words,
        this.$store.state.article_id
      )
      this.getCommit()
      this.$toast.success('评论成功')
      this.replyCommitShow = false
      console.log(res)
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
</style>

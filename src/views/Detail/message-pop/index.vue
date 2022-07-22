<template>
  <div class="commit-com">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: ''
    }
  },
  computed: {
    getwords() {
      return this.words.length
    }
  },
  methods: {
    async postCommit() {
      this.$emit('postCommit', this.words)
      this.words = ''
    }
  }
}
</script>

<style lang="less" scoped>
.commit-com {
  width: 100%;
  display: flex;
  align-items: center;
}
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
</style>

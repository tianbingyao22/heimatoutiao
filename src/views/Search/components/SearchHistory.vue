<template>
  <div class="searcchHistory">
    <van-cell-group>
      <van-cell title="搜索历史">
        <i
          class="toutiao toutiao-shanchu"
          @click="delicon = true"
          v-show="!delicon"
        ></i>
        <div class="deltext" v-show="delicon">
          <span class="alldel" @click="allDelete">全部删除</span>
          <span class="complete" @click="delicon = false">完成</span>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="searchResult(item)"
      >
        <template #title>{{ item }}</template>
        <template #right-icon>
          <van-icon name="close" v-show="delicon" @click="delFn(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchHistory: [],
      delicon: false
    }
  },
  props: {
    searchkey: {
      type: String,
      require: true
    }
  },
  watch: {
    searchkey: {
      immediate: true,
      handler(val) {
        if (val) {
          this.searchHistory =
            JSON.parse(localStorage.getItem('searchHistory')) || []
          this.searchHistory = this.searchHistory.filter((ele) => ele !== val)
          this.searchHistory.unshift(val)
          localStorage.setItem(
            'searchHistory',
            JSON.stringify(this.searchHistory)
          )
        }
      }
    }
  },
  created() {
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
  },
  methods: {
    delFn(index) {
      this.searchHistory.splice(index, 1)
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    allDelete() {
      this.searchHistory = []
      localStorage.removeItem('searchHistory')
    },
    searchResult(item) {
      this.$emit('getkeywords', item)
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.toutiao-shanchu) {
  font-size: 32px !important;
}
.deltext {
  span {
    font-size: 26px;
  }
  .complete {
    margin-left: 10px;
  }
}
.van-icon-close {
  color: #ccc;
}
</style>

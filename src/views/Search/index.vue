<template>
  <div class="searchindex">
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @focus="VisibleComponentResult"
        @search="onSearch"
        @cancel="backToPrePage"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="componentName"
      :keywords="value"
      @getkeywords="getkeywords"
      :searchkey="key"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      value: '',
      //   是否显示搜索结果
      isShowSearchResult: false,
      key: ''
    }
  },
  computed: {
    componentName() {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      // 回车搜索时，让搜索结果显示
      this.isShowSearchResult = true
      this.key = this.value
    },
    backToPrePage() {
      this.$router.go(-1)
    },
    VisibleComponentResult() {
      // 显示搜索结果后，重新获取焦点
      this.isShowSearchResult = false
    },
    getkeywords(key) {
      this.value = key
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.van-search {
  background-color: #3296fa;
}
</style>

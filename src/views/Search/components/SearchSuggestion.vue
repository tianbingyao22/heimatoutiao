<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in highlightData"
        :key="index"
        @click="getKeywords(index)"
      >
        <template #icon>
          <van-icon name="search" class="search-icon" />
        </template>
        <template #title>
          <span v-html="item"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/apis'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [],
      timer: null
    }
  },
  watch: {
    // 监听keyword的变化，输入时keywords会不断变化
    // keywords变化时请求数据
    // keywords: 'getSearchSuggestion'
    keywords: {
      immediate: true,
      handler() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getSearchSuggestion()
        }, 500)
      }
    }
  },
  computed: {
    highlightData() {
      const reg = new RegExp(this.keywords, 'gi')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  methods: {
    async getSearchSuggestion() {
      const res = await getSearchSuggestion(this.keywords)
      if (res.data.data.options.length === 0) {
        return this.$toast.fail('没有搜索建议')
      }
      this.suggestions = res.data.data.options.filter(Boolean)
    },
    getKeywords(index) {
      this.$emit('getkeywords', this.suggestions[index])
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>

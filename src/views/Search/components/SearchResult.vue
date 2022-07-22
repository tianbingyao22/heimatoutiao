<template>
  <div>
    <van-cell-group>
      <van-list
        offset="200"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadNextPage"
      >
        <van-cell
          v-for="item in resultList"
          :key="item.art_id"
          @click="getDetail(item)"
        >
          <template #title>{{ item.title }}</template>
        </van-cell>
      </van-list>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchResult } from '@/apis/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resultList: [],
      loading: false,
      finished: false,
      error: false,
      page: 1
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult() {
      const res = await getSearchResult(this.keywords, this.page)
      this.resultList = res.data.data.results
    },
    async loadNextPage() {
      try {
        this.page++
        const res1 = await getSearchResult(this.keywords, this.page)
        if (res1.data.data.results.length === 0) {
          this.finished = true
        }
        this.resultList.push(...res1.data.data.results)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    getDetail(item) {
      this.$store.state.article_id = item.art_id
      this.$router.push('/detail')
    }
  }
}
</script>

<style></style>

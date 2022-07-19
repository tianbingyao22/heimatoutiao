<template>
  <div>
    <van-pull-refresh
      v-model="refreshloading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        offset="0"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
      >
        <articleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/apis'
import articleItem from './articleItem.vue'
export default {
  name: 'Article',
  components: {
    articleItem
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      error: false,
      refreshloading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 将第n页的数据，放在articles
        if (this.refreshloading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshloading = false
      }
    }
  }
}
</script>

<style></style>

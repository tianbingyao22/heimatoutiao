<template>
  <div @click="getNewsDetail(articleInfo)">
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    ></van-cell>
    <!-- 渲染一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
      <!-- <template #value>

      </template> -->
    </van-cell>
    <!-- 渲染三张图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文章描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utail/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  },
  methods: {
    getNewsDetail(item) {
      // this.$store.state.article_id = item.art_id
      this.$router.push({
        path: '/detail',
        query: {
          art_id: item.art_id
        }
      })
    }
  }
}
</script>

<style></style>

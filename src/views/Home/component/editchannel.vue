<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '98%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              class="edit-btn"
              size="small"
              round
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <van-grid gutter="10px">
            <van-grid-item
              v-for="(item, index) in myChannels"
              :key="item.id"
              :text="item.name"
              :class="{ active: item.name === '推荐' }"
              @click="delChannels(item, index)"
            >
              <template #icon>
                <van-icon
                  name="cross"
                  v-show="isEdit && item.name !== '推荐'"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <van-grid gutter="10px">
            <van-grid-item
              :text="item.name"
              icon="plus"
              v-for="item in recommendChannels"
              :key="item.id"
              @click="addMyChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/apis/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    delChannels(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('deleteChannel', channel.id)
      }
      if (!this.isEdit) {
        // 切换
        this.$emit('changeActive', index)
        this.show = false
      }
    },
    addMyChannel(myChannel) {
      this.$emit('addMyChannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels() {
      // 从总频道列表中筛选掉我的列表中的元素
      return this.allChannels.filter((item) => {
        // 如果在我的列表中找到与频道列表中一样的元素，则返回false表示新数组中不要该元素
        // const result = this.myChannels.find((i) => i.id === item.id)
        return !this.myChannels.find((i) => i.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    height: 48px;
    line-height: 48px;
    padding: 0 30px;
    color: red;
    border: 0.02667rem solid red;
  }
  .van-grid-item {
    height: 1.14rem;
    :deep(.van-grid-item__content) {
      background-color: #f4f5f6;
    }
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
        margin-right: 10px;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>

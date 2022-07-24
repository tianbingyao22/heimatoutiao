<template>
  <div>
    <img :src="photo" alt="" ref="img" />
    <van-button type="default" class="complete" @click="confirm"
      >完成</van-button
    >
    <van-button type="default" class="concel" @click="concel">取消</van-button>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/apis'
export default {
  props: ['photo'],
  mounted() {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      viewMode: 1,
      background: false,
      highlight: false,
      scalable: true
    })
  },
  methods: {
    confirm() {
      try {
        const fm = new FormData()
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          fm.append('photo', blob)
          await uploadPhoto(fm)
          this.$toast.success('上传头像成功')
          this.$emit('closePreImg')
        })
      } catch (error) {
        this.$toast.fail('上传头像失败')
      }
    },
    concel() {
      this.$emit('closePreImg')
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  position: fixed;
  bottom: 0;
}
.complete {
  right: 0;
}
.concel {
  left: 0;
}
</style>

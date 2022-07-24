<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="BackToPrePage"
      class="header"
    />
    <van-cell-group>
      <!-- 头像 -->
      <input type="file" hidden ref="imgurl" />
      <van-cell title="头像" is-link @click="$refs.imgurl.click()">
        <van-image width="50" height="50" :src="initUserInfo.photo" round />
      </van-cell>
      <van-popup
        v-model="preImgShow"
        position="bottom"
        :style="{ height: '80%' }"
      >
        <UpdataPhoto :photo="photo" @closePreImg="closePreImgFn"></UpdataPhoto>
      </van-popup>
      <!-- 昵称 -->
      <van-cell title="昵称" is-link @click="showNickname = true">{{
        initUserInfo.name
      }}</van-cell>
      <van-popup
        v-model="showNickname"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="onCancelNickname"
          @click-right="onConfirmNickname"
        />
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入新的昵称"
          show-word-limit
        />
      </van-popup>
      <!-- 性别 -->
      <van-cell title="性别" is-link @click="showSex = true">{{
        initUserInfo.gender == 1 ? '女' : '男'
      }}</van-cell>
      <van-popup v-model="showSex" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="更新性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirmSex"
          @cancel="onCancelSex"
        />
      </van-popup>
      <!-- 生日 -->
      <van-cell title="生日" is-link @click="showBirthday = true">{{
        initUserInfo.birthday
      }}</van-cell>
      <van-popup
        v-model="showBirthday"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="initUserInfo.birthday"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmBirthday"
          @cancel="onCancelBirthday"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { editUserInfo, getUserFile } from '@/apis'
import dayjs from '@/utail/dayjs'
import UpdataPhoto from './components/UpdataPhoto.vue'
export default {
  data() {
    return {
      showSex: false,
      columns: ['男', '女'],
      showBirthday: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      showNickname: false,
      message: '',
      photo: '',
      preImgShow: false,
      initUserInfo: {}
    }
  },
  components: { UpdataPhoto },
  created() {
    this.getUserFile()
  },
  mounted() {
    this.$refs.imgurl.addEventListener('change', (e) => {
      const file = e.target.files[0]
      //   1.
      // 将files对象转换成图片可以识别的url
      //   file = URL.createObjectURL(file)
      //   this.photo = file
      //   this.preImgShow = true
      //   2.
      const fr = new FileReader()
      fr.readAsDataURL(file)
      //   转换成base64格式时会触发onload事件,触发onload事件才证明转换完成了
      fr.onload = (e) => {
        this.photo = e.target.result
        this.preImgShow = true
      }
    })
  },
  methods: {
    // 关闭裁剪头像页面并重新请求用户信息
    closePreImgFn() {
      this.preImgShow = false
      this.getUserFile()
    },
    // 确认性别
    onConfirmSex(value, index) {
      this.initUserInfo.gender = index
      this.editUserInfo()
      this.showSex = false
    },
    // 取消性别
    onCancelSex() {
      this.showSex = false
    },
    // 回到上一步
    BackToPrePage() {
      this.$router.back()
    },
    // 确定年月日
    onConfirmBirthday(value) {
      this.initUserInfo.birthday = dayjs(value).format('YYYY-MM-DD')
      this.editUserInfo()
      this.showBirthday = false
    },
    // 取消修改年月日
    onCancelBirthday() {
      this.editUserInfo()
      this.showBirthday = false
    },
    // 取消修改昵称
    onCancelNickname() {
      this.showNickname = false
    },
    // 确认修改昵称
    onConfirmNickname() {
      this.initUserInfo.name = this.message
      this.editUserInfo()
      this.showNickname = false
      this.message = ''
    },
    // 获取用户具体信息
    async getUserFile() {
      const res = await getUserFile()
      this.initUserInfo = { ...res.data.data }
      this.initUserInfo.real_name = '田冰瑶'
      this.initUserInfo.intro = '31期田冰瑶'
      console.log(res)
    },
    // 修改用户信息
    async editUserInfo() {
      const res = await editUserInfo(this.initUserInfo)
      this.getUserFile()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.header {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}
.van-cell {
  border-bottom: 1px solid #f7f7f8;
}
</style>

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 移动端适配
    // 1. rem动态
    //   - amfe-flexible
    //   - 不管处于什么分辨率, 1rem始终是 1/10视口大小

    // 2. 将px --> rem
    //  - postcss-pxtorem
    //  - vant官网
    //  - 版本是5.1.1
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // 动态设置rootValue
      rootValue: (module) => {
        // 如果是vant组件，就返回37.5
        // 不是就返回75
        if (/Vant/gi.test(module.file)) {
          return 37.5
        } else {
          return 75
        }
      },
      // propLisr:["适配属性"]
      // 例如：["width","height"]，就只有width与height生效转换成了rem
      propList: ['*']
    }
  }
}

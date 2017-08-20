
<template>
  <div id="ganhuo">
    <slider :datas="banners" @click="clickBanner" :config="bannerConfig" />
    <div style="background-color:red;width:100%">
      <h1 style="line-height:100px">Slider</h1>
      <p style="text-align:left; font-size:20px; word-break:break-all; padding:10px">
          自定义banner轮播组件</br>
          banner高度将自动基于iPhone6的基础上，根据屏幕宽度的变化而变化</br></br>

          用法：</br>
          &lt;slider :datas=&quot;banners&quot; @click=&quot;clickBanner&quot; :config=&quot;bannerConfig&quot;/&gt;</br></br>

          其中bannerConfig的完整格式为(未设置的值 则默认按下面)：</br>
          {</br>
              slideAnimate: &#x27;0.8s&#x27;,       //设置动画时间</br>
              onColor: &#x27;red&#x27;,             //设置banner选中-小圆点颜色</br>
              offColor: &#x27;white&#x27;,          //设置banner未选中-小圆点颜色</br>
              h: 150,                     //设置banner高度</br>
              placeholderImg: &#x27;&#x27;          //设置placeholder image</br>
          }Ï</br>
      </p>
    </div>
  </div>
</template>

<script>
import slider from './slider.vue'
import logo from '../assets/logo.png'

export default {
  components: {
    slider
  },
  data() {
    return {
      banners: [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2999613097,1574427479&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2553610019,3282844502&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2348428062,1977343572&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3071961717,4098033786&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1740918152,1572287204&fm=15&gp=0.jpg'
      ],
      bannerConfig: { onColor: 'green', placeholderImg: logo, onColor: '#f00' }
    }
  },
  methods: {
    clickBanner(e) {
      alert('点击了' + e.index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

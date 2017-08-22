
<template>
  <div id="ganhuo">
    <slider :datas="banners" @click="clickBanner" :config="bannerConfig" />
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
      banners: [],
      bannerConfig: { onColor: 'green', placeholderImg: logo, onColor: '#f00' }
    }
  },
  methods: {
    clickBanner(e) {
      alert('点击了' + e.index)
    }
  },
  mounted() {
    setTimeout(() => {
      this.banners = [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2999613097,1574427479&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2553610019,3282844502&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2348428062,1977343572&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3071961717,4098033786&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1740918152,1572287204&fm=15&gp=0.jpg'
      ]
    },2000)
  }
}
</script>

<style lang="scss" scoped>

</style>

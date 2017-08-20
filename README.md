# vue-slider
A slider component for vue

```bash
./src/components/slider.vue
```

自定义banner轮播组件
banner高度将自动基于iPhone6的基础上，根据屏幕宽度的变化而变化

用法：
```html
<slider :datas="banners" @click="clickBanner" :config="bannerConfig"/>
```
```
其中bannerConfig的完整格式为(未设置的值 则默认按下面)：
{
    slideAnimate: '0.8s',       //设置动画时间
    onColor: 'red',             //设置banner选中-小圆点颜色
    offColor: 'white',          //设置banner未选中-小圆点颜色
    h: 150,                     //设置banner高度
    placeholderImg: ''          //设置placeholder image
}Ï
```


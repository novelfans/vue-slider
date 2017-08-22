
<template>
  <div class="slider_wraper">
    <div class="slider_box" ref='sliderbox'>
      <div class="item" v-for="(i,idx) in datas" :key="idx">
        <div class="placeholder"></div>
        <img :src="config.key?i[config.key]:i">
      </div>

    </div>
    <div class="page_box" ref='pagebox'>
      <span class="page_dot" ref='pagedot' style='display:none'></span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    datas: {
      type: Array,
      default: []
    },
    config: {
      type: Object,
      default: {
      }
    }
  },
  data() {
    return {
      timer: null,
      options: {
        slideAnimate: '0.8s',
        onColor: 'red',
        offColor: 'white',
        h: 150,
        placeholderImg: ''
      }
    }
  },
  watch: {
    datas(cur, old) {
      this.$nextTick(() => {
        this.commonInit()
      })
    }
  },
  methods: {
    commonInit: function () {
      this.extractOptions()
      this.setupContentSize()
      this.setupPage()
      this.setupGesture()
      this.addClickHandler()
      this.setupTimer()
      this.scrollToPage(0)
    },
    setupContentSize: function () {
      var box = this.$refs.sliderbox
      // 高度自适应屏幕

      var realH = box.parentNode.offsetWidth / 375.0 * this.options.h
      box.style.height = realH + 'px'

      var imgW = box.parentNode.offsetWidth
      var height = box.parentNode.offsetHeight
      var sumw = 0
      var firstImg = null
      var lastImg = null
      // 循环将每张图片宽度设置成屏幕宽度、同时设置父总宽度
      var idx = 0
      for (var i = 0; i < box.childNodes.length; i++) {
        var item = box.childNodes[i]
        if (item.nodeName === 'DIV') {
          item.style.width = imgW + 'px'
          item.style.height = height + 'px'
          item.setAttribute('index', '' + idx)
          var placeholder = item.getElementsByClassName('placeholder')[0]

          placeholder.style.backgroundImage = 'url(' + this.options.placeholderImg + ')'
          placeholder.style.backgroundSize = '100%'
          placeholder.style.zIndex = -1
          sumw += imgW
          if (!firstImg) {
            firstImg = item
          }
          lastImg = item
          idx += 1
        }
      }
      if (idx > 1) {
        box.insertBefore(lastImg.cloneNode(true), firstImg)
        box.appendChild(firstImg.cloneNode(true))
        sumw += 2 * imgW
      }

      box.style.width = sumw + 'px'
    },
    setupPage: function () {
      // 统计轮播图片的数量
      var box = this.$refs.sliderbox
      var sum = 0
      for (var i = 0; i < box.childNodes.length; i++) {
        var item = box.childNodes[i]
        if (item.nodeName === 'DIV') {
          sum += 1
        }
      }
      // 创建对应数量的小圆点
      var pagebox = this.$refs.pagebox
      var tmpdot = this.$refs.pagedot
      if (sum > 0) {
        if (sum > 1) {
          sum -= 2
        }

        for (i = 0; i < sum; i++) {
          var dot = tmpdot.cloneNode(true)// document.createElement('span')
          // dot.setAttribute('class', 'page_dot')
          dot.style.display = ''
          pagebox.appendChild(dot)
        }
        pagebox.totalpage = sum
      } else {
        pagebox.totalpage = 0
      }

      var slider = this.$refs.sliderbox
      slider.addEventListener('transitionend', e => {
        if (pagebox.curpage === sum - 1) {
          slider.style.transition = ''
          slider.style.left = 0 + 'px'
        }
      })
    },
    /** 滚动到指定页码处 page从0开始算 */
    scrollToPage: function (page) {
      var box = this.$refs.sliderbox
      this.updatePage(page)
      var w = box.parentNode.offsetWidth
      var offset = -((page + 1) * w)
      if (this.$refs.pagebox.totalpage <= 1) {
        offset = 0
      }
      box.style.transition = 'left ' + this.options.slideAnimate
      box.style.left = offset + 'px'
    },
    /** 标识当前显示的页码 */
    updatePage: function (page) {
      var pagebox = this.$refs.pagebox
      pagebox.curpage = page

      var pagedots = document.getElementsByClassName('page_dot')

      var n = pagedots.length
      for (var i = 1; i < n; i++) {
        var dot = pagedots[i]
        // dot.setAttribute('class', 'page_dot ' + (i-1 === page ? 'on' : 'off'))
        if (i - 1 === page) {
          dot.style.backgroundColor = this.getColor(this.options.onColor)
          dot.style.opacity = this.getAlpha(this.options.onColor)
        } else {
          dot.style.backgroundColor = this.getColor(this.options.offColor)
          dot.style.opacity = this.getAlpha(this.options.offColor)
        }
      }
    },
    getColor: function (color) {
      let idx = color.indexOf('|')
      if (idx !== -1) {
        return color.substr(idx)
      } else {
        return color
      }
    },
    getAlpha: function (color) {
      let idx = color.indexOf('|')
      if (idx !== -1) {
        return parseFloat(color.substring(idx + 1))
      } else {
        return 1.0
      }
    },
    limitOffset: function (x, end) {
      var t = x > 0 ? 0 : (x > end ? x : end)
      return t
    },
    setupGesture: function () {
      if (this.$refs.pagebox.totalpage <= 1) {
        return
      }
      var baseoffset = 0
      var startx = 0

      var box = this.$refs.sliderbox
      // 父容器的宽度 在这里相当于手机屏幕的宽度
      var w = box.parentNode.offsetWidth

      // 最后一张图片的偏移量 即第一张图片(达到循环轮播的目的)
      var end = -box.offsetWidth + w
      var diff = 0
      var hasJudge = false

      var self = this
      box.addEventListener('touchstart', e => {
        /** 记录触摸开始时的偏移量 同时清除动画效果 停止轮播定时器 */
        baseoffset = box.offsetLeft
        startx = e.targetTouches[0].pageX
        box.style.transition = ''
        hasJudge = false
        self.stopTimer()
      })

      box.addEventListener('touchmove', e => {
        // 计算手指滑动的距离
        diff = e.targetTouches[0].pageX - startx
        var next = 0
        if (!hasJudge) {
          hasJudge = true
          // 目的为了无限循环轮播
          if (diff < 0 && baseoffset === end) {
            // 往左滑动 且当前显示最右边的一页 即第一页
            baseoffset = -w
          } else if (diff >= 0 && baseoffset === 0) {
            // 往左滑动 且当前显示最左边的一页 即最后页
            baseoffset = end + w
          }
        }
        // 图片跟随手指移动
        next = baseoffset + diff
        next = self.limitOffset(next, end)
        box.style.left = next + 'px'
      })

      box.addEventListener('touchend', e => {
        var tmpdiff = Math.abs(diff)
        var next = baseoffset
        if (tmpdiff >= w / 2) {
          if (diff < 0) {
            // 往左滑动 超过一半 显示下一页
            next = baseoffset - w
          } else {
            // 往右滑动 超过一半 显示上一页
            next = baseoffset + w
          }
        }
        next = self.limitOffset(next, end)
        // 当手机离开屏幕时，当前偏移量对应的页码
        var page = parseInt((-next) / w)
        var totalPage = self.$refs.pagebox.totalpage
        if (page === 0) {
          // 最后一页
          page = totalPage - 1
        } else if (page === totalPage + 1) {
          // 第一页
          page = 0
        } else {
          // 因为第一张图片是最后一张图 所以页码要减1
          page = page - 1
        }

        self.updatePage(page)

        box.style.transition = 'left ' + self.options.slideAnimate
        box.style.left = next + 'px'
        // 再次启动定时器 进行轮播
        self.setupTimer()
      })
    },
    /** 给轮播图添加点击事件 */
    addClickHandler: function () {
      var box = this.$refs.sliderbox
      for (var i = 0; i < box.childNodes.length; i++) {
        var item = box.childNodes[i]
        if (item.nodeName === 'DIV') {
          var self = this
          item.addEventListener('click', e => {
            let idx = parseInt(e.currentTarget.getAttribute('index'))
            self.$emit('click', { index: idx })
          })
        }
      }
    },
    stopTimer: function () {
      if (this.timer) {
        window.clearInterval(this.timer)
      }
      this.timer = null
    },

    /** 启动定时器 轮播图片 */
    setupTimer: function () {
      if (this.$refs.pagebox.totalpage <= 1) {
        return
      }

      this.stopTimer()

      var pagebox = this.$refs.pagebox
      var curPage = pagebox.curpage
      if (!curPage) {
        curPage = 0
      } else {
        curPage = curPage + 1
      }
      var self = this
      var totalPage = pagebox.totalpage
      this.timer = window.setInterval(() => {
        curPage = (curPage) % totalPage
        self.scrollToPage(curPage)
        curPage = (curPage + 1) % totalPage
      }, 2000)
    },
    extractOptions: function () {
      if (this.config.slideAnimate) {
        this.options.slideAnimate = this.config.slideAnimate
      }
      if (this.config.onColor) {
        this.options.onColor = this.config.onColor
      }
      if (this.config.offColor) {
        this.options.offColor = this.config.offColor
      }
      if (this.config.h) {
        this.options.h = this.config.h
      }
      if (this.config.placeholderImg) {
        this.options.placeholderImg = this.config.placeholderImg
      }
    }
  },
  mounted() {
    this.commonInit()
  },
  destroyed() {
    this.stopTimer()
  }
}
</script>

<style lang="scss" scoped>
.slider_wraper {
  position: relative;
  overflow: hidden;
  .slider_box {
    overflow: hidden;
    height: 150px;
    position: relative;
    .item {
      display: block;
      float: left;
      position: relative;
      img {
        display: block;
        width: 100%;
      }
      .placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    &:after {
      content: '';
      clear: both;
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .page_box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .page_dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0px 4px;
    }

    .on {
      background: red;
    }

    .off {
      background: white;
    }
  }
}
</style>

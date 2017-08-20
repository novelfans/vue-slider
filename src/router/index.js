import Vue from 'vue'
import Router from 'vue-router'
import Ganhuo from '@/components/ganhuo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Ganhuo
    },
    {
      path: '/ganhuo',
      name: 'ganhuo',
      component: Ganhuo
    }
  ]
})

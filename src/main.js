import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import {
  MessageBox,
  Message
} from 'element-ui'
import '@/icons' // icon
import '@/permission' // permission control

import Cookies from 'js-cookie'
import {login,logout} from '@/api/user'



/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/* import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
} */

// set ElementUI lang to EN
Vue.use(ElementUI, { zhLocale })

Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
   created(){
     const data = {
      username: Cookies.get('plun'),
      password: Cookies.get('plps')
     }
    if(data.username && data.password){
     var rs=Cookies.get('plrx')
      console.log(rs)
      console.log( Cookies.get('plrx') == "undefined")
      if(Cookies.get('plrx') =="undefined"){
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        store.dispatch('user/resetToken')
      }else{
        login(data).then(res => {
          console.log(res.flag)
          if(!res.flag){
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            store.dispatch('user/resetToken')
          }
        }).catch(res => {
          Message({
            message:res.msg,
            type:'error',
            duration: 5 * 1000
          })
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          store.dispatch('user/resetToken')
        })
      }
    }
    /* let routes = JSON.parse(localStorage.getItem('routes'))
    if(routes){
      console.log(routes)
      router.addRoutes(routes)
      router.options.routes[3]=routes[0]
    } */
   /*  let routes = store.getters.wy
    routes.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    router.addRoutes(routes)
    global.antRouter = router.options.routes.concat(routes) // 将路由数据传递给全局变量，做侧边栏菜单渲染工作

    console.log(router.options.routes) */
  }
})

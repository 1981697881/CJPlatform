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
      username: Cookies.get('un'),
      password: Cookies.get('ps')
     }
    if(data.username && data.password){
      console.log(Cookies.get('rx')==undefined||Cookies.get('rx')=="")
      if(Cookies.get('rx')==undefined){
        logout()
        this.$router.push(`/login`)
        store.dispatch('user/resetToken')
      }else{
        login(data).then(res => {
          console.log(res)
        }).catch(() => {
          Message({
            message:res.msg,
            type:'error',
            duration: 5 * 1000
          })
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

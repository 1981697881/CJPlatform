import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { addRouter } from './utils/addRouter'// 格式化菜单data
import { getRouter } from '@/api/wy/menu'// 格式化菜单data


NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
var hasMenu = false//是否有路由 *
router.beforeEach(async (to, from, next) => {
  // start progress bar 加载进度条
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken('plrx')
  if (typeof(hasToken)!='undefined') {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      console.log(hasMenu)
      if (hasMenu) {
        // 获取了动态路由 hasMenu一定true,就无需再次请求 直接放行
        const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getPermissions')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
      } else {
        // hasMenu为false,一定没有获取动态路由,就跳转到获取动态路由的方法
        gotoRouter(to, next)
      }
     /*   */
    }
  } else {
    hasMenu = false
    /* has no token*/
   /* console.log(to.path)
    console.log(whiteList.indexOf(to.path) !== -1)*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
function gotoRouter(to, next) {
  getRouter(store.getters.token) // 使用useid获取路由
    .then(res => {
      // console.log('解析后端动态路由', res.data)
      res.data[0].map(val=>{
        val.type = 1
      })
      // console.log('解析后端动态路由', res.data)
      const asyncRouter = addRouter(res.data[0]) // 进行递归解析
      // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
      asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
      // console.log(asyncRouter)
      return asyncRouter
    })
    .then(asyncRouter => {
      router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
      for(var i = 0;i<asyncRouter.length;i++){
        router.options.routes[3+i] = asyncRouter[i] // addRoutes不会更新视图
      }
      hasMenu = true // 记录路由获取状态
      store.dispatch('menu/setRouterList', asyncRouter) // 存储到vuex
      store.dispatch('permission/generateRoutes',router.options.routes)
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
    .catch(e => {
      store.dispatch('user/resetToken')
    })
}

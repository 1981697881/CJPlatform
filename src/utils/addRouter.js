import _router from '../router/router' // 获取组件的方法

/**
 * 生成路由
 * @param {Array} routerlist 格式化路由
 * @returns
 */
import Layout from '@/layout'
export function addRouter(routerlist) {
  const router = []
  routerlist.forEach(e => {
    let e_new = {
      path:  e.id == '/' ? '/' :(e.id && "/"+e.id || 'norouter-'+e.fid),
      component: e.type==1?_router('Layout'):_router(e.id || 'error'),
    }
    if(e.id == '/'){
      e_new.redirect = '/dashboard'
      e_new.component = Layout
      e_new.path = '/'
    }else if(e.id == 'dashboard'){
      e_new.path = 'dashboard'
      e_new.name = 'Dashboard'
    }else{
      e_new.name = e.text
    }
    if (e.redirect) { // 重定向
      e_new = Object.assign({}, e_new, { redirect: e.redirect })
    }
    if(e.id != '/'){
      if (e.text == '主页') {// meta
        e_new = Object.assign({}, e_new, {
          meta: { title: e.text, icon: 'dashboard', ffix: true }
        })
      }else{
        e_new = Object.assign({}, e_new, {
          meta: { title: e.text, icon: '' }
        })
      }
    }
    if(e.id != 'dashboard'){
      if (e.children) { // 下级
        e_new = Object.assign({}, e_new, { children: addRouter(e.children) })
      }
    }
    e_new.component = e_new.component || _router('error')
    router.push(e_new)
  })
  return router
}

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true ,
      }
    }]
  },
  /* {
    path: '/wy',
    component: Layout,
    redirect: '/wy/resource',
    name: 'Wy',
    meta: {
      title: '物业管理系统',
      icon: 'nested'
    },
    children: [{
        path: 'resource',
        component: () => import('@/views/wy/resource/index'),
        name: 'Resource',
        meta: {
          title: '资源管理'
        },
        children: [{
            path: 'houses',
            component: () => import('@/views/wy/resource/houselist/index'),
            name: 'Houses',
            meta: {
              title: '房产资料'
            },
          },
          {
            path: 'clients',
            component: () => import('@/views/wy/customer/clientlist/index'),
            name: 'Clients',
            meta: {
              title: '客户管理'
            }
          },
          {
            path: 'carPark',
            component: notpage,
            name: 'CarPark',
            meta: {
              title: '车位管理'
            }
          },
        ]
      },
      {
        path: 'lease',
        component: notpage,
        name: 'Lease',
        meta: {
          title: '租赁管理'
        },
        children: [{
            path: 'lease-manage',
            component: notpage,
            name: 'Lease-manage',
            meta: {
              title: '租赁合同'
            }
          },
          {
            path: 'lease-contract',
            component: notpage,
            name: 'Lease-contract',
            meta: {
              title: '返租合同'
            }
          }
        ]
      },
      {
        path: 'finance',
        component: notpage,
        name: 'Finance',
        meta: {
          title: '财务管理'
        },
        children: [{
            path: 'receipt-standard',
            component: notpage,
            name: 'Receipt-standard',
            meta: {
              title: '收费标准'
            }
          },
          {
            path: 'receipt-manage',
            component: notpage,
            name: 'Receipt-manage',
            meta: {
              title: '收款管理'
            }
          },
          {
            path: 'payables',
            component: notpage,
            name: 'Payables',
            meta: {
              title: '应付管理'
            }
          },
          {
            path: 'receivable',
            component: notpage,
            name: 'Receivable',
            meta: {
              title: '应收管理'
            }
          }
        ]
      },
    ]
  }, */
  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/wy': () => import('@/layout'), // 1 - 物业管理
  'resource': () => import('@/views/wy/resource/index'), // 2 - 物业管理/资源管理
  'houselist': () => import('@/views/wy/resource/houselist/index'), // 3 - 物业管理/资源管理 - 房产资料
  'carlist': () => import('@/views/wy/resource/carlist/index'), // 3 - 物业管理/资源管理 - 车位管理
  'customer': () => import('@/views/wy/customer/index'), // 2 - 物业管理/客户管理
  'clientlist': () => import('@/views/wy/customer/clientlist/index'), // 3 - 物业管理/客户管理 - 客户资料

  '/sy': () => import('@/layout'), // 1 - 商业管理
  'lease': () => import('@/views/sy/lease/index'), // 2 - 商业管理/租赁管理
  'leaselist': () => import('@/views/sy/lease/leaselist/index'), // 3 - 商业管理/租赁管理 - 租赁合同
  'property': () => import('@/views/sy/lease/property/index'), // 3 - 商业管理/租赁管理 - 租赁合同

  '/zy': () => import('@/layout'), // 1 - 商业管理
  'merchants': () => import('@/views/zy/merchants/index'), // 2 - 商业管理/租赁管理
  'organization': () => import('@/views/zy/merchants/organization/index'), // 3 - 商业管理/租赁管理 - 租赁合同

  '/cw': () => import('@/layout'), // 1 - 财务中心
  'finance': () => import('@/views/cw/finance/index'),// 2 - 财务中心/财务管理
  'rateslist': () => import('@/views/cw/finance/rateslist/index') // 2 - 财务中心/财务管理 - 收费标准

}

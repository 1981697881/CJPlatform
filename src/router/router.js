export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/resource': () => import('@/layout'), // 1 - 物业管理

  'clientlist': () => import('@/views/resource/commoditylist/index'), // 3 - 物业管理/客户管理 - 客户资料

  '/system': () => import('@/layout'), // 1 - 商业管理
  'organization': () => import('@/views/system/users/index'), // 3 - 商业管理/租赁管理 - 租赁合同

}

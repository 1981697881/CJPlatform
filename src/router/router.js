export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'resource': () => import('@/views/resource/index'),
  'dashboard': () => import('@/views/dashboard/index'),

  'commodity': () => import('@/views/resource/commoditylist/index'),
  'rate': () => import('@/views/resource/ratelist/index'),
  'stock': () => import('@/views/resource/stocklist/index'),
  'warehouse': () => import('@/views/resource/warehouse/index'),

  'indent': () => import('@/views/indent/index'),
  'returns': () => import('@/views/indent/returns/index'),
  'sales': () => import('@/views/indent/sales/index'),

  'system': () => import('@/views/system/index'),
  'permissions': () => import('@/views/system/permissions/index'),
  'users': () => import('@/views/system/users/index'),
  'journal': () => import('@/views/system/journal/index')
}

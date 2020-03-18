import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询仓库列表
export function warehouseList(data) {
  // 查询分页数据
  const url = '/Admin/warehouse/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    url: url,
    method: 'get',
  })
}
// 修改仓库信息
export function alterWarehouse(form) {
  const data = form
  return request({
    url: '/cjsh-system-config/update',
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data
  })
}
// 查询仓库信息
export function queryWarehouse(params) {
  return request({
    url: '/cjsh-system-config/findValueByConfigName',
    headers: {
      'authorization': getToken('plrx')
    },
    method: 'get',
    params: params
  })
}

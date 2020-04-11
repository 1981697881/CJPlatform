import request from '@/utils/request' // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function usersList(data, query) {
  // 查询分页数据
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}

// 下拉用户角色
export function getRoles(data) {
  const url = '/Admin/role/list'
  return request({
    headers: {
      'authorization': getToken('plrx')
    },
    url: url,
    method: 'get'
  })
}
// 新建用戶
export function saveUsers(data) {
  const url = '/Admin/user/add'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 查询用户信息
export function getUsers(data) {
  const url = '/Admin/user/getById/' + data
  return request({
    headers: {
      'authorization': getToken('plrx')
    },
    url: url,
    method: 'get'
  })
}
// 修改保存用户
export function updateUsers(data) {
  const url = '/Admin/user/update'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 重置密码
export function resetPWD(data) {
  const url = '/Admin/user/reset'
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 下拉平台
export function getPlas(data) {
  const url = '/Admin/pla/list'
  return request({
    headers: {
      'authorization': getToken('plrx')
    },
    url: url,
    method: 'get'
  })
}
// 导出
export function exportUsersData(data) {
  const url = '/excel/export/userData'
  return request({
    headers: {
      'authorization': getToken('plrx')
    },
    responseType: 'blob',
    url: url,
    method: 'get',
  })
}

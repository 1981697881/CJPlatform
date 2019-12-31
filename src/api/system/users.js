import request from '@/utils/request' // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function usersList(data) {
  // 查询分页数据
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('rx')
    },
    url: url,
    method: 'get'
  })
}

// 下拉用户角色
export function getRoles(data) {
  const url = '/Admin/role/list'
  return request({
    headers: {
      'authorization': getToken('rx')
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
      'authorization': getToken('rx'),
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
      'authorization': getToken('rx')
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
      'authorization': getToken('rx'),
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
      'authorization': getToken('rx')
    },
    url: url,
    method: 'get'
  })
}

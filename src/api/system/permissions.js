import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询角色列表
export function permissionsList(data) {
  //查询分页数据
  const url = '/Admin/role/list'
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}
// 新建角色
export function saveRoles(data) {
  const url = '/Admin/role/add'
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
export function getRoles(data) {
  const url = '/Admin/role/' + data
  return request({
    headers: {
      'authorization': getToken('rx')
    },
    url: url,
    method: 'get'
  })
}
// 修改保存角色
export function updateRoles(data) {
  const url = '/Admin/role/update'
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
//获取菜单树
export function getSysMenuTree() {
  const url = '/Admin/getSysMenuTree'
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}
//获取角色菜单树
export function getRoleMenu(data) {
  const url = '/Admin/getRoleMenu'
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
    params:{rid:data}
  })
}
//保存权限
export function addRoleMenu(data) {
  const url = '/Admin/addRoleMenu'
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
// 下拉
export function getPermission(data) {
  const url = '/Admin/permission/list'
  return request({
    headers: {
      'authorization': getToken('rx')
    },
    url: url,
    method: 'get'
  })
}

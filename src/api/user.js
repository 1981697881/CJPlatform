import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth' // get token from cookie
export function login(data) {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(fid) {
  return request({
    url: '/back/system/user/selectUserInfoById.do',
    method: 'post',
    params: { fid }
  })
}
// 获取用户信息
export function getPermissions() {
  return request({
    url: '/cjsh-permission/getPermissions',
    headers: {
      'authorization': getToken('plrx'),
    },
    method: 'get',
  })
}
export function logout(data) {
  return request({
    url: '/back/system/user/login_out.do',
    method: 'post',
  })
}
// 修改密码
export function changePassword(data) {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'authorization': getToken('plrx'),
    },
    url: '/user/changePassword',
    method: 'put',
    data
  })
}

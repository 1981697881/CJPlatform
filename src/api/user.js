import request from '@/utils/request'

export function login(data) {
  
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    },
    url: '/back/system/user/login.do',
    method: 'post',
    params:data
  })
}

export function getInfo(fid) {
  return request({
    url: '/back/system/user/selectUserInfoById.do',
    method: 'post',
    params: { fid }
  })
}

export function logout(data) {
  return request({
    url: '/back/system/user/login_out.do',
    method: 'post',
  })
}

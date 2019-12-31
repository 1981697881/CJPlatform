import request from '@/utils/request'

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

export function logout(data) {
  return request({
    url: '/back/system/user/login_out.do',
    method: 'post',
  })
}

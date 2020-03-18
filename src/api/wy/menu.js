import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

export function getRouter(userId) {
  const data = {
    userId: userId
  }
  return request({
    url: '/sysMenu/getUserMenu',
    method: 'get',
    headers: {
      'authorization': getToken('plrx'),
    },
  })
}

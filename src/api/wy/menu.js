import request from '@/utils/request'

export function getRouter(userId) {
  const data = {
    userId: userId
  }
  return request({
    url: '/back/system/jur/getUserMenu.do',
    method: 'post',
    data
  })
}

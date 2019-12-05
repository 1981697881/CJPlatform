import request from '@/utils/request'

export function getRouter(userId) {
  const data = {
    userId: userId
  }
  console.log(request({
    url: '/back/system/jur/getUserMenu.do',
    method: 'post',
    data
  }))
  return request({
    url: '/back/system/jur/getUserMenu.do',
    method: 'post',
    data
  })
}

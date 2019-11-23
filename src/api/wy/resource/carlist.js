import request from '@/utils/request' //引入封装好的axios请求

export function getSpaceList(data) {
  return request({
    url: '/back/park/getSpaceList.do',
    method: 'post',
    data
  })
}

//主键获取车位信息
export function getSpaceById(data) {
  return request({
    url: "/back/park/getSpaceById.do",
    method: 'post',
    data
  })
}

//新增车位
export function saveSpace(data) {
  return request({
    url: "/back/park/saveSpace.do",
    method: 'post',
    data
  })
}

//修改车位
export function updateSpaceBase(data) {
  return request({
    url: "/back/park/updateSpaceBase.do",
    method: 'post',
    data
  })
}

export function deleteSpaceByIds(data) {
  return request({
      headers:{
          'Content-Type':'application/json'
      },
    url: "/back/park/deleteSpaceByIds.do",
    method: 'post',
    data
  })
}

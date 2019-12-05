import request from '@/utils/request' //引入封装好的axios请求

export function getHousesTree(prId, type, userId) {
  const data = {
    prId: prId,
    type: type == null ? 0 : type,
    userId: userId
  }
  return request({
    url: '/back/base/res/treeList.do',
    method: 'post',
    data
  })
}

export function getCarTree(type,userId,prId){
  const data = {
    type: type == null ? 0 : type,
    userId: userId,
    prId:prId
  }
  return request({
    url:"/back/park/treeList.do",
    method: 'post',
    data
  })
}

export function deptTree(prId, type, userId){
  const data = {
    prId: prId,
    type: type == null ? 0 : type,
    userId: userId
  }
  return request({
    url: '/back/system/dept/deptTree.do',
    method: 'post',
    data
  })
}
export function getJurisdiction(jurisdictionId,type) {
  const data = {
    jurisdictionId: jurisdictionId == null ? 1 : jurisdictionId,
    type: type == null ? 1 : type,
  }
  return request({
    url: '/back/system/jur/getJurisdictionTree.do',
    method: 'post',
    data
  })
}
export function getReceiveItemFormatList(){
  return request({
    url: '/back/fin/receive/getReceiveItemFormatList.do',
    method: 'post',
  })
}


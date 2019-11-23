import request from '@/utils/request' //引入封装好的axios请求

// 主键获取楼盘
export function getBuildById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/getBuildById.do',
    method: 'post',
    data
  })
}

// 主键获取楼栋
export function getTowerById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/getTowerById.do',
    method: 'post',
    data
  })
}

// 主键获取楼层
export function getFloorById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/getFloorById.do',
    method: 'post',
    data
  })
}

// 新增/修改楼盘
export function saveBuild(form) {
  const data = form
  return request({
    url: '/back/base/res/saveBuild.do',
    method: 'post',
    data
  })
}

// 批量新增楼盘
export function saveEstate(form) {
  
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
    }],
    url: '/back/base/res/saveEstate.do',
    method: 'post',
    data:form
  })
}

// 新增/修改楼栋
export function saveBuildTower(form) {
  const data = form
  return request({
    url: '/back/base/res/saveBuildTower.do',
    method: 'post',
    data
  })
}

// 新增/修改楼层
export function saveBuildFloor(form) {
  const data = form
  return request({
    url: '/back/base/res/saveBuildFloor.do',
    method: 'post',
    data
  })
}

// 通过楼栋获取所有楼层/单元 和房间 和客户
export function getUnitByTowerId(towerId, pageNum, pageSize) {
  const data = {
    towerId: towerId,
    pageNum: pageNum || 1,
    pageSize: pageSize || 5
  }
  return request({
    url: 'rx/base/res/getUnitByTowerId.do',
    method: 'post',
    data
  })
}

// 通过房间id获取房间信息
export function getUnitById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: 'rx/base/res/getUnitById.do',
    method: 'post',
    data
  })
}

// 通过客户Id获取租户/业主资料
export function getCustomerById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/cus/getCustomerById.do',
    method: 'post',
    data
  })
}

// 保存房产信息
export function saveBuildUnit(form) {
  const data = form
  return request({
    url: '/back/base/res/saveBuildUnit.do',
    method: 'post',
    data
  })
}

// 保存业主/租户资料
export function saveCustomer(form) {
  const data = form
  return request({
    url: '/back/base/cus/saveCustomer.do',
    method: 'post',
    data
  })
}

//删除  ----  楼盘 楼栋 楼层 单元
export function deleteBuildById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/deleteBuildById.do',
    method: 'post',
    data
  })
}

export function deleteTowerById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/deleteTowerById.do',
    method: 'post',
    data
  })
}

export function deleteFloorById(fid) {
  const data = {
    fid: fid
  }
  return request({
    url: '/back/base/res/deleteFloorById.do',
    method: 'post',
    data
  })
}

export function deleteUnitById(fid) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
    }],
    url: '/back/base/res/deleteUnitByIds.do',
    method: 'post',
    data: {
      'ids': fid
    }
  })
}

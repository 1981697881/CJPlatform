import request from '@/utils/request' // 引入封装好的axios请求
import {
  jsonp
} from '@/utils/jsonp' // 引入封装好的jsonp

//租赁合同列表
export function rentContractList(data) {
  return jsonp('/back/lease/rentContractList.do', data)
}

//获取合同详情-获取的是房产？？？？？？？？？？？
export function getRentContract(data) {
  return request({
    url: '/back/lease/getRentContract.do',
    method: "post",
    data
  })
}

//主键获取合同详情 - 客户信息
export function getCustomerById(data) {
  return request({
    url: "/back/base/cus/getCustomerById.do",
    method: "post",
    data
  })
}

// 保存 || 修改合同
export function saveRentContract(data) {
  return request({
    headers: {
      "Content-Type": "application/json"
    },
    url: "/back/lease/saveRentContract.do",
    method: "post",
    data
  })
}

//主键删除合同
export function deleteContract(data){
  return request({
    url:"/back/lease/deleteContract.do",
    method:"post",
    data
  })
}

//审核
export function auditRentContract(data){
  return request({
    url:"/back/lease/auditRentContract.do",
    method:"post",
    data
  })
}

//启用
export function startRentContract(data){
  return request({
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    url:"/back/lease/startRentContract.do",
    method:"post",
    data
  })
}

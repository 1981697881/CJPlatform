import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function commodityList(data) {
  //查询分页数据
  const url = '/cjsh-goods/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}
// 修改商品信息
export function alterCommodity(form) {
  const data = form
  return request({
    url: '/Admin/Goods/update',
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data
  })
}

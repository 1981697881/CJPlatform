import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询订单列表
export function commodityList(data, query) {
  //查询分页数据
  const url = '/cjsh-goods/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 修改商品信息
export function alterCommodity(form) {
  const data = form
  return request({
    url: '/Admin/Goods/update',
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data
  })
}
// 刪除圖片
export function delImg(form) {
  const data = form
  return request({
    url: '/file/Goods/deleteImg',
    headers: {
      'authorization': getToken('plrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}
// 导出
export function exportCommodityData(data) {
  const url = '/excel/export/goodsData/' + data
  return request({
    headers: {
      'authorization': getToken('plrx'),
    },
    responseType: 'blob',
    url: url,
    method: 'get',
  })
}

import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询库存
export function stockList(data) {
  //查询分页数据
  const url = '/cjsh-stock-info/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('rx'),
    },
    url: url,
    method: 'get',
  })
}

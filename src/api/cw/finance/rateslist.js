import request from '@/utils/request' // 引入封装好的axios请求
import { jsonp } from '@/utils/jsonp' // 引入封装好的jsonp

export function finReceiveItemList(data){
    return jsonp('/back/fin/receive/finReceiveItemList.do',data)
}
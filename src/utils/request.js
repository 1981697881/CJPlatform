import axios from 'axios'
import qs from 'qs'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import querystring from 'querystring'
// create an axios instance

const service = axios.create({
  baseURL: (process.env.NODE_ENV === 'production'?'http://test.gzfzdev.com:8080':'')+process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})
console.log( ((process.env.NODE_ENV === 'production'?'http://test.gzfzdev.com:8080':'')+process.env.VUE_APP_BASE_API))
window.apiUrl = service.defaults.baseURL
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    /* console.log('process.env.VUE_APP_BASE_API',process.env.VUE_APP_BASE_API)
    console.log('process.env.NODE_ENV',process.env.NODE_ENV) */
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation

      // config.headers['X-Token'] = getToken()
    }
    if (config.headers['Content-Type'] != "application/json") {
      config.data = querystring.stringify(config.data)
    }else{
      //config.data = JSON.stringify(config.data)
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    // console.log(response)
    if (response.status !== 200) {

      Message({
        message: res.msg || '操作失败',
        type: 'error',
        duration: 5 * 1000
      })

      /* if(res.status === 10){//需要重新登录
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } */

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if(res.msg!="登陆成功" && res.msg!=null){
        if(res.status==20000){
          Message({
            message:res.msg,
            type:'success',
            duration: 5 * 1000
          })
        }else{
          Message({
            message:res.msg,
            type:'error',
            duration: 5 * 1000
          })
        }
      }
      store.dispatch('user/addToken',response.headers.authorization).then(() => {

      })
      if(typeof(response.headers['content-disposition']) !='undefined'){
        if(response.headers['content-disposition'].search('attachment')!=-1){
          return response
        }
      }else{
        return res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

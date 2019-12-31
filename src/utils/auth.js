import Cookies from 'js-cookie'

const TokenKey = 'rx'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(username){
  return Cookies.set('un',username)
}
export function setPassword(password){
  return Cookies.set('ps',password)
}

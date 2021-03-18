/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-17 10:00:01
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-18 11:50:39
 */
import Cookies from 'js-cookie'

const TokenKey = 'x-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

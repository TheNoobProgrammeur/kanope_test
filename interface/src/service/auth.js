import { Loading, LocalStorage } from 'quasar'

let authStatus = false

export const isAuth = () => {
  return LocalStorage.getItem('isAuth') || false;
}

export const login = () => {
  LocalStorage.set('isAuth', true)
}

export const logout = () => {
  LocalStorage.set('isAuth', false)
}

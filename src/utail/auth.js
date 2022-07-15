import storage from './storage'
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
export const setToken = (value) => storage.set(TOKEN_KEY, value)
export const getToken = () => storage.get(TOKEN_KEY)
export const removeToken = () => storage.remove(TOKEN_KEY)

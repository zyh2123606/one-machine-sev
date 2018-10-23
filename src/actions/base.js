import {CHECK_AUTH, SET_URL_TAG} from '../constants'

//检查权限
export const checkAuth = hasAuth => ({type: CHECK_AUTH, hasAuth})
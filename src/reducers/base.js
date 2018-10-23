import {CHECK_AUTH, SET_URL_TAG} from '../constants'

export default (state={hasAuth: false}, action) => {
	const {hasAuth=false, url_tag='/', callback, type} = action
	switch(type){
		case CHECK_AUTH:
			state.hasAuth = hasAuth
			break;
        case SET_URL_TAG:
            state.url_tag = url_tag
            callback && callback()
            break
		default:
			break
	}
	return state
}
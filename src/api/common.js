import axios from '../request/http'
let baseURL = process.env.VUE_APP_BASEURL

//公用
const commonApi = {
	common: {
		//上传
		uploadFile(params, config) {
			return axios.post(baseURL + 'rest/menu/insertMenu', params, config)
		}
	}
}
export default commonApi

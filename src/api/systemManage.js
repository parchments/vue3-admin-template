import axios from '../request/http'
let baseURL = process.env.VUE_APP_BASEURL

//系统管理
const systemManageApi = {
	systemManage: {
		//列表
		getList(params) {
			return axios.post(baseURL + 'rest/menu/insertMenu', params)
		},
		//新增
		add(params) {
			return axios.post(baseURL + 'rest/menu/insertMenu', params)
		},
		//编辑
		edit(params) {
			return axios.post(baseURL + 'rest/menu/insertMenu', params)
		},
		//修改密码
		changePassword(params) {
			return axios.post(baseURL + 'rest/menu/insertMenu', params)
		}
	}
}
export default systemManageApi

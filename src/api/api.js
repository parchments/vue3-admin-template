//接口地址
import systemManageApi from './systemManage' //系统管理
import commonApi from './common' //公用接口

const api = {
	...systemManageApi,
	...commonApi
}
export default api

/**
 * 封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router/index'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
let toLogin = () => {
	router.push({
		path: '/login',
		query: {
			redirect: router.currentRoute.fullPath
		}
	})
}

// 创建axios实例
let instance = axios.create({
	timeout: 3000000, //请求超时时间
});

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
	config => {
		//登录流程控制中，根据本地是否存在token判断用户的登录情况
		//但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
		//后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
		//而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
		//用户信息
		let userInfo = '';
		if (localStorage.userInfo) {
			userInfo = localStorage.userInfo
		} else {
			userInfo = '';
		}

		//token
		let token = '';
		if (localStorage.token) {
			token = localStorage.token
		} else {
			token = '';
		}
		//设置统一请求头
		config.headers = {
			'Content-Type': 'application/json',
			'token': token,
			'userInfo': userInfo
		}
		return config;
	},
	error => Promise.error(error)
)

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
let errorHandle = (status, other) => {
	//状态码判断
	switch (status) {
		case 400:
			console.log('客户端请求的语法错误，服务器无法理解')
			break;
		case 401:
			// ViewUI.Message.error('请重新登录');
			localStorage.clear();
			setTimeout(() => {
				toLogin(); //跳转到登录
			}, 3000);
			break;
		case 404:
			break;
		case 408:
			break;
		case 500:
			console.log(other);
			// ViewUI.Message.error('网络异常,稍后重试');
			break;
		default:
			console.log(other);
	}
}

//响应拦截器
instance.interceptors.response.use(
	//请求成功
	res => {
		if (res.status === 200) {
			return Promise.resolve(res) //Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
		} else {
			console.log("响应拦截器失败");
			return Promise.reject(res) //Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象。
		}
	},
	//请求失败
	error => {
		//return Promise.reject(error);
		const { response } = error;
		if (response) {
			//请求已发出，但是不在2xx的范围    ------错误处理、token过期等
			console.log(response);
			errorHandle(response.status, response.data.message);
			return Promise.reject(response);
		} else {
			// 处理断网的情况
			// ViewUI.Message.error('网络异常,稍后重试');
		}
	}
);
export default instance;

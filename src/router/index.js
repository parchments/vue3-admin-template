import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/layout/home.vue'),
		children: [{
			path: '/index',
			name: 'index',
			component: () => import('../views/layout/index/index.vue')
		},{
			path: '/accountList',
			name: 'accountList',
			component: () => import('../views/layout/accountList/accountList.vue')
		},{
			path: '/accountList/detail',
			name: 'detail',
			component: () => import('../views/layout/detail/detail.vue')
		}]
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router

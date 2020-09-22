<template>
	<div>
		<h3>请求参数id为{{id}}的数据</h3>
		<router-link to="/accountList">返回列表</router-link>
	</div>
</template>

<script>
	import { reactive, toRefs, getCurrentInstance } from 'vue'
	import { useRoute } from 'vue-router'
	export default {
		name: 'detail',
		components: {

		},
		setup(props,context) {
			const state = reactive({
				id: ''
			})
			const { ctx } = getCurrentInstance();//获取实例
			const { query } = useRoute();//获取路由参数
			console.log(query)
			state.id = query.id;
			console.log('详情',ctx,context)
			//setup函数的返回值 导出
			return {
				...toRefs(state)
			}
		}
	}
</script>

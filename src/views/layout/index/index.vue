<template>
	<div style="padding-top: 100px;">
		<h2>首页内容</h2>
		<img src="../../../assets/logo.png" alt="">
	</div>
</template>

<script>
	import { reactive, toRefs, getCurrentInstance } from 'vue'
	export default {
		name: 'index',
		// components: {

		// },
		setup() {
			const state = reactive({
				
			})
			//获取当前路由实例
			const { ctx } = getCurrentInstance();
			console.log(ctx)
			//setup函数的返回值 导出
			return {
				...toRefs(state)
			}
		}
	}
</script>

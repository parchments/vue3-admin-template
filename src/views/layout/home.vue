<template>
	<div>
		<Nav />
		<router-view></router-view>
		<br/>
		<br/>
		<br/>
		<br/>
		<a-button @click="back()">退出登录</a-button>
	</div>
</template>

<script>
	// import { reactive } from '@vue/composition-api' //会提示报错 export 'default' (imported as 'Vue') was not found in 'vue'
	import { reactive,toRefs,getCurrentInstance } from 'vue' //vue-cli 4.5.4 之后vue3.0集成了@vue/composition-api
	import Nav from '../../components/nav.vue'
	export default {
		name: 'home',
		components: {
			Nav
		},
		
		//始化数据,介于beforeCreate与created之间，相当于beforeCreate、created的合并
		setup(props,context) {
			console.log(props,context);
			//函数  默认两个属性props,context 属性和上下文   setup函数中无法访问到this   
			//创建处理响应式数据对象 类似date  需要先导入
			const state = reactive({
				
			})
			//获取当前路由实例
			//Vue 3.0 中通过 getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文，ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息
			const { ctx } = getCurrentInstance();
			//登录方法
			const back =() => {
				ctx.$router.push('/login');
			}
			//setup函数的返回值 导出
			return {
				...toRefs(state),
				back
			}
		}
	}
</script>

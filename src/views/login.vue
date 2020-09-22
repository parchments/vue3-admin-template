<template>
	<div class="box">
		<h1>登录</h1>
		<h2>{{name}}</h2>
		<a-form class="form" layout="inline">
			<a-form-item label="账号">
				<a-input v-model:value="account" type="text" placeholder="请输入账号"/>
			</a-form-item>
			<a-form-item label="密码">
				<a-input v-model:value="password" type="password" placeholder="请输入密码"/>
			</a-form-item>
			<h3>输入账号密码，{{count}} 秒后登录</h3>
			<a-button @click="login()" block :disabled="account === '' || password === ''" type="primary">登录</a-button>
		</a-form>
	</div>
</template>

<script>
	//vue-cli 4.5.4创建的3.0
	// import { reactive } from '@vue/composition-api' //会提示报错 export 'default' (imported as 'Vue') was not found in 'vue'
	import { reactive, toRefs, getCurrentInstance, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured} from 'vue' //vue-cli 4.5.4 之后vue3.0集成了@vue/composition-api
	export default {
		name: 'login',
		components: {
			
		},
		// created() {
		// 	console.log('this',this)
		// },
		//始化数据,介于beforeCreate与created之间，相当于beforeCreate、created的合并
		setup(context) {
			//setup(props,context)函数  默认两个属性props,context 属性和上下文   setup函数中无法访问到this   
			//context包含context.attrs slots、emit  可以直接使用解构写法setup(props,{root})
			//创建处理响应式数据对象 类似date  需要先导入
			const state = reactive({
				count: 3,
				name: '我是响应式数据name',
				account: '',//账号
				password: ''//密码
			})
			//获取当前路由实例
			//Vue 3.0 中通过 getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文，ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息
			const { ctx } = getCurrentInstance();
			console.log('context',context)
			console.log('ctx',ctx)
			//登录方法
			const login = () => {
				// state.count++;
				
				console.log(ctx);
				let {account,password} = state;//对象解构
				if(account=== "" || password===""){
					alert('账号密码不能为空')
				}else{
					setInterval(()=>{
						state.count--;
					},1000)
					setTimeout(()=>{
						ctx.$router.push('/index');
					},3000);
				}
				// return
			}
			
			//以下是生命周期
			//组件挂载前
			onBeforeMount( () => {
				console.log('onBeforeMount，组件挂载前，相当于beforeMount')
			})
			//实例挂载完毕
			onMounted( () => {
				console.log('onMounted，实例挂载完毕，相当于mounted')
			})
			//响应式数据变化前
			onBeforeUpdate( () => {
				console.log('onBeforeUpdate，响应式数据变化前，相当于beforeUpdate')
			})
			//响应式数据变化完成
			onUpdated( () => {
				console.log('onUpdated，响应式数据变化完成 ，相当于updated')
			})
			//实例销毁前
			onBeforeUnmount( () => {
				console.log('onBeforeUnmount，实例销毁前 ，相当于beforeDestroy')
			})
			//实例已销毁
			onUnmounted( () => {
				console.log('onUnmounted，实例已销毁 ，相当于destroyed')
			})
			//错误数据捕捉
			onErrorCaptured( () => {
				console.log('onErrorCaptured，错误数据捕捉')
			})
			//setup函数的返回值 导出
			return {
				//...state,  //如果没有用toRefs方法的话，是不能把reactive创建出来的数据变成响应式数据的  需要响应式就是要加上toRefs 否则不需要
				...toRefs(state),//把reactive创建出来的数据变成响应式数据
				login
			}
		}
	}
</script>
<style lang="less" scoped>
	.box{
		width: 50%;
		margin: 0 auto;
		padding-top: 200px;
		.form{
			width: 60%;
			margin: 0 auto;
			padding-top: 30px;
		}
	}
</style>

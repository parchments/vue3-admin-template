vue的重要性可想而知，提前学习vue3.0，没毛病。本文会带大家了解vue3.0的构建工程、antd引入、生命周期、data双向数据绑定使用、方法使用、计算属性、监听、组件引入、组件传值、路由传值等知识点，本人菜鸟，大佬多多指导。废话少说，通过实操做一个登录、列表、详情界面直接上代码。

github源码： [https://github.com/parchments/vue3-admin-template](https://github.com/parchments/vue3-admin-template)

**效果预览：登录页、首页、列表页、详情页**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c1c21d7050f44598fcf01a447ac364a~tplv-k3u1fbpfcp-zoom-1.image)

**首页**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d77c1b46b0545a797369c9afb969386~tplv-k3u1fbpfcp-zoom-1.image)

**列表页**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e944b0f84204125a60072ab0f3eae30~tplv-k3u1fbpfcp-zoom-1.image)

**详情页**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34e60f658aa34f65855a949ab8229ec5~tplv-k3u1fbpfcp-zoom-1.image)

### 1、项目搭建

1.  安装node就不说咯，必备。此外需要安装vue-cli4代以上最新脚手架，可以通过执行如下npm 命令安装/更新脚手架版本

脚手架升级： npm update @vue/cli
初次安装：   npm i @vue/cli -g

根据自己需求选择需要预先安装的插件

vue create \[projectName\]

![](https://oscimg.oschina.net/oscnet/up-1e2a18a029958c140bb3b468bf5267b66ed.png)

![](https://oscimg.oschina.net/oscnet/up-1d77188e46a9f0ce288fd7edf7097d924b4.png)

![](https://oscimg.oschina.net/oscnet/up-0319119b41605400da3c3e87f84ac55283b.png)

![](https://oscimg.oschina.net/oscnet/up-1a0283b5d02c0370296c44b1c00e1a8944f.png)

![](https://oscimg.oschina.net/oscnet/up-28243b533921d214787184671d3aad1f90f.png)

![](https://oscimg.oschina.net/oscnet/up-ba6486086dcb0cfb8fe3935c1c9756968d1.png)

![](https://oscimg.oschina.net/oscnet/up-4a64e8cbc1cb8bde7f012678ca81b0a8189.png)

怎么知道自己正确安装了vue3.0，请看vue3.0的main.js，vue2.0引入vue是import Vue from 'vue'，vue3.0则是解构引入，看到解构引入代表此项目为vue3.0，干得漂亮，继续。。。

vue3.0全局挂载http、api、config

![](https://oscimg.oschina.net/oscnet/up-f61053f5360e7ebaf4241d409428038ebf6.png)

![](https://oscimg.oschina.net/oscnet/up-80778024032ea3a397bf6ec64661228e467.png)

顺便提一句，如果vue3.0+ts开发的话，全局挂载需要如下挂载方式

在文件 main.ts 添加 带有 + 符号后代码

//  main.ts
import { createApp } from "vue";
import App from "./App.vue";
\+ import axios from "axios";

const app = createApp(App);
\+ app.config.globalProperties.$http = axios;
app.mount("#app")
在文件 shims-vue.d.ts添加 带有 + 符号后代码

//  shims-vue.d.ts

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

\+ declare module "@vue/runtime-core" {
\+  import { AxiosInstance } from "axios";
\+  interface ComponentCustomProperties {
\+    $http: AxiosInstance;
\+  }
\+ }

![](https://oscimg.oschina.net/oscnet/up-1a75a32cc5f128cd86b1cf9eb7301d1949a.gif)![](https://oscimg.oschina.net/oscnet/up-89f278693ffc1df1f55e0b417534558eed6.gif)

# 2、安装并引入antd

$ npm i --save ant-design-vue@next
//需要按需引入的话安装插件 babel-plugin-import 然后配置 babel.config.js$ npm i --save babel-plugin-import

**完整引入**

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp();
app.config.productionTip = false;

app.use(Antd);

以上代码便完成了 Antd 的引入。需要注意的是，样式文件需要单独引入。

**局部导入组件**

import { createApp } from 'vue';
import { Button, message } from 'ant-design-vue';
import App from './App';

const app = createApp();
app.config.productionTip = false;

/\* Automatically register components under Button, such as Button.Group */
app.use(Button);

app.config.globalProperties.$message = message;

如果需要按需加载，则配置`ant-design-vue`

根目录打开`babel.config.js`文件，将里面的内容修改为

module.exports = {
  presets: \["@vue/cli-plugin-babel/preset"\],
  plugins: \[
    //以下是配置按需加载
    \[
      "import",
      { 
        libraryName: "ant-design-vue", 
        libraryDirectory: "es", 
        style: "css"//为true时加载的是less文件
      }
    \]
  \]
}

目前我是用全局引入的方式引入antd，大家根据自己需求引入即可。

# 3、页面布局

![](https://oscimg.oschina.net/oscnet/up-5afdcdd41303d82e14b02346c1736f363c9.png)

app.vue页面

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  text-align: center;
}
</style>

login页面: 涉及data定义，响应式数据、生命周期、方法调用、实例获取（即是vue2.x的this）

![](https://oscimg.oschina.net/oscnet/up-ac9fee55abcc53c2977cc4a487e0c44f4a8.png)

//login
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
		
		//始化数据,介于beforeCreate与created之间，相当于beforeCreate、created的合并
		setup() {
			//setup(props,context)函数  默认两个属性props,context 属性和上下文   setup函数中无法访问到this   
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
			console.log(toRefs)
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

看得出来跟vue2.x的结构已经有很大区别了，例如setup、方法使用等等，setup是Composition API的入口，Vue3.0提供的新属性，可以在setup中使用Composition API，在上文代码中我们在setup中通过reactive初始化了一个响应式数据，然后通过return返回了一个对象，对象中包含了声明的响应式数据和一个方法。  
 

setup函数有两个参数，分别是props和context, setup(props,context);

props组件外部传入进来的属性

export default {
  props: {
    title: {
      type: String
    }
  },
  setup(props) {
    //组件传入的值
    console.log(props.title)
  }
}

context是一个对象，里面包含了三个属性，分别是 attrs、slots、emit

attrs与Vue2.0的this.$attrs是一样的，即外部传入的未在props中定义的属性。对于attrs与props一样，我们不能对attrs使用es6的解构，必须使用attrs.name的写法。

slots对应的是组件的插槽，与Vue2.0的this.$slots是对应的,与props和attrs一样，slots也是不能解构的。

emit对应的是Vue2.0的this.$emit, 即对外暴露事件。

home.vue页面

![](https://oscimg.oschina.net/oscnet/up-0e5c5181a088f6b3bd925effb7caf816720.png)

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

![](https://oscimg.oschina.net/oscnet/up-70bd65774562c2de1545983d6b89e19738a.gif)![](https://oscimg.oschina.net/oscnet/up-5e06f9db46957e12bfcd8aeec49f509c855.gif)

index->index.vue页面

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

![](https://oscimg.oschina.net/oscnet/up-fba104401ce0c5309f5b6bdb513ba8a7224.gif)![](https://oscimg.oschina.net/oscnet/up-2258f13a2594ff99db3a0b9a9b93014825e.gif)

accountList.vue 列表页面（计算属性）

![](https://oscimg.oschina.net/oscnet/up-dc2864da0ad9a0bffff9585418171257af3.png)

<template>
	<div style="margin-top: 100px;">
		<ti :title="title"></ti>
		<h3>列表请求数据中...{{count}}秒后显示</h3>
		<a-table :data-source="list" :pagination="false" style="width: 60%; margin: 0 auto 30px;">
			<a-table-column key="account" title="account" data-index="account" />
			<a-table-column key="password" title="password" data-index="password" />
			<a-table-column key="action" data-index="action">
				<template v-slot="{record}">
					<span>
						<a @click="goToLink(record.id)">详情</a>
					</span>
				</template>
			</a-table-column>
		</a-table>
		<a-input type="text" v-model:value="leftValue" placeholder="leftValue" style="width: 100px;"/>
		<a-input type="text" v-model:value="rightValue" placeholder="rightValue" style="width: 100px;"/>
		<div>
			计算属性输出的结果是：{{resultValue}}
		</div>
		<!\-\- <div>
			<h2>Clicked {{ count }} times</h2>
			<h2>Watch Count is {{ watchCount }}</h2>
			<button @click="increase">Click</button>
		</div> -->
	</div>
</template>

<script>
	import {
		reactive,
		toRefs,
		getCurrentInstance,
		onMounted,
		computed
	} from 'vue'
	import title from './component/title.vue'
	export default {
		name: 'accountList',
		components: {
			'ti': title
		},
		setup(props, context) {
			console.log('propss,context', props, context)
			const state = reactive({
				title: '我是子组件的值', //子组件
				list: \[\],
				count: 3,
				leftValue: 0,
				rightValue: 0,
				//计算属性
				resultValue: computed(() => {
					return Number(state.leftValue) + Number(state.rightValue);
				})
			})
			// const count1 = ref(0);
			// const watchCount = ref(0);
			// function increase () {
			//   count1.value++;
			// };
			// watch( () => count1.value,
			// 	(val) => {
			// 		watchCount.value = val;
			// 	}
			// );
			//获取当前路由实例
			const {
				ctx
			} = getCurrentInstance();
			console.log('列表实例', ctx)

			function goToLink(index) {
				ctx.$router.push({
					path: '/accountList/detail',
					query: {
						id: index
					}
				})
			}

			function getList() {
				// axios请求
				let timer1 = setInterval(() => {
					state.count--;
					if (state.count < 1) {
						clearInterval(timer1)
						return
					}
				}, 1000)
				console.log('请求列表数据')
				//模拟异步请求
				let timer2 = setTimeout(() => {
					state.list = \[{
							id: 1,
							account: 'admin',
							password: '111111'
						},
						{
							id: 2,
							account: 'chushi',
							password: 'chushi-111'
						},
						{
							id: 3,
							account: 'six',
							password: '666'
						}
					\]
					clearTimeout(timer2)
				}, 2000)

				//以下为普通列表请求方法
				// async getList(params) {
				// 	state.loading = true;
				// 	try{
				// 		let res = await ctx.$api.systemManage.getList(params);
				// 		if (res.data.retcode === ctx.$config.RET\_CODE.SUCCESS\_CODE) {
				// 			let data = res.data.data;
				// 			if (data.length > 0) {
				// 				state.tableData = data;
				// 				state.paginationParams.pageSize = data.pageSize; //每页的数量
				// 				state.paginationParams.size = data.size; //当前页的数量
				// 				state.paginationParams.total = data.total; //总条数
				// 				state.paginationParams.pages = data.pages; //总页码数
				// 			} else {
				// 				state.tableData = \[\];
				// 			}
				// 		} else {
				// 			ctx.$Message.error('请求成功，暂无数据');
				// 		}
				// 		state.loading = false;
				// 	}catch(e){
				// 		state.loading = false;
				// 		ctx.$Message.error('暂无数据');
				// 		console.log(e);
				// 	}
				// }
			}
			onMounted(() => {
				getList();
			})
			//setup函数的返回值 导出
			return {
				...toRefs(state),
				goToLink,
			}
		}
	}
</script>

![](https://oscimg.oschina.net/oscnet/up-d046578cdf018f2f760c54da3c905bf5fbc.gif)![](https://oscimg.oschina.net/oscnet/up-729b847273b6eab5df7b5c77d9dee05b4cf.gif)

detail 详情页面（路由传参）

![](https://oscimg.oschina.net/oscnet/up-5e4ae81926638f376fb8467c6b15973f9cc.png)

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

相信大家对vue3.0基础用法有了初步的认识，菜鸟的我也在不断学习中，持续更新ing

官网文档：[https://composition-api.vuejs.org/zh/](https://composition-api.vuejs.org/zh/)
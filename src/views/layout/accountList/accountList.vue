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
		<!-- <div>
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
				list: [],
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
					state.list = [{
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
					]
					clearTimeout(timer2)
				}, 2000)

				//以下为普通列表请求方法
				// async getList(params) {
				// 	state.loading = true;
				// 	try{
				// 		let res = await ctx.$api.systemManage.getList(params);
				// 		if (res.data.retcode === ctx.$config.RET_CODE.SUCCESS_CODE) {
				// 			let data = res.data.data;
				// 			if (data.length > 0) {
				// 				state.tableData = data;
				// 				state.paginationParams.pageSize = data.pageSize; //每页的数量
				// 				state.paginationParams.size = data.size; //当前页的数量
				// 				state.paginationParams.total = data.total; //总条数
				// 				state.paginationParams.pages = data.pages; //总页码数
				// 			} else {
				// 				state.tableData = [];
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

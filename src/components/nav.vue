<template>
  <div class="nav">
    <router-link to="/index" tag="div" class="item">首页</router-link>
    <router-link to="/accountList" tag="div" class="item">账号列表</router-link>
  </div>
</template>

<script>
export default {
  name: 'nav',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.nav{
		margin: 20px;
		.item{
			margin: 20px;
			font-size: 20px;
			color: #ccc;
		}
		
		/deep/.router-link-active{
			color: #1890ff;
		}
	}
</style>

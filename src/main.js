import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import api from "./api/api"
import config from "./config/config"
import axios from './request/http'

const app = createApp(App)

//全局挂载  组件内通过const { ctx } = getCurrentInstance();获取
app.config.globalProperties.$api = api
app.config.globalProperties.$config = config
app.config.globalProperties.$axios = axios

app.use(Antd).use(store).use(router).use(api).mount('#app')
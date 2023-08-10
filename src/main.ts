import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
// 针对elementplus的ElMessage和ElLoading的样式引入
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// 全局导入icons
import registerIcons from './global/register-icons'
// login仓库
import useLoginStore from '@/stores/modules/login'
//消除控制台警告用
import 'default-passive-events'

const app = createApp(App)
app.use(registerIcons)
app.use(pinia)
// 页面刷新重新添加动态路由
const LoginStore = useLoginStore()
LoginStore.loadlocalStorageAction()
app.use(router)
app.mount('#app')

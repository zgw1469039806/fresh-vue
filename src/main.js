import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import {router} from './router';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import VueCookies from 'vue-cookies'

Vue.prototype.$echarts=echarts;
Vue.use(VueCookies);


const inter = axios.create({ // 创建服务
    baseURL: 'http://localhost:8777/unification', // 基础路径
    timeout: 10000, // 请求延时
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});

// Vue.prototype.$axios = inter
//携带认证信息
inter.defaults.withCredentials=true;
//axios拦截器
// inter.interceptors.response.use(function (response) {
//    alert(response.data.code)
//     if (response.data.code == undefined) {
//         window.location.href = "http://localhost:8777/";
//     }
//     if (response.data && response.data.code) {
//         if (response.data.code != 0) {
//             return response;
//         }
//     }
//     return resp  onse;
// }, function (error) {
//     alert(error);
//     if (!error.response) {
//         window.location.href = "http://localhost:8777/";
//     } else {
//         if (error.response.status == 400) {
//             alert("提交的参数有误!");
//         }
//     }
// });


Vue.config.productionTip = false;
Vue.prototype.axios = inter;



Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 导入iconfront
import './assets/font/iconfont.css'
import './utils/crypto.js'


// 导入axios
import axios from 'axios'

/*
关于axios：
即前端请求
请求头header中会有编码方式content type:
application/x-www-form-urlencoded ：put,post, 形式：key1=value1&key2=value2
application/json : accept   形式：{"key1":"value1","key2":"value2"}

*/
import crypto from './utils/crypto.js'
// 挂载axios 到Vue的原型prototype的$http
Vue.prototype.$http = axios
// 设置请求的根路径
axios.defaults.baseURL = "http://localhost:9000/"
axios.interceptors.request.use(config => {
  // 请求头挂载信息
  config.headers.Authorization = window.sessionStorage.getItem("flag");
  config.data = crypto.encrypt(config.data);
  return config;
})
axios.interceptors.response.use(response => {
  response.data = JSON.parse(crypto.decrypt(response.data));
  /*
  注意JSON对象和JSON字符串的区别
  console.log(response.data);                      ==>      {"key1":"value1","key2":"value2"}
  console.log(JSON.stringify(response.data));      ==>      '{"key1":"value1","key2":"value2"}'   ==>    无法使用obj.key1获取值，需要JSON.parse转换成JSON对象
  */
  return response;
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

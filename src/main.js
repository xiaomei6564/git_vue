// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui' //引入js
// import { Select,Table,TableColumn,Input, } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'//引入css

import App from './App'
import router from './router'      //引入路由
import axios from 'axios';        //引入axios请求
// import echarts from 'echarts'     //引入echarts
// import jquery from 'jquery'     //引入jquery  在webpack.base.conf文件的plugins中设置了 ，  webpack的插件使用方式
import { JSEncrypt } from 'jsencrypt'
import store from './store'
// // 引入样式
// import 'vue-easytable/libs/themes-base/index.css'
// // 导入 table 和 分页组件
// import {VTable,VPagination} from 'vue-easytable'
import VueOnkeypress from '@/directive/onkeypress/index' //Onkeypress
import VueOnkeypress2 from '@/directive/onkeypress/index2'

// // 注册到全局
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)
Vue.directive('VueOnkeypress', VueOnkeypress); //Onkeypress
Vue.directive('VueOnkeypress2', VueOnkeypress2);


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;     //原型链修改使用axios
// Vue.prototype.$echarts = echarts; //原型链修改使用echarts
// Vue.prototype.$jquery = jquery; //原型链修改使用jquery
Vue.prototype.$jsencrypt = JSEncrypt //加密js
var root = process.env.API_ROOT;
Vue.prototype.Root = root;//添加根文件目录


// 定义全局默认配置：
axios.defaults.headers.common['SY-TOKEN'] = localStorage.getItem('token');

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("config-axiosJs.js:添加请求拦截器");
  //判断是否存在token，如果存在将每个页面header都添加token

  if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != 'undefined' && localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
    config.headers['SY-TOKEN'] = localStorage.getItem('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("config-axiosJs.js:添加响应拦截器");

  let nowTime = new Date().getTime();

  // 超过两个小时未操作或者localStorage清空 跳转登录页
  if (((nowTime - localStorage.getItem('visitTime') > 7200000) && response.data == '') || ((localStorage.getItem('user') == '' || localStorage.getItem('user') == undefined || localStorage.getItem('user') == null) && (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined || localStorage.getItem('token') == ''))) {
    localStorage.removeItem('token')
    store.state.token = '';
    location.href = 'index.html';//跳转登录
    if (localStorage.getItem('login_guoqi') != '登录过期，请重新登录') {
      alert('登录过期，请重新登录');
      localStorage.setItem('login_guoqi', '登录过期，请重新登录')
    }
  }
  localStorage.setItem('visitTime', new Date().getTime());
  // Token过期重新请求
  if (response.data == '' && (localStorage.getItem('token') != null && localStorage.getItem('token') != undefined && localStorage.getItem('token') != '') && (localStorage.getItem('visitTime') != null && localStorage.getItem('visitTime') != undefined && localStorage.getItem('visitTime') != '')) {
    axios({
      method: 'post',
      url: '/budget-bus-web/restful/login/enter',
      params: {
        user: localStorage.getItem('user')
      }
    }).then((response_token) => {
      let token = response_token.data.data.token;
      store.state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('visitTime', new Date().getTime());
      localStorage.setItem('memberName', response_token.data.data.memberName);
      this.$store.state.visitTime = new Date().getTime();

    }).catch((response) => {

    })


  }
  return response
}, function (error) {
  // 对响应错误做点什么

  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //     store.dispatch('DEL_TOKEN');
  //       router.replace({
  //         path: '/login',
  //         query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
  //       })
  //   }
  // }
  return Promise.reject(error)
});










/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

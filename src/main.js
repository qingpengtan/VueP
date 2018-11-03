import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios'
import https from './utils/axiosUtils';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import StringUtils from "./utils/StringUtils.js";
import store from './store'

Vue.use(ElementUI, {
    size: 'small'
});

Vue.prototype.$axios = axios;
Vue.prototype.$http = https;
Vue.prototype.$prototype = function () {
    return Vue.prototype;
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_token');
    const role = localStorage.getItem('x_role');
    if (to.meta.title) {
        document.title = to.meta.title;
      }
    // 当用户未登录
    if (StringUtils.isEmpty(token) && (to.path.indexOf('sys') == -1) && to.path != '/user-login') {
        next('/user-login');
    } else if (StringUtils.isEmpty(token) && (to.path.indexOf('sys') != -1) && to.path != '/sys/login') {
        next('/sys/login');
        // 用户已登录
    } else if (role == '1' && (to.path.indexOf('sys') != -1)) {
        next('/')
    } else if (role == '1' && (to.path.indexOf('user-login') != -1)) {
        next('/')
    } else if (role == '3' && (to.path.indexOf('user-login') != -1)) {
        next('/')
    } else if (role == '3' && (to.path.indexOf('sys/login') != -1)) {
        next('/sys')
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    let code = response.data.code;
    let msg = response.data.msg;

    if (code == 500211) {
        new Vue().$message.warning(msg);
        localStorage.clear();
        router.push({
            path: "/"
        });
    } else if (code == 500217) {
        router.push({
            path: "/403"
        });
    } else if (code == 500100) {
        // new Vue().$message({
        //     showClose: true,
        //     duration: 10000,
        //     message: msg,
        //     type: 'warning'
        // });
        router.push({
            path: "/500"
        });
    }
    return response
}, err => {
    return Promise.resolve(err)
})


Vue.filter("emptyValue", function (value) {
    if (StringUtils.isEmpty(value)) {
        return "";
    } else {
        return value;
    }
});



Vue.filter("statusFilter", function (value) {

    if (value == 1000) {
        return "正常";
    } else if (value == 2000) {
        return "禁用";
    } else if (StringUtils.isEmpty(value)) {
        return "";
    } else {
        return value;
    }

});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

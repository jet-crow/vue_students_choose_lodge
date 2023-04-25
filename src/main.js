import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import './assets/css/reset.css';
import 'vant/es/toast/style';
import {showSuccessToast, showFailToast} from 'vant';

const app = createApp(App);
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://localhost:9090';

/* 获取cookie的token放到headers中 */
axios.interceptors.request.use(
    function (config) {
        //如果有adminToken就优先使用adminToken
        let token
        if (localStorage.getItem("adminToken")) {
            token = localStorage.getItem("adminToken");
        } else {
            token = localStorage.getItem("token");
        }
        if (token) {
            // 添加headers
            config.headers['token'] = token; // token
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

app.config.globalProperties.$api = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$showSuccessToast = showSuccessToast;
app.config.globalProperties.$showFailToast = showFailToast;
app.use(router);
app.mount('#app');

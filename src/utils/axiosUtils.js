import axios from 'axios';
import qs from 'qs';

export default {
    http(url, obj) {
        return new Promise((resolve, reject) => {
            axios.post(
                url,
                qs.stringify(obj), {
                    headers: {
                        'token': localStorage.getItem('x_token')
                    }
                }
            ).then((res) => {
                resolve(res.data)
            }).catch((res) => {
                reject(res.data);
            })
        })

    }

}



// 创建axios 实例
// const service = axios.create({
//     baseURL: '/', // api的base_url
//     timeout: 10000 // 请求超时时间
//   })
  
//   // request 拦截器
//   service.interceptors.request.use(
//     config => {
//       // 这里可以自定义一些config 配置
//       config.headers['token']= localStorage.getItem('x_token');
//       config.data = qs.stringify(config.data);
//       return config
//     },
//     error => {
//       //  这里处理一些请求出错的情况
  
//       console.log(error)
//       Promise.reject(error)
//     }
//   )
  

//   service.interceptors.response.use(response => {
//     let code = response.data.code;
//     let msg = response.data.msg;
//     if (code == 500211) {
//         let x_userPhone = localStorage.getItem("x_userPhone");
//         x_userPhone = StringUtils.isEmpty(x_userPhone) ? localStorage.getItem("userPhone") : x_userPhone;
//         localStorage.clear();
//         localStorage.setItem("userPhone",x_userPhone);
//         new Vue().$message.warning(msg);
//         router.push('/user-login')
//     } else if (code == 500217) {
//         router.push('/403')
//     } else if (code == 500100) {
//         router.push('/500')
//     }
//     return response
// }, err => {
//     return Promise.resolve(err)
// })

//   export default service;

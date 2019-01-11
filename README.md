作者之前从未做过vue的项目，对vue的理解不是很深刻。因而这是一个入门级的测试项目。下面列举了一些不足之处：
##### axios封装
项目对axios的封装有些不合理，导致若是请求有错误信息处理不知道该是全局拦截还是局部拦截出来。
正确的封装应该是以下：
````js
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    
    config.headers['X-Token'] = getToken()
  
  return config
}, error => {
  console.log(error) 
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,

  error => {
    console.log('err' + error) 
    return Promise.reject(error)
  })

export default service
````
##### 组件封装
项目的组件封装不是很彻底，导致修改项目的时候会变得繁琐。组件封装应当遵从从小到大，层层渐进封装，使得组件可以层层复用。
##### 路由使用
项目的路由大多是单层路由，当然这是因为组件封装的不彻底所导致的。比如若是将文章列表单独提取出来当作一个组件就可以避免在多层路由在同个页面产生过多的复杂代码。
##### 图标使用
项目还使用png作为图标确实有点low。实际中应当采用样式图标或者svg图标。
##### 混入使用
作者有点懒项目没使用混入，实际项目中混入是一个很不错的方法，将个组件通用功能封装到mixin中是个很不错的选择，既方便了开发，也简化了代码。
##### Vuex使用
项目对vuex只是进行简单了测试使用，实际中若是涉及到很多的组件信息传递应当对Vuex进行模块化封装。
##### 动态路由和权限控制
待续 ... ...

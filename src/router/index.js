import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/sys',
            redirect: '/sys/dashboard'
        },
        {
            path:'/',
            component: resolve => require(['../components/page/index.vue'], resolve),
        },
        {
            path:'/user-login',
            component: resolve => require(['../components/page/userLogin.vue'], resolve),
        },

        {
            path:'/detail',
            component: resolve => require(['../components/page/details.vue'], resolve),
        },

        {
            path:'/edit-text',
            component: resolve => require(['../components/page/editor.vue'], resolve),
        },

        {
            path:'/person-info',
            component: resolve => require(['../components/page/person.vue'], resolve),
        },

        {
            path: '/sys',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/sys/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/sys/user',
                    component: resolve => require(['../components/page/userList.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/sys/article',
                    component: resolve => require(['../components/page/articleList.vue'], resolve),
                    meta: { title: '文章列表' }
                },
                {
                    path: '/sys/form',
                    component: resolve => require(['../components/page/userForm.vue'], resolve),
                    meta: { title: '用户编辑' }
                },
                {
                    path: '/sys/article-edit',
                    component: resolve => require(['../components/page/articleInfo.vue'], resolve),
                    meta: { title: '文章编辑' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                }
            ]
        },

        {
            path: '/sys/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

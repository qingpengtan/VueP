import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active-class',
    // mode: 'history',
    scrollBehavior(to,form,savePosition){
        if(savePosition){
            return savePosition
        }else{
            return{x:0,y:0}
        }
    },
    routes: [{
            path: '/',
            component: resolve => require(['../components/page/index.vue'], resolve),
            meta: {
                title: '山河远阔，人间烟火',
                keepAlive: true,
            }
        },
        {
            path: '/music',
            component: resolve => require(['../components/page/music.vue'], resolve),
            meta: {
                title: '音乐',
                keepAlive: true
            }
        },
        {
            path: '/music-player',
            component: resolve => require(['../components/page/musicPlayer.vue'], resolve),
            meta: {
                title: '音乐播放器',
            }
        },
        {
            path: '/user-login',
            component: resolve => require(['../components/page/userLogin.vue'], resolve),
            meta: {
                title: '登录'
            }
        },

        {
            path: '/detail/:id/:xx',
            component: resolve => require(['../components/page/details.vue'], resolve),
        },

        {
            path: '/edit-text',
            component: resolve => require(['../components/page/editor.vue'], resolve),
            meta: {
                title: '写文章'
            }
        },

        {
            path: '/person-info',
            component: resolve => require(['../components/page/person.vue'], resolve),
            meta: {
                title: '个人中心',
                keepAlive: true,
            }
        },
        {
            path: '/tribune/:id',
            component: resolve => require(['../components/page/tribune.vue'], resolve),
            meta: {
                // title: '论坛',
                keepAlive: true
            }
        },
        {
            path: '/daily',
            component: resolve => require(['../components/page/daily.vue'], resolve),
            meta: {
                title: '心情日志',
                keepAlive: true
            }
        },
        {
            path: '/search',
            component: resolve => require(['../components/page/search.vue'], resolve),
            meta: {
                title: '搜索结果',
                keepAlive: true
            }
        },
        {
            path: '/sys/login',
            component: resolve => require(['../components/page/platform/Login.vue'], resolve),
            meta: {
                title: '后台管理登录'
            }
        },
        // 平台
        {
            path: '/sys',
            redirect: '/sys/dashboard'
        },
        {
            path: '/sys',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '后台管理系统'
            },
            children: [{
                    path: '/sys/dashboard',
                    component: resolve => require(['../components/page/platform/Dashboard.vue'], resolve),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/sys/user',
                    component: resolve => require(['../components/page/platform/userList.vue'], resolve),
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: '/sys/article',
                    component: resolve => require(['../components/page/platform/articleList.vue'], resolve),
                    meta: {
                        title: '文章列表'
                    }
                },
                {
                    path: '/sys/music',
                    component: resolve => require(['../components/page/platform/musicList.vue'], resolve),
                    meta: {
                        title: '音乐列表'
                    }
                },
                {
                    path: '/sys/form',
                    component: resolve => require(['../components/page/platform/userForm.vue'], resolve),
                    meta: {
                        title: '用户编辑'
                    }
                },
                {
                    path: '/sys/article-edit',
                    component: resolve => require(['../components/page/platform/articleInfo.vue'], resolve),
                    meta: {
                        title: '文章编辑'
                    }
                }
            ]
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/publics/404.vue'], resolve),
            meta: {
                title: '404'
            }
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/publics/403.vue'], resolve),
            meta: {
                title: '403'
            }
        },
        {
            path: '/500',
            component: resolve => require(['../components/page/publics/500.vue'], resolve),
            meta: {
                title: '500'
            }
        },
        {
            path: '*',
            component: resolve => require(['../components/page/publics/404.vue'], resolve),
            meta: {
                title: '404'
            }
        }
    ]
})

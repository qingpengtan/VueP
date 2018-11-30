import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        indexPageScroll:0,
        dailyPageScroll:0,
        tribunePageScroll:0,
        searchPageScroll:0,
        navMenuSelect:"主页",
        pageScrollY:0,
        currentMusic:"",
        currentArticleNum:0,
        updateArticleNum:0,
    },
    getters:{
        indexPageScroll(state){
            return state.indexPageScroll;
        },
        dailyPageScroll(state){
            return state.dailyPageScroll;
        },
        tribunePageScroll(state){
            return state.tribunePageScroll;
        },
        searchPageScroll(state){
            return state.searchPageScroll;
        },
        navMenuSelect(state){
            return state.navMenuSelect;
        },
        pageScrollY(state){
            return state.pageScrollY;
        },
        currentMusic(state){
            return state.currentMusic;
        },
        currentArticleNum(state){
            return state.currentArticleNum;
        },
        updateArticleNum(state){
            return state.updateArticleNum;
        },
    },
    mutations:{
        indexPageScroll(state,scrollY){
            state.indexPageScroll = scrollY;
        },
        dailyPageScroll(state,scrollY){
            state.dailyPageScroll = scrollY;
        },
        tribunePageScroll(state,scrollY){
            state.tribunePageScroll = scrollY;
        },
        searchPageScroll(state,scrollY){
            state.searchPageScroll = scrollY;
        },
        navMenuSelect(state,currentMenu){
            state.navMenuSelect = currentMenu;
        },
        pageScrollY(state,pageScrollY){
            state.pageScrollY = pageScrollY;
        },
        currentMusic(state,currentMusic){
            state.currentMusic = currentMusic;
        },
        currentArticleNum(state,num){
            state.currentArticleNum = num;
        },
        updateArticleNum(state,num){
            state.updateArticleNum = num;
        },
    },


    // actions:{
    //     switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
    //         context.commit('indexPageScroll');
    //         //你还可以在这里触发其他的mutations方法
    //     },
    // }
})
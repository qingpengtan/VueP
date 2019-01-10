<template>
  <div>
    <Header v-bind:searchWd="articleTitle"></Header>

    <div class="layout-main">
      <div
        style="width:100%;color:#999;font-size:13px;text-align:center"
      >共搜索到了{{totalSize}}篇 “{{articleTitle}}” 的相关文章</div>
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <v-scroll
            ref="listContent"
            :data="articleList"
            :pullup="pullup"
            :listenScroll="true"
            @scrollToEnd="moreData()"
            class="v-scroll"
            @scroll="scrollC"
          >
            <ul>
              <li
                class="ant-list-item item-animation"
                v-for=" article in articleList"
                :key="article.articleId"
              >
                <div v-if="article.articleTag !=1">
                  <div>
                    <h3>
                      <router-link
                        :to="{path:`/detail/${jiami(article.articleId)}/${md(jiami(article.articleId))}`}"
                      >{{article.articleTitle}}</router-link>
                    </h3>
                    <img class="article-tag" :src="article.articleTagName | tagToIcon" alt>
                    <img
                      v-if="article.isStick == 2000"
                      class="article-tag"
                      src="../../assets/stick.png"
                      alt
                    >
                  </div>
                  <div class="ant-list-item-content">
                    <div>
                      <div class="text-content">{{article.articleBrief}}</div>
                      <div class="publish">
                        <span>
                          <img :src="article.userPic">
                        </span>
                        {{article.userName}}
                        <span
                          style="color:#aaa;font-size:11px;"
                        >发布于 {{article.createTime | filterTime}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="publish publish-daily">
                    <div class="daily-title">
                      <img :src="article.userPic">
                      <span class="daily-user">
                        {{article.userName}}
                        <br>
                        <span
                          style="font-size:11px;position:relative;top:-5px;color:#aaa"
                        >{{article.createTime | filterTime}}</span>
                      </span>
                      <span class="daily-detail">
                        <router-link
                          :to="{path:`/detail/${jiami(article.articleId)}/${md(jiami(article.articleId))}`}"
                        >
                          <img
                            src="../../assets/detail.png"
                            style="width:20px;height:20px"
                            alt="详情"
                            title="详情"
                          >
                        </router-link>
                      </span>
                    </div>
                    <div class="daily-breif">{{article.articleBrief}}</div>
                  </div>
                </div>
              </li>
              <div class="mobile-more">
                <span id="loading">正在加载中
                  <i class="el-icon-loading"></i>
                </span>
                <span id="nodata" style="display:none">没有更多数据啦</span>
              </div>
            </ul>
            <div class="pc-more" @click="moreData" v-show="disMore">加载更多</div>
          </v-scroll>
          <div class="aside-content">
            <keep-alive>
              <FAside></FAside>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from "../common/Fheader.vue";
import Footer from "../common/Footer.vue";
import Scroll from "./publics/bScroll";
import FAside from "../common/FAside";
import BackTop from "../common/BackTop.vue";
import Base64 from "../../utils/Base64.js";
import md5 from "md5";
export default {
  name: "search",
  components: {
    Header,
    Footer,
    BackTop,
    FAside,
    "v-scroll": Scroll
  },
  data() {
    return {
      disMore: false,
      pullup: true,
      totalPage: 1,
      totalSize: 0,
      current: 1,
      articleList: [],
      articleTitle: ""
    };
  },
  mounted() {
    this.reqData(1);
  },
  activated() {
    // this.$refs.listContent.refresh();
    // this.$refs.listContent.scrollTo(0, this.$store.getters.dailyPageScroll);
  },
  watch: {
    $route(to, from) {
      this.articleList = [];
      this.reqData(1);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("edit-text") != -1) {
      from.meta.keepAlive = false;
    } else {
      from.meta.keepAlive = true;
    }
    next();
  },
  methods: {
    jiami(value) {
      return Base64.encode(value);
    },
    md(value) {
      return md5(value);
    },
    moreData() {
      this.current++;
      if (this.current > this.totalPage) {
        this.$el.querySelector(".pc-more").innerHTML = "没有更多数据了";
        return;
      }
      this.reqData(this.current);
    },
    reqData(page) {
      this.articleTitle = this.$route.query.search;
      this.$http
        .http("/index/list", { page: page, articleTitle: this.articleTitle })
        .then(
          res => {
            this.disMore = true;
            this.totalPage = res.data.totalPage;
            this.current = res.data.current;
            this.totalSize = res.data.totalSize;
            this.articleList = this.articleList.concat(res.data.articleList);
            if (res.data.articleList.length < 10) {
              this.$el.querySelector(".pc-more").innerHTML = "没有更多数据了";
              this.$el.querySelector("#loading").style.display = "none";
              this.$el.querySelector("#nodata").style.display = "inline";
            }
          },
          response => {
            console.log("error");
          }
        );
    },
    scrollC(pos) {
      this.$store.commit("dailyPageScroll", pos.y);
    }
  }
};
</script>


<style scoped>
.item-animation {
  animation: topIn 2s ease;
}
@keyframes topIn {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.layout-main {
  width: 1260px;
  margin: 0 auto;
}

.layout-content {
  height: auto;
  width: auto;
  min-height: calc(100vh - 249px);
  background: white;
}
.main-content {
  position: relative;
  /* overflow: auto; */
}

.main-content:after {
  content: ".";
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}

.v-scroll {
  width: 720px;
  display: inline-block;
}
.aside-content {
  width: 360px;
  margin: 20px;
  float: right;
}

.ant-list-item {
  padding-top: 16px;
  width: 720px;
  border-bottom: 1px solid #ddd;
}
.ant-list-item-content {
  margin-bottom: 16px;
}

.ant-list-item-content .text-content {
  line-height: 27px;
  max-height: 108px;
  overflow: hidden;
  word-wrap: normal;
  word-break: break-all;
}

.publish {
  margin-top: 5px;
  font-size: 13px;
}

.publish img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.publish-daily {
  margin-top: 0;
  position: relative;
}
.publish-daily .daily-title {
  font-size: 14px;
  position: relative;
}
.daily-detail {
  position: absolute;
  right: 0;
  top: 2px;
}
.publish-daily .daily-title img {
  top: -5px;
  margin-right: 5px;
  width: 30px;
  height: 30px;
}

.publish-daily .daily-breif {
  padding: 0px 0 16px 0;
  line-height: 27px;
  max-height: 108px;
  overflow: hidden;
  word-wrap: normal;
  word-break: break-all;
  font-size: 14px;
}
.publish-daily .daily-breif a {
  font-size: 13px;
  color: #3a8ee6;
}

.publish-daily .daily-title .daily-user {
  position: relative;
  display: inline-block;
}

.ant-list-item-action li {
  float: left;
  padding-right: 16px;
  cursor: pointer;
}
h3 {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article-tag {
  width: 18px;
  position: relative;
  top: -3px;
}
.pc-more {
  width: 120px;
  height: 35px;
  margin: 0 auto;
  margin-top: 15px;
  line-height: 35px;
  border: 1px solid #999999;
  border-radius: 4px;
  color: #999999;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  display: block;
}
.pc-more:hover {
  border: 1px solid #43bcff;
  color: #43bcff;
}
.mobile-more {
  display: none;
}
@media only screen and (max-width: 481px) {
  .layout-main,
  .main-content,
  .ant-list-item {
    width: 100%;
  }
  .layout-content {
    margin-top: 0;
    padding-top: 0px;
  }
  .main-content {
    width: 100%;
    padding: 0 !important;
    font-size: 0px;
  }
  .ant-list-item {
    box-sizing: border-box;
    padding: 0.258621rem 0.172414rem;
    border-bottom: 5px solid #e9e9e9;
  }
  .ant-list-item-content {
    margin: 0;
  }
  h3 {
    max-width: 5.517241rem;
  }
  .ant-list-item-action li {
    padding-right: 8px;
  }

  .publish-daily .daily-breif {
    padding-bottom: 0;
  }

  .pc-more {
    display: none !important;
  }
  .mobile-more {
    display: block;
    text-align: center;
    font-size: 14px;
  }
  .v-scroll {
    width: 100%;
    height: calc(100vh - 1.1762rem);
    overflow: hidden;
    font-size: 14px;
  }
  .aside-content {
    display: none;
  }
}
</style>


<template>
  <div>
    <Header></Header>

    <div class="layout-main">
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
                <div>
                  <h3>
                    <router-link
                      :to="{path:`/detail/${jiami(article.articleId)}/${md(jiami(article.articleId))}`}"
                    >{{article.articleTitle}}</router-link>
                  </h3>
                  <img class="article-tag" :src="article.articleTagName | tagToIcon" alt>
                  <img
                    v-if="article.isStick == 2000"
                    class="stick-tag"
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
              </li>
              <div class="mobile-more">
                <span id="loading">
                  正在加载中
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
  name: "tribune",
  components: {
    Header,
    Footer,
    FAside,
    BackTop,
    "v-scroll": Scroll
  },
  data() {
    return {
      disMore: false,
      pullup: true,
      totalPage: 1,
      current: 1,
      articleList: []
    };
  },
  mounted() {
    this.reqData(1);
    this.setTitle();
  },
  activated() {
    // this.$refs.listContent.refresh();
    // this.$refs.listContent.scrollTo(0, this.$store.getters.dailyPageScroll);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("edit-text") != -1) {
      from.meta.keepAlive = false;
    } else {
      from.meta.keepAlive = true;
    }
    next();
  },
  watch: {
    $route(to, from) {
      if (from.path.indexOf("detail") != -1) return;
      if (to.path.indexOf("/tribune") != -1) {
        this.setTitle();
        this.articleList = [];
        let id = this.$route.params.id;
        this.$http
          .http("/index/list", { articleTagId: id.slice(8, id.length) })
          .then(
            res => {
              this.totalPage = res.data.totalPage;
              this.current = res.data.current;
              this.articleList = res.data.articleList;
              if (res.data.articleList.length < 10) {
                this.$el.querySelector(".pc-more").innerHTML = "没有更多数据了";
                this.$el.querySelector("#loading").style.display = "none";
                this.$el.querySelector("#nodata").style.display = "inline";
              } else {
                this.$el.querySelector(".pc-more").innerHTML = "加载更多";
                this.$el.querySelector("#loading").style.display = "inline";
                this.$el.querySelector("#nodata").style.display = "none";
              }
            },
            response => {
              console.log("error");
            }
          );
      }
    }
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
        this.$el.querySelector("#loading").style.display = "none";
        this.$el.querySelector("#nodata").style.display = "inline";
        return;
      }
      this.reqData(this.current);
    },
    reqData(page) {
      let id = this.$route.params.id;
      this.$http
        .http("/index/list", {
          page: page,
          articleTagId: id.slice(8, id.length) 
        })
        .then(
          res => {
            this.disMore = true;
            this.totalPage = res.data.totalPage;
            this.current = res.data.current;
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
    },
    setTitle() {
      let id = this.$route.params.id;
      switch (id) {
        case "2":
          document.title = "Java版块";
          break;
        case "3":
          document.title = "Web开发版块";
          break;
        case "8":
          document.title = "NodeJS版块";
          break;
        case "4":
          document.title = "Go语言版块";
          break;
        case "5":
          document.title = "大数据版块";
          break;
        case "6":
          document.title = "Python版块";
          break;
        default:
          document.title = "其他版块";
          break;
      }
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
  margin-top: 20px;
}
.main-content {
  position: relative;
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
  width: 16px;
  position: relative;
  top: -3px;
}
.stick-tag {
  width: 30px;
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
    font-size: 0;
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
    height: calc(100vh - 0.852rem);
    overflow: hidden;

    font-size: 14px;
  }
  .aside-content {
    display: none;
  }
}
</style>


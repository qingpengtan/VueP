<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <v-scroll ref="listContent" :data="articleList" :pullup="pullup" :listenScroll="true" @scrollToEnd="moreData()" class="v-scroll" @scroll="scrollC">
            <ul>
              <li class="ant-list-item" v-for=" article in articleList" :key="article.articleId">
                <div>
                  <span class="article-tag">{{article.articleTagName}}</span>
                  <router-link :to="{path:`/detail/${article.articleId}`}">
                    <h4>{{article.articleTitle}}</h4>
                  </router-link>
                </div>
                <div class="ant-list-item-content">
                  <div>
                    <div class="text-content">
                      {{article.articleBrief}}
                    </div>
                    <div class="publish">
                      <span>
                        <img :src="article.userPic">
                      </span>
                      {{article.userName}}
                      <span style="color:#aaa;font-size:11px;">发布于 {{article.createTime}}</span>
                    </div>
                  </div>
                </div>
              </li>
              <div class="mobile-more">
                <span id="loading">
                  正在加载中 <i class="el-icon-loading"></i>
                </span>
                <span id="nodata" style="display:none">
                  没有更多数据啦
                </span>
              </div>
            </ul>
            <div class="pc-more" @click="moreData" v-show="disMore">
              查看更多
            </div>

          </v-scroll>
          <div class="aside-content">
            <FAside></FAside>
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
      if(from.path.indexOf("detail") != -1) return;
      if (to.path.indexOf("/tribune") != -1) {
        this.articleList = [];
        this.$http
          .http("/index/list", { articleTagId: this.$route.params.id })
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
                this.$el.querySelector(".pc-more").innerHTML = "查看更多";
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
      this.$http
        .http("/index/list", {
          page: page,
          articleTagId: this.$route.params.id
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
    }
  }
};
</script>


<style scoped>
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
  margin-top: 5px;
  margin-bottom: 16px;
}

.ant-list-item-content .text-content {
  line-height: 22px;
  max-height: 108px;
  overflow: hidden;
  word-wrap: normal;
  word-break: break-all;
  text-wrap: normal;
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
.article-tag + a h4 {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article-tag {
  padding: 1px 4px;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 #43bcff;
  background: #43bcff;
  color: white;
  font-size: 11px;
  position: relative;
  top: -6px;
}
.pc-more {
  width: 720px;
  height: 35px;
  line-height: 35px;
  background: #f2f2f2;
  border-radius: 4px;
  color: #999999;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  display: block;
}
.pc-more:hover {
  background: #dddddd;
  color: #666;
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
    margin: 0.086207rem 0;
  }

  .ant-list-item-action li {
    padding-right: 8px;
  }
  .article-tag + a h4 {
    max-width: 4.807931rem;
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


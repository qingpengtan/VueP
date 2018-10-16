<template>

  <div>

    <Header v-bind:searchWd="articleTitle"></Header>

    <div class="layout-main">
      <!-- <div class="header-content">

        </div> -->
      <div style="width:100%;color:#999;font-size:13px;text-align:center">
        共搜索到了{{totalSize}}篇文章
      </div>
      <div class="layout-content">

        <div class="main-content" style="padding: 8px 32px 32px;">

          <v-scroll :data="articleList" :pullup="pullup" @scrollToEnd="moreData()" class="v-scroll">
            <ul>
              <li class="ant-list-item" v-for=" article in articleList" :key="article.articleId">
                <div class="ant-list-item-meta-content">
                  <span class="article-tag">{{article.articleTagName}}</span>
                  <router-link :to="{path:'/detail', query:{articleId:article.articleId}}">
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
                      <a href="https://ant.design">{{article.userName}}</a> 发布于
                      {{article.createTime}}
                    </div>
                  </div>
                </div>
                <hr>
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

        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import Footer from "../common/Footer.vue";
import Scroll from "./foreground/bScroll";
export default {
  name: "index",
  components: {
    Header,
    Footer,
    "v-scroll": Scroll
  },
  data() {
    return {
      disMore: false,
      pullup: true,
      totalPage: 1,
      totalSize:0,
      current: 1,
      articleList: [],
      articleTitle: ""
    };
  },
  mounted() {
    this.reqData(1);
  },

  watch: {
    $route(to, from) {
      this.articleList = [];
      this.reqData(1);
    }
  },
  methods: {
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
    }
  }
};
</script>


<style scoped>
.layout-main {
  width: 1260px;
  height: 100%;
  margin: 0 auto;
}

.layout-content {
  height: auto;
  width: auto;
  background: white;
}
.main-content {
  position: relative;
}

.ant-list-item {
  padding-top: 20px;
  width: 720px;
}

.ant-list-item-meta-content {
  margin-bottom: 2px;
}
.ant-list-item-content {
  margin-bottom: 16px;
}

.ant-list-item-content .text-content {
  line-height: 22px;
  max-height: 108px;
  overflow: hidden;
}

.publish {
  margin-top: 16px;
}

.publish img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  top: 4px;
  margin-right: 8px;
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
  font-size: 15px;
  cursor: pointer;
  display: block;
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
    font-size: 14px;
  }
  .ant-list-item {
    box-sizing: border-box;
    padding: 0.137931rem 0.172414rem;
    border-bottom: 5px solid #dddddd;
  }
  hr {
    display: none;
  }

  .ant-list-item-meta-content {
    margin: 5px 0;
  }
  .ant-list-item-content {
    margin-bottom: 0.172414rem;
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
    margin-top: 0.172414rem;
  }

  .publish img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    top: 4px;
    margin-right: 5px;
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
    height: calc(100vh - 1.174139rem);
    overflow: hidden;
  }
}
</style>


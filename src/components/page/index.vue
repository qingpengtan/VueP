<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <!-- <div class="header-content">

        </div> -->

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
                    <div class="text-content" v-html=article.content>
                    </div>
                    <div class="publish">
                      <span>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png">
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
      current: 1,
      articleList: []
    };
  },
  mounted() {
    this.reqData(1);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("detail") == -1) {
      from.meta.keepAlive = false;
    } else {
      console.log("aa");
      from.meta.keepAlive = true;
    }
    next();
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
      this.$http.http("/index/list", { page: page }).then(
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
  margin-top: 20px;
}
.main-content {
  position: relative;
}

.ant-list-item {
  padding: 20px 0;
  width: 720px;
}

.ant-list-item-meta-content,
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
    padding-top: 10px;
  }
  .main-content {
    width: 100%;
    padding: 0 !important;
    font-size: 14px;
  }
  .ant-list-item {
    box-sizing: border-box;
    padding: 0.137931rem 0.172414rem;
    border-bottom: 3px solid #dddddd;
  }
  hr {
    display: none;
  }

  .ant-list-item-meta-content,
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
    max-width: 4.617931rem;
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
    height: calc(100vh - 1.05rem);
    overflow: hidden;
  }
}
</style>


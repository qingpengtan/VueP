




<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <!-- <div class="header-content">

        </div> -->

      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">

          <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">

            <div class="ant-list-item" v-for=" article in articleList" :key="article.articleId">
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
            </div>

          </v-scroll>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import Scroll from "./foreground/scroll";
export default {
  name: "index",
  components: {
    Header,
    "v-scroll": Scroll
  },
  data() {
    return {
      totalPage: 1,
      current: 1,
      articleList: [],
      scrollData: {
        noFlag: false //暂无更多数据显示
      }
    };
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      let vm = this;
      this.$http.http("/index/list", {}).then(
        res => {
          this.totalPage = res.data.totalPage;
          this.current = res.data.current;
          this.articleList = res.data.articleList;
        },
        response => {
          console.log("error");
        }
      );
    },
    onRefresh(done) {
      this.getList();

      done(); // call done
    },
    onInfinite(done) {
      this.current++;
      let more = this.$el.querySelector(".load-more");
      this.$http.http("/index/list", { page: this.current }).then(
        res => {
          if (this.current > this.totalPage) {
            this.scrollData.noFlag = true;
            more.style.display = "none"; //隐藏加载条
          } else {
            this.totalPage = res.data.totalPage;
            this.current = res.data.current;
            this.articleList = this.articleList.concat(res.data.articleList);
          }
        },
        response => {
          console.log("error");
        }
      );
      done();
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
.main-content{
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
  padding: 0 3px;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 #43bcff;
  border: 1px solid #43bcff;
  color: #43bcff;
  font-size: 11px;
  position: relative;
  top: -5px;
}
@media only screen and (max-width: 481px) {
  .layout-main,
  .main-content,
  .ant-list-item {
    width: 100%;
  }
  .main-content {
    width: calc(100% - 0.506897rem);
    padding: 0.206897rem !important;
    font-size: 14px;
  }
  .ant-list-item {
    padding: 0.137931rem 0;
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
}
</style>


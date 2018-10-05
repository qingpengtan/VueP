<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <!-- <div class="header-content">

        </div> -->

      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">

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
            <!-- <ul class="ant-list-item-action">
                            <li>
                                <span>
                                    <i class="anticon anticon-star-o" style="margin-right: 8px;">
                                        <svg viewBox="64 64 896 896" class="" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                                        </svg>
                                    </i>183</span>
                                <em class="ant-list-item-action-split"></em>
                            </li>
                            <li>
                                <span>
                                    <i class="anticon anticon-like-o" style="margin-right: 8px;">
                                        <svg viewBox="64 64 896 896" class="" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path>
                                        </svg>
                                    </i>130</span>
                                <em class="ant-list-item-action-split"></em>
                            </li>
                            <li>
                                <span>
                                    <i class="anticon anticon-message" style="margin-right: 8px;">
                                        <svg viewBox="64 64 896 896" class="" data-icon="message" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
                                        </svg>
                                    </i>19</span>
                            </li>
                        </ul> -->
            <hr>
                    </div>

          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Header from "../common/Fheader.vue";
export default {
  name: "index",
  components: {
    Header
  },
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.$http.http("/index/list", {}).then(res => {
      this.articleList = res.data;
    });
  },
  methods: {}
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
  top: -4px;
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
    max-width: 4.417931rem;
  }
}
</style>


<template>
  <div class="Faside-content">
    <div class="aside-block">
      <div class="aside-header">最近更新</div>
      <ul class="aside-list">
        <li v-for="article in recentArticle" :key="article.articleId">
          <router-link
            :to="{path:`/detail/${jiami(article.articleId)}/${md(jiami(article.articleId))}`}"
          >{{article.articleTitle}}</router-link>
        </li>
      </ul>
    </div>
    <div class="aside-block">
      <div class="aside-header">我最近发布的</div>
      <ul class="aside-list">
        <li v-for="article in myRecentArticle" :key="article.articleId">
          <router-link
            :to="{path:`/detail/${jiami(article.articleId)}/${md(jiami(article.articleId))}`}"
          >{{article.articleTitle}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Base64 from "../../utils/Base64.js";
import md5 from "md5";
export default {
  name: "faside",
  data() {
    return {
      recentArticle: [],
      myRecentArticle: []
    };
  },
  created() {
    this.$http.http("/index/recentArticle", {}).then(res => {
      if (res.code == 1) {
        this.recentArticle = res.data;
      } else {
        this.$message.error(res.msg);
      }
    });

    this.$http
      .http("/index/recentArticle", {
        userPhone: localStorage.getItem("x_userPhone")
      })
      .then(res => {
        if (res.code == 1) {
          this.myRecentArticle = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
  },
  methods: {
    jiami(value) {
      return Base64.encode(value);
    },
    md(value) {
      return md5(value);
    }
  }
};
</script>
<style scoped>
.Faside-content {
  min-height: 700px;
}
.aside-block:first-child {
  margin-top: 0px;
}

.aside-block {
  width: 100%;
  margin-top: 20px;
}
.aside-header {
  widows: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #3a8ee6 !important;
  box-sizing: border-box;
  background: #f5f7fa;
}
.aside-list li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 20px;
  border-left: 1px solid #eeeeee;
  overflow: hidden;
}
.aside-list li a {
  color: #777;
  border-bottom: none;
}
.aside-list li a:hover {
  color: #0454a9 !important;
}
.active-class {
  color: #0454a9!important;
}
</style>



<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <el-upload class="upload-demo" action="/upload/mp3" multiple :limit="1" accept="audio/mpeg" :headers="headers" name="mp3" :on-success="finishUp" :file-list="fileList">
            <el-button size="small" type="primary">上传音乐</el-button>
          </el-upload>
        </div>
        <div v-for="music in musicList" :key="music.musicId">
          <audio :src="music.musicUrl" controls></audio>
          <div>{{music.musicName}}</div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import Footer from "../common/Footer.vue";

export default {
  name: "test",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      disMore: false,
      pullup: true,
      totalPage: 1,
      current: 1,
      articleList: [],
      fileList: [],
      musicList: [],
      headers: { token: localStorage.getItem("x_token") }
    };
  },
  mounted() {
    this.getMusic();
  },
  methods: {
    getMusic() {
      this.$http.http("/index/music", {}).then(res => {
        if (res.code == 1) {
          this.musicList = res.data;
        }
      });
    },
    finishUp(res, file, fileList) {
      setTimeout(() => {
        this.fileList = [];
      }, 3000);
      this.getMusic();
      console.log(res);
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

.layout-content >>> .el-upload--text {
  border: none;
  width: 80px;
  height: 32px;
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
  .pc-more {
    display: none !important;
  }
  .mobile-more {
    display: block;
    text-align: center;
    font-size: 14px;
  }
  .v-scroll {
    height: 500px;
    overflow: hidden;
  }
}
</style>


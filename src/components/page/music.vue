
<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <keep-alive>
            <v-scroll ref="listContent" :data="articleList" :pullup="pullup" :listenScroll="true" @scrollToEnd="moreData()" class="v-scroll" @scroll="scrollC">
              <div>
                <aplayer :music="audio[0]" :list="audio" v-if="flag" :showLrc="true" :volume="0.2" />

                <el-upload class="upload-demo" action="/upload/mp3" multiple :limit="1" accept="audio/mpeg" :headers="headers" name="mp3" :on-success="finishUp" :file-list="fileList">
                  <el-button size="small" type="primary">上传音乐 <i class="el-icon-upload2 el-icon--right"></i></el-button>
                </el-upload>
                <el-button type="success" @click="downloadMusic">下载当前音乐<i class="el-icon-download el-icon--right"></i></el-button>
              </div>
            </v-scroll>
          </keep-alive>

          <div class="aside-content">
            <FAside></FAside>
          </div>

        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import Footer from "../common/Footer.vue";
import FAside from "../common/FAside";
import Scroll from "./foreground/bScroll";
import Aplayer from "vue-aplayer";

export default {
  name: "music",
  components: {
    Header,
    Footer,
    FAside,
    "v-scroll": Scroll,
    Aplayer
  },
  data() {
    return {
      flag: false,
      disMore: false,
      pullup: true,
      totalPage: 1,
      current: 1,
      fileList: [],
      audio: [],
      headers: { token: localStorage.getItem("x_token") }
    };
  },
  mounted() {
    this.getMusic();
  },
  activated() {},
  beforeRouteEnter(to, from, next) {
    next();
  },
  methods: {
    getMusic() {
      this.$http.http("/index/music", {}).then(res => {
        if (res.code == 1) {
          this.audio = [];
          for (let music of res.data) {
            let tempMusic = {};
            tempMusic["title"] = music.musicName;
            tempMusic["artist"] = " ";
            tempMusic["src"] = music.musicUrl;
            tempMusic["pic"] = music.musicPic;
            tempMusic["lrc"] = "[00:00.00]暂无歌词";
            this.audio.push(tempMusic);
          }
          this.flag = true;
        }
      });
    },
    downloadMusic() {
      let audio = document.querySelector(".aplayer audio");
      window.open(audio.src);
      // let src = audio.src.split("/");
      // this.$http.http("/upload/download", { fileName: "a.mp3" }).then(res => {
      //   var blob = new Blob([res], { type: "audio/mp3" });
      // console.log(blob)
      // var link = document.createElement("a");
      // link.download = "xxxx";
      // link.href = URL.createObjectURL(blob);
      // document.getElementsByTagName("body")[0].appendChild(link);
      // });
    },
    finishUp(res, file, fileList) {
      setTimeout(() => {
        this.fileList = [];
      }, 3000);
      if (res.code == 1) {
        this.getMusic();
      } else {
        this.$message.error(res.msg);
      }
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
  font-size: 15px;
  cursor: pointer;
  display: block;
}
.pc-more:hover {
  background: #ededed;
  box-shadow: 1px 0px 3px 0 #666;
}
.mobile-more {
  display: none;
}
.layout-content >>> .el-upload--text {
  width: 105px;
  height: 32px;
  border: none;
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
  .aside-content {
    display: none;
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
}
</style>




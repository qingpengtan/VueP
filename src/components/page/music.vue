<template>
  <div>
    <Header v-bind:clickPage="'music'"></Header>
    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">

          <div class="v-scroll">

            <aplayer :music="audio[0]" :list="audio" v-if="flag" :showLrc="true" :volume="0.2" />

            <el-upload class="upload-demo" action="/upload/mp3" multiple :limit="1" accept="audio/mpeg" :headers="headers" name="mp3" :on-success="finishUp" :file-list="fileList">
              <el-button size="small" type="primary">上传音乐</el-button>
            </el-upload>
            <!-- <el-button size="small" type="primary" @click="downloadMusic">下载当前音乐</el-button> -->
          </div>

          <div class=" aside-content">
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
  activated() {
  },
  beforeRouteEnter(to, from, next) {
    next()
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
      let src = audio.src.split("/");
      this.$http.http("/upload/download", { fileName: "a.mp3" }).then(res => {
        var blob = new Blob([res], { type: "audio/mp3" });
        // console.log(blob)
        // var link = document.createElement("a");
        // link.download = "xxxx";
        // link.href = URL.createObjectURL(blob);
        // document.getElementsByTagName("body")[0].appendChild(link);
      });
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

.v-scroll >>> .el-upload--text {
  width: 100px;
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
    font-size: 14px;
  }
  .aside-content {
    display: none;
  }
  .v-scroll {
    width: 100%;
    height: calc(100vh - 0.8432rem);
    overflow: hidden;
  }
}
</style>


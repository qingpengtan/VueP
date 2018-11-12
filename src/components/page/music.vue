
<template>

  <div>

    <Header></Header>

    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <v-scroll ref="listContent" :pullup="pullup" :listenScroll="true" class="v-scroll">
            <div>
              <aplayer :music="audio[0]" :list="audio" v-if="flag" :showLrc="true" :volume="0.2" />
              <div class="music-operate">
                <div>
                  <el-button @click="pushMusicPlayer">进入播放器<i class="el-icon-caret-right el-icon--right"></i></el-button>
                </div>
                <div>
                  <el-upload class="upload-demo" action="/upload/mp3" multiple :limit="1" accept="audio/mpeg" :headers="headers" name="mp3" :on-success="finishUp" :file-list="fileList">
                    <el-button size="small" type="primary">上传音乐 <i class="el-icon-upload2 el-icon--right"></i></el-button>
                  </el-upload>
                </div>
                <div>
                  <el-button type="success" @click="downloadMusic">下载当前音乐<i class="el-icon-download el-icon--right"></i></el-button>
                </div>
              </div>
            </div>
          </v-scroll>
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
    },
    pushMusicPlayer() {
      let audio = document.querySelector(".aplayer audio");
      this.$router.push({
        path: "/music-player",
        query:{
          url:audio.src
        }
      });
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

.layout-content >>> .el-upload--text {
  width: 105px;
  height: 32px;
  border: none;
}
.music-operate {
  display: flex;
  margin-top: 10px;
}
.music-operate div {
  margin: 0px 5px;
  flex: 1;
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
 
  .v-scroll {
    width: 100%;
    height: calc(100vh - 0.852rem);
    overflow: hidden;
    font-size: 14px;
  }
}
</style>




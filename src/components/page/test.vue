<template>
  <div>
    <Header></Header>
    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">

          <!-- <v-scroll ref="listContent" :data="articleList" :pullup="pullup" :listenScroll="true" @scrollToEnd="moreData()" class="v-scroll"> -->
            <!-- <el-upload class="upload-demo" action="/upload/mp3" multiple :limit="1" accept="audio/mpeg" :headers="headers" name="mp3" :on-success="finishUp" :file-list="fileList">
              <el-button size="small" type="primary">上传音乐</el-button>
            </el-upload> -->

     <aplayer :audio="audio" :lrcType="3" />

          <!-- </v-scroll> -->

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
  // props: {
  //   music: {
  //     type: "Object"
  //   }
  // },
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
      disMore: false,
      pullup: true,
      totalPage: 1,
      current: 1,
      fileList: [],
        audio: {
          name: 'ヒビカセ',
          author: 'れをる',
          url: 'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
          pic: 'http://p1.music.126.net/cZPx3peGTuWEI_GaZB5CDg==/8892850045794893.jpg?param=300y300',
          lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc',
      },
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
          for (let music of res.data) {
            let tempMusic ={};
            tempMusic['name'] = music.musicName;
            tempMusic['artist'] = music.musicAuthor;
            tempMusic['url'] = music.musicUrl;
            tempMusic['cover'] = music.musicPic;
            tempMusic['lrc'] = music.musicLrc;
            // this.audio.push(tempMusic);
          }
          console.log(this.audio)
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
  padding-top: 20px;
  width: 720px;
  border-bottom: 1px solid #ddd;
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
  .aside-content {
    display: none;
  }
  .ant-list-item {
    box-sizing: border-box;
    padding: 0.137931rem 0.172414rem;
    border-bottom: 5px solid #dddddd;
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
    width: 100%;
    height: calc(100vh - 0.8432rem);
    overflow: hidden;
  }
}
</style>



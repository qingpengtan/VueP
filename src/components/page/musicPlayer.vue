
<template>

  <div>
    <Header></Header>
    <div class="layout-main">
      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <v-scroll ref="listContent" class="v-scroll">
            <div style="margin:10px;">
              音量：<input type="range" min="0" max="100" v-model="changeValue" @change="changeVolume">
              歌曲：{{title}}
            </div>
            <div id="player" class="music-player">

            </div>
            <div class="music-operate">
              <el-button type="primary" small @click="play">播放</el-button>
              <el-button type="primary" small @click="pause">暂停</el-button>
              <el-button type="primary" small @click="changeColor">切换颜色</el-button>
            </div>
            <div class="music-mask">
              <div class="mask-img">
                <img src="../../assets/loading.png" alt="">
              </div>
              <br>
              音乐缓慢加载中...
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
import store from "../../store/index.js";

export default {
  name: "music",
  components: {
    Header,
    Footer,
    FAside,
    "v-scroll": Scroll
  },
  data() {
    return {
      changeValue: "10",
      ac: "",
      gainNode: "",
      source: "",
      count: 0,
      analyser: "",
      ctx: "",
      size: 128,
      objColor: [],
      title:""
    };
  },
  mounted() {
    this.createCanvas();
    this.changeColor();
    let xhr = new XMLHttpRequest();
    let url = this.$route.query.url;
    this.title = this.$route.query.title;
    document.title = "音乐 - "+this.title;
    this.ac = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.ac.createAnalyser();
    this.loadMusic(xhr, url.split("ROO")[1]);
    this.visualizer(this.analyser);
  },
  beforeRouteEnter(to, from, next) {
    let music = store.getters.currentMusic;
    if (music) {
      music.stop();
    }
    next();
  },
  methods: {
    createCanvas() {
      let box = document.getElementById("player");
      let canvas = document.createElement("canvas");
      this.ctx = canvas.getContext("2d");
      box.appendChild(canvas);
      canvas.width = box.clientWidth;
      canvas.height = box.clientHeight;
      // let line = this.ctx.createLinearGradient(0, 0, 0, box.clientHeight);
      // line.addColorStop(0, this.objColor[0]);
      // line.addColorStop(0.5, this.objColor[1]);
      // line.addColorStop(1, this.objColor[2]);
      // this.ctx.fillStyle = line;
    },
    randomColor() {
      let color = "123456789abcde";
      let randomColor = "#";
      for (let i = 0; i < 6; i++) {
        randomColor += color[parseInt(Math.random() * color.length)];
      }
      return randomColor;
    },
    changeColor() {
      this.objColor = [];
      for (let i = 0; i < 3; i++) {
        this.objColor.push(this.randomColor());
      }
      let box = document.getElementById("player");
      let line = this.ctx.createLinearGradient(0, 0, 0, box.clientHeight);
      line.addColorStop(0, this.objColor[0]);
      line.addColorStop(0.5, this.objColor[1]);
      line.addColorStop(1, this.objColor[2]);
      this.ctx.fillStyle = line;
    },
    draw(arr) {
      let box = document.getElementById("player");
      if (!box) return;
      this.ctx.clearRect(0, 0, box.clientWidth, box.clientHeight);
      let w = box.clientWidth / (this.size / 2);
      for (let i = 0; i < this.size; i++) {
        let h = (arr[i] / 256) * box.clientHeight;
        // console.log(w,h)
        // this.ctx.fillRect(0, 0, 150, 75);
        this.ctx.fillRect(w * i, box.clientHeight - h, w * 0.6, h);
      }
    },
    changeVolume() {
      this.gainNode.gain.value = this.changeValue / 100;
    },
    loadMusic(xhr, url) {
      let n = ++this.count;
      this.source && this.source[this.source.stop ? "stop" : "noteOff"]();
      this.gainNode = this.ac[
        this.ac.createGain ? "createGain" : "createGainNode"
      ]();
      this.gainNode.gain.value = this.changeValue / 100;
      this.gainNode.connect(this.ac.destination);
      this.analyser.fftSize = this.size * 2;
      this.analyser.connect(this.gainNode);
      xhr.abort();
      xhr.open("GET", "/ROO" + url);
      xhr.responseType = "arraybuffer";
      let mask = document.getElementsByClassName("music-mask")[0];
      mask.style.display = "block";
      xhr.onload = () => {
        if (n != this.count) return;
        this.ac.decodeAudioData(
          xhr.response,
          buffer => {
            if (n != this.count) return;
            let bufferSource = this.ac.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.loop = true;
            // bufferSource.connect(ac.destination);
            // bufferSource.connect(this.gainNode);
            bufferSource.connect(this.analyser);
            // console.log(this.analyser);
            mask.style.display = "none";
            bufferSource[bufferSource.start ? "start" : "noteOn"](0);
            this.$store.commit("currentMusic", bufferSource);
            this.source = bufferSource;
          },
          err => console.log(err)
        );
      };
      xhr.send();
    },
    play() {
      let xhr = new XMLHttpRequest();
      let url = this.$route.query.url;
      this.loadMusic(xhr, url.split("ROO")[1]);
    },
    pause() {
      this.source && this.source[this.source.stop ? "stop" : "noteOff"]();
    },
    visualizer(analyser) {
      let arr = new Uint8Array(analyser.frequencyBinCount);
      let draw = this.draw;
      requestAnimationFrame =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      function v() {
        analyser.getByteFrequencyData(arr);
        draw(arr);
        // console.log(analyser.context.currentTime);
        requestAnimationFrame(v);
      }
      requestAnimationFrame(v);
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
  position: relative;
}
.aside-content {
  width: 360px;
  margin: 20px;
  float: right;
}
.music-player {
  width: 100%;
  min-height: 300px;
}
.music-mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 40%;
  height: 40%;
  left: 100%;
  top: 100%;
  margin-left: -70%;
  margin-top: -40%;
  text-align: center;
  color: white;
}
.mask-img {
  animation: circle 6s linear 0s infinite;
  margin-top: 20px;
  /* animation:circle 1.5s infinite linear; */
}
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  .music-mask {
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  margin-left: 0%;
  margin-top: 0%;
}
.mask-img {
  margin-top: 150px;
  /* animation:circle 1.5s infinite linear; */
}
}
</style>




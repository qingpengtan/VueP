<template>
  <div class="footer-warp">
    <div class="footer-content">
      <div class="footer-text">
        总访问量：{{res.visterNum}}，当前设备信息：
        IP：{{res.ip}} Browser：{{res.browser}} OS：{{res.os}}
        <br>山河远阔，人间烟火，无一是你，无一不是你。
        <br>©2018 就让你走 &nbsp;&nbsp;&nbsp;Created By
        <a href="http://www.zhiroad.cn/res/jianli/">Tang</a>
         | 
        <a href="http://www.zhiroad.cn/">清新版</a>
      </div>
    </div>
  </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "footer",
  data() {
    return {
      res: ""
    };
  },
  created() {
    this.$http.http("/index/visitInfo", {}).then(res => {
      this.res = res.data;
    });
  }
};
</script>
<style scoped>
.footer-warp {
  width: 100%;
  background: white;
  margin-top: 20px;
  border-top: 1px solid #ddd;
}
.footer-warp .footer-content {
  width: 1180px;
  height: 80px;
  margin: 0 auto;
  text-align: center;
  color: #aaaaaa;
  font-size: 13px;
  position: relative;
}
.footer-content .footer-text {
  position: absolute;
  width: 100%;
  left: 50%;
  margin-left: -50%;
  bottom: 10px;
}
@media only screen and (max-width: 481px) {
  .footer-warp {
    display: none;
  }
  .footer-warp .footer-content {
    width: 100%;
    height: 70px;
  }
}
</style>



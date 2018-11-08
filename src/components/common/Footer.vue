<template>
  <div class="footer-warp">
    <div class="footer-content">
        ©2018 黄桑的和萌萌与纪宝宝 &nbsp;&nbsp;&nbsp;Power By Tang
    </div>
  </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "footer"
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
  width: 1260px;
  height: 90px;
  margin: 0 auto;
  text-align: center;
  line-height: 140px;
  color: #aaaaaa;
  font-size: 13px;
}

@media only screen and (max-width: 481px) {
  .footer-warp{
    display: none;
  }
  .footer-warp .footer-content {
    width: 100%;
    height: 70px;
  }
}
</style>



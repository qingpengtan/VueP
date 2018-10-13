<template>
  <div class="footer-warp">
    <div class="footer-content">

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
}

@media only screen and (max-width: 481px) {
  .footer-warp{
    /* display: none; */
  }
  .footer-warp .footer-content {
    width: 100%;
    height: 70px;
  }
}
</style>



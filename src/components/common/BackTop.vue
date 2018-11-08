<template>
  <div class="back-top" @click="backTop">
    <img src="../../assets/back-top.png" alt="">
    <div>返回顶部</div>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {};
  },
  created() {},
  computed: {
    pageScrollY() {
      return this.$store.getters.pageScrollY;
    }
  },
  watch: {
    pageScrollY() {
      var backTop = document.getElementsByClassName("back-top")[0];
      if (this.pageScrollY > document.body.clientHeight / 2) {
        backTop.style.display = "block";
      } else {
        backTop.style.display = "none";
      }
    }
  },
  methods: {
    wscroll() {
      var backTop = document.getElementsByClassName("back-top")[0];
      window.onscroll = () => {
        var scrolltop = document.getElementsByTagName("html")[0].scrollTop;
        if (scrolltop > document.body.clientHeight / 2) {
          backTop.style.display = "block";
        } else {
          backTop.style.display = "none";
        }
      };
    },
    backTop() {
      clearInterval(pointTime);
      let pointTime = setInterval(function() {
        var scrolltop = document.getElementsByTagName("html")[0].scrollTop;
        if (scrolltop == 0) {
          clearInterval(pointTime);
        }
        var cur = parseInt(scrolltop);
        let speed = (0 - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        window.scrollTo(0, speed + cur);
      }, 30);
    }
  }
};
</script>
<style scoped>
.back-top {
  position: fixed;
  text-align: center;
  font-size: 13px;
  right: 85px;
  bottom: 50px;
  cursor: pointer;
  display: none;
}
@media only screen and (max-width: 481px) {
  .back-top {
    display: none !important;
  }
}
</style>



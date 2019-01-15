<template>
  <div id="app">
    <!-- <transition
        name="custom-classes-transition"
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
    >-->
    <!-- <transition name="fold-right"> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!-- </transition> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import "animate.css";

export default {};
</script>
<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css"; /*深色主题*/
/* @import "../static/css/iconfont.css";  */
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.5s;
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.5s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: 0.5s;
}

@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fold-right-in {
  0% {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fold-right-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
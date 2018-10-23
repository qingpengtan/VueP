<template>
    <div class="error-page">
        <div class="img-tip">
            <img src="../../assets/404.jpg" alt="">
        </div>
        <div class="error-handle">
          <router-link to="/">
            <el-button type="primary">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" @click="goBack">返回上一页</el-button>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped>
.error-page {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
}
.img-tip {
  width: 1280px;
  margin: 50px auto;
  margin-bottom: 0;
}
.error-handle {
  width: 200px;
  margin: 0 auto;
}
.error-handle >>> a {
  margin-right: 20px;
}
@media only screen and (max-width: 481px) {
  .img-tip,.img-tip img {
      margin-top: 100px;
    width: 100%;
  }
}
</style>

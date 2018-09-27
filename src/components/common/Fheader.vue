<template>
    <div>
        <div class="layout-header">
            <div class="header-main">

                <div class="header-navbar">
                    <router-link to='/'>
                        <img class="header-left" src="../../assets/logo.gif" />
                    </router-link>

                        <div class="header-right">
                            <el-dropdown trigger="click">
                                <span class="avatar right-span" v-show="loginStatus">
                                    <span>
                                        <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                                    </span>
                                        <span class="antd-pro-components-global-header-index-name">{{userName}}</span>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>个人中心</el-dropdown-item>
                                        <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>

                                    </el-dropdown-menu>
                            </el-dropdown>

                            <span class="right-span" v-show="!loginStatus">
                                <router-link to='/user-login'>
                                    <el-button type="primary" plain>登录</el-button>
                                </router-link>
                            </span>
                        </div>
                </div>
            </div>

        </div>

        <div class="header-content">
            <ul>
                <li>
                    <router-link to='/'>首页</router-link>
                </li>
                <li>日志</li>
                <li>论坛</li>
                <li>音乐</li>
                <li>视频</li>
                <li>
                    <router-link to='/edit-text'>写文章</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "fhead",
  data() {
    return {
      loginStatus: false,
      userName: ""
    };
  },
  created() {
    this.loginStatus = StringUtils.isEmpty(localStorage.getItem("x_token"))
      ? false
      : true;
    if (this.loginStatus) {
      this.userName = localStorage.getItem("x_userPhone");
    }
  },
  methods: {
    loginOut() {
      localStorage.clear();
      this.$router.push("/user-login");
    }
  }
};
</script>
<style scoped>
.layout-header {
  width: 100%;
  height: auto;
  background: #f4f5f5;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-main {
  width: 1260px;
  margin: 0 auto;
}

.header-navbar {
  height: 64px;
  width: 100%;
}

.header-content {
  height: auto;
  min-height: 50px;
  width: auto;
  margin-top: 1px;
  border-bottom: 1px solid #e8e8e8;
  background: white;
}

.header-content ul {
  width: 1260px;
  margin: 0 auto;
}
.header-content li {
  float: left;
  min-height: 50px;
  line-height: 50px;
  padding: 0 32px;
  letter-spacing: 2px;
}

.header-left {
  cursor: pointer;
  font-size: 20px;
  height: 64px;
  line-height: 64px;
  transition: all 0.3s, padding 0s;
  width: 68px;
  height: 64px;
  display: inline-block;
}

.header-right {
  float: right;
  height: 100%;
  margin-right: 20px;
}

.header-right .right-span {
  padding: 0 15px;
  cursor: pointer;
  display: inline-block;
  height: 100%;
  transition: all 0.3s;
  line-height: 64px;
}

.header-right .avatar span {
  text-align: center;
  font-size: 14px;
  height: 100%;
  display: inline-block;
}

.header-right img {
  width: 24px;
  height: 24px;
  position: relative;
  top: 7px;
}
</style>



<template>
  <div>
    <div class="layout-header">
      <div class="header-main">

        <div class="header-navbar">
          <router-link to='/' class="header-logo">
            <img class="header-left" src="../../assets/logo.gif" />
          </router-link>
          <div class="head-line"></div>
          <div class="nav-arrow" @click="isCollapse = false">
            <img class="header-left" src="../../assets/nav-menu.png" />
          </div>

          <div class="header-center">
            <el-input placeholder="搜索文章" v-model="searchContent" @keyup.enter.native="searchArticle()">
              <i class="el-icon-search el-input__icon" slot="suffix">
              </i>
            </el-input>
          </div>

          <div class="header-right">
            <el-dropdown trigger="click">
              <span class="avatar right-span" v-show="loginStatus">
                <span>
                  <img :src="userPic" alt="avatar">
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/person-info">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

            <div class="mobile-sapn">
              <span class="avatar right-span " v-show="loginStatus">
                <span>
                  <router-link to="/person-info"><img :src="userPic" alt="avatar"></router-link>
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
            </div>

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
          <router-link to='/' exact>主页</router-link>
        </li>
        <li>
          <router-link to='/daily'>日志</router-link>
        </li>
        <el-dropdown trigger="click">
          <li> <i class="el-icon-menu"></i>论坛</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for=" tag in articleTag" :key="tag.articleTagId">
              <router-link @click.native="pushTribune()" :to="{path:'/tribune', query:{articleTagId:tag.articleTagId}}">
                {{tag.articleTag}}
              </router-link>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <li @click="dialogVisible = true">写说说</li>
        <li>
          <router-link to='/edit-text'>写文章</router-link>
        </li>
        <li>
          <router-link to='/music'>音乐</router-link>
        </li>
      </ul>
    </div>

    <!--固定头-->
    <div class="header-content header-fixed">
      <div class=" fixed-header">

        <ul>
          <li>
            <router-link to='/' exact>主页</router-link>
          </li>
          <li>
            <router-link to='/daily'>日志</router-link>
          </li>
          <el-dropdown trigger="click">
            <li> <i class="el-icon-menu"></i>论坛</li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for=" tag in articleTag" :key="tag.articleTagId">
                <router-link @click.native="pushTribune()" :to="{path:'/tribune', query:{articleTagId:tag.articleTagId}}">
                  {{tag.articleTag}}
                </router-link>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
          <li @click="dialogVisible = true">写说说</li>
          <li>
            <router-link to='/edit-text'>写文章</router-link>
          </li>
          <li>
            <router-link to='/music'>音乐</router-link>
          </li>
        </ul>
        <div class="header-right fixed-right">
          <div class="fixed-search">
            <el-input placeholder="搜索文章" v-model="searchContent" @keyup.enter.native="searchArticle()">
              <i class="el-icon-search el-input__icon" slot="suffix">
              </i>
            </el-input>
          </div>
          <div class="fixed-info">
            <el-dropdown trigger="click">
              <span class="avatar right-span" v-show="loginStatus">
                <span>
                  <img :src="userPic" alt="avatar">
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/person-info">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="说说记录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input type="textarea" v-model="content" :rows="5" placeholder="记录美好生活">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publish()">发表</el-button>
      </span>
    </el-dialog>

    <!-- 移动端导航侧边栏 -->
    <div class="mobile-side" v-show="!isCollapse" @click="isCollapse = true">
      <ul class="mobile-side-ul" id="mobile-side-ul">
        <li @click="selectMenu($event)">
          <router-link to='/' exact>主页</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to='/daily'>日志</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to='/music'>音乐</router-link>
        </li>
        <li>
          <router-link to='/edit-text'>写文章</router-link>
        </li>
        <li @click="dialogVisible = true,isCollapse = true">写说说</li>
        <li @click.stop="triume()"><i class="el-icon-menu"></i>论坛</li>
        <li v-show="showSecond">
          <ul class="mobile-ul-sec">
            <li v-for=" tag in articleTag" :key="tag.articleTagId" @click="selectMenu($event)">
              <router-link @click="pushTribune()" :to="{path:'/tribune', query:{articleTagId:tag.articleTagId}}">
                {{tag.articleTag}}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "fhead",
  props: ["searchWd"],
  data() {
    return {
      isCollapse: true,
      loginStatus: false,
      userName: "",
      userPic: "",
      textarea: "",
      dialogVisible: false,
      content: "",
      articleTag: "",
      showSecond: false,
      searchContent: this.searchWd
    };
  },
  watch: {
    searchWd() {
      this.searchContent = this.searchWd;
    }
  },
  created() {
    this.loginStatus = StringUtils.isEmpty(localStorage.getItem("x_token"))
      ? false
      : true;
    if (this.loginStatus) {
      this.userName = localStorage.getItem("x_userPhone");
      this.userPic = localStorage.getItem("x_userPic");
    }

    this.$http.http("/index/classify", { exculde: "yes" }).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
      }
    });
  },
  mounted() {
    this.wscroll();
  },
  methods: {
    wscroll() {
      var fixedHeader = document.getElementsByClassName(
        "header-content header-fixed"
      )[0];
      window.onscroll = () => {
        var scrolltop = document.getElementsByTagName("html")[0].scrollTop;
        if (scrolltop > 64) {
          fixedHeader.style.display = "block";
        } else {
          fixedHeader.style.display = "none";
        }
      };
    },
    searchArticle() {
      this.$router.push({
        path: "/search",
        query: { search: this.searchContent }
      });
    },
    triume() {
      this.showSecond = !this.showSecond;
      var el = document.querySelector("#mobile-side-ul");
      if (this.showSecond) {
        el.style.width = " 2.241379rem";
      } else {
        el.style.width = "1.896552rem";
      }
    },
    handleClose(done) {
      done();
    },
    selectMenu(e) {
      // document.querySelector(".mobile-side li a").style.color = 'white';
      // console.log(e.target)
      // e.target.style.color = "#066ac3";
    },
    publish() {
      if (this.content.trim() == "") {
        return;
      }
      this.$http
        .http("/index/save", {
          content: this.content,
          articleBrief: this.content
        })
        .then(res => {
          if (res.code == 1) {
            this.dialogVisible = false;
            this.$message.success("提交成功！");
          } else {
            this.$message.error(res.msg);
          }
        });
    },
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
  background: white;
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
  display: flex;
  display: -webkit-flex;
  position: relative;
}

.header-content {
  height: auto;
  min-height: 50px;
  width: auto;
  margin-top: 1px;
  border-bottom: 1px solid #e8e8e8;
  background: white;
}

>>> .el-dialog__body {
  padding: 10px 20px !important;
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
  cursor: pointer;
}

.header-left {
  cursor: pointer;
  font-size: 20px;
  height: 80px;
  line-height: 64px;
  transition: all 0.3s, padding 0s;
  width: 68px;
  display: inline-block;
  transform: scale(-1, 1);
}

.head-line {
  width: 770px;
  display: inline-block;
  height: 2px;
  background: #a5a5b5;
  position: absolute;
  bottom: 12px;
}
.header-center {
  flex: 1;
}
.header-center >>> input {
  width: 270px;
  float: right;
  margin-top: 15px;
}
.header-center >>> .el-input--small .el-input__icon {
  line-height: 60px;
}

.header-right {
  height: 100%;
  margin-right: 20px;
}
.header-right .mobile-sapn {
  display: none;
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
  border-radius: 50%;
  position: relative;
  top: 7px;
}
.header-username {
  display: inline-block !important;
}
.header-fixed {
  display: none;
  width: 100%;
  top: -1px;
  position: fixed;
  z-index: 10000;
}
.fixed-header {
  width: 1260px;
  margin: 0 auto;
}
.fixed-header ul {
  float: left;
  width: auto;
}
.fixed-header .fixed-right {
  float: right;
}
.fixed-right .fixed-search {
  float: left;
  margin-top: 7px;
}
.fixed-right .fixed-info {
  float: left;
}
.fixed-info .right-span {
  line-height: 50px;
}

@media only screen and (max-width: 481px) {
  .layout-header {
    background: #43bcff;
  }
  .header-main {
    width: 100%;
  }
  .header-right {
    margin-right: 0;
  }
  .header-navbar {
    height: 0.85rem;
  }
  .header-left {
    width: 0.45rem;
    height: 0.45rem;
    position: relative;
    left: 0.172414rem;
    margin-right: 0.172414rem;
    top: 0.182414rem;
  }

  .header-center >>> input {
    width: 90%;
    margin-right: 5%;
    margin-top: 0.155172rem;
  }

  .header-center >>> .el-input__inner {
    height: 0.517241rem;
    line-height: 0.517241rem;
  }
  .header-center >>> .el-input--small .el-input__icon {
    line-height: 0.856552rem;
    position: relative;
    right: 0.206897rem;
  }
  .header-right .el-dropdown {
    display: none;
  }
  .header-right .mobile-sapn {
    display: block;
  }
  .header-right .right-span {
    padding-left: 0;
    line-height: 0.85rem;
  }
  .header-content {
    display: none;
  }
  .header-content ul {
    width: 100%;
  }
  .header-content li {
    float: left;
    min-height: 0.5rem;
    padding: 0 0.12rem;
    padding-left: 0.18rem;
    letter-spacing: 1px;
    font-size: 14px;
  }
  >>> .el-dialog {
    width: 100% !important;
    position: absolute;
    bottom: 0;
    margin: 0;
  }
  >>> .el-dialog__body,
  >>> .el-dialog__header,
  >>> .el-dialog__footer {
    padding: 10px !important;
  }
  .header-right img {
    width: 0.568966rem;
    height: 0.568966rem;
    top: 0.15rem;
  }
  .header-username {
    display: none !important;
  }
  .header-logo,
  .head-line {
    display: none;
  }
  .header-fixed {
    display: none !important;
  }

  .mobile-side {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 21, 41, 0.4);
    z-index: 100000;
    overflow-y: scroll;
  }
  .mobile-side .mobile-side-ul {
    display: inline-block;
    color: white;
    height: 100vh;
    background: #1ca2ec;
    padding-top: 0.172414rem;
    box-sizing: border-box;
    animation: myfirst 0.5s;
    width: auto;
  }
  .mobile-side li {
    width: 1.206897rem;
    font-size: 0.241379rem;
  }
  .mobile-side .mobile-side-ul li {
    height: 0.775862rem;
    line-height: 0.775862rem;
    padding: 0 0.344828rem;
    color: white;
  }
  .mobile-side .mobile-ul-sec li {
    animation: mysecond 0.5s;
  }
  .mobile-side ul a {
    width: 100%;
    display: inline-block;
    height: 100%;
    color: white;
  }
  @keyframes myfirst {
    0% {
      width: 0;
    }
    80% {
      width: 1.896552rem;
    }
  }
  @keyframes mysecond {
    0% {
      height: 0;
    }
    100% {
      height: 0.775862rem;
    }
  }
}
</style>



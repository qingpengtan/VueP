<template>
  <div>
    <div class="layout-header">
      <div class="header-main">
        <div class="header-navbar">
          <router-link to="/" class="header-logo">
            <img class="header-left" src="../../assets/let.png" title="主页">
          </router-link>
          <div class="nav-arrow" @click="isCollapse = false">
            <img class="header-left" src="../../assets/nav-menu.png">
          </div>

          <div class="header-center">
            <el-input
              placeholder="搜索文章"
              v-model="searchContent"
              @keyup.enter.native="searchArticle()"
            >
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-input>
          </div>

          <div class="header-right">
            <el-dropdown>
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
              <span class="avatar right-span" v-show="loginStatus">
                <span>
                  <router-link to="/person-info">
                    <img :src="userPic" alt="avatar">
                  </router-link>
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
            </div>

            <span class="right-span" v-show="!loginStatus">
              <router-link to="/user-login">
                <el-button type="primary" plain>登录</el-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="header-empty"></div>

    <!--固定头-->
    <div class="header-content header-fixed">
      <div class="fixed-header">
        <ul>
          <router-link tag="li" to="/" class="fixed-logo header-logo">
            <img class="header-left" src="../../assets/let.png" title="主页">
          </router-link>
          <router-link tag="li" to="/music">音乐</router-link>
          <el-dropdown>
            <li>
              <i class="el-icon-menu"></i>版块
            </li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for=" tag in articleTag" :key="tag.articleTagId">
                <router-link
                  @click="pushTribune()"
                  :to="{path:`/tribune/${md(tag.articleTagId)}`}"
                >{{tag.articleTag}}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ul>
        <div class="header-right fixed-right">
          <!-- <el-switch
            v-model="randomColor"
            active-color="#13ce66"
            style="float:left;margin:15px"
            @click.native="randomCo"
          >
          </el-switch>-->
          <div class="fixed-search">
            <el-input
              placeholder="搜索文章"
              v-model="searchContent"
              @keyup.enter.native="searchArticle()"
            >
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-input>
          </div>
          <div class="fixed-info">
            <el-dropdown>
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
                <el-dropdown-item>
                  <router-link to="/edit-text">写文章</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="dialogVisible = true">笔录</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="杂谈笔录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input type="textarea" v-model="content" :rows="5" placeholder="该说点什么呢"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publish()">发表</el-button>
      </span>
    </el-dialog>

    <!-- 移动端导航侧边栏 -->
    <div class="mobile-side" v-show="!isCollapse" @click="isCollapse = true">
      <ul class="mobile-side-ul" id="mobile-side-ul">
        <li>
          <a href="http://www.zhiroad.cn" style="color:rgba(199, 93, 42, 0.7)">> 清新版</a>
        </li>
        <li @click="selectMenu($event)">
          <router-link to="/" exact>主页</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to="/daily">杂谈</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to="/music">音乐</router-link>
        </li>
        <li>
          <router-link to="/edit-text">写文章</router-link>
        </li>
        <li @click="dialogVisible = true,isCollapse = true">笔录</li>
        <li @click.stop="triume()">
          版块
          <i id="triArrow" class="el-icon-arrow-down"></i>
        </li>
        <li v-show="showSecond">
          <ul class="mobile-ul-sec">
            <li v-for=" tag in articleTag" :key="tag.articleTagId" @click="selectMenu($event)">
              <router-link
                @click="pushTribune()"
                :to="{path:`/tribune/${md(tag.articleTagId)}`}"
              >{{tag.articleTag}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StringUtils from "../../utils/StringUtils.js";
import md5 from "md5";

export default {
  name: "fhead",
  props: ["searchWd"],
  data() {
    return {
      isCollapse: true,
      loginStatus: false,
      randomColor: false,
      userName: "",
      userPic: "",
      textarea: "",
      dialogVisible: false,
      content: "",
      articleTag: "",
      showSecond: false,
      searchContent: this.searchWd,
      flag: false,
      timer: ""
    };
  },
  activated() {
    if (this.$route.path.indexOf("/search") == -1) {
      this.searchContent = "";
    }
  },
  computed: {
    pageScrollY() {
      return this.$store.getters.pageScrollY;
    }
  },
  watch: {
    searchWd() {
      this.searchContent = this.searchWd;
    }
  },
  created() {
    if (this.$route.path.indexOf("/search") != -1) {
      this.$store.commit("navMenuSelect", "");
    }
    this.loginStatus = StringUtils.isEmpty(localStorage.getItem("x_token"))
      ? false
      : true;
    if (this.loginStatus) {
      this.userName = localStorage.getItem("x_userPhone");
      this.userPic = localStorage.getItem("x_userPic");
    }
  },
  mounted() {
    this.$http
      .http("/index/classify", { exculde: "yes" })
      .then(res => {
        if (res.code == 1) {
          this.articleTag = res.data;
        }
      })
      .then(() => {
        let fMenuUl = document.getElementsByClassName("mobile-side-ul")[0];
        let fMenuLi = fMenuUl.getElementsByTagName("li");
        this.flag = true;
      });
  },
  methods: {
    searchArticle() {
      if (!this.searchContent) return;
      this.$router.push({
        path: "/search",
        query: { search: this.searchContent.trim() }
      });
    },
    triume() {
      this.showSecond = !this.showSecond;
      var arrow = document.getElementById("triArrow");
      arrow.style.transition = "all 0.2s";
      var el = document.querySelector("#mobile-side-ul");
      if (this.showSecond) {
        arrow.style.transform = "rotate(-180deg)";
        el.style.width = " 2.241379rem";
      } else {
        arrow.style.transform = "rotate(0deg)";
        el.style.width = "1.896552rem";
      }
    },
    handleClose(done) {
      done();
    },
    getColor() {
      let str = "123456789abcde";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += str[parseInt(Math.random() * str.length)];
      }
      return color;
    },
    randomCo() {
      let color = this.getColor();
      this.$el.querySelector(".header-content").style.background = color;
    },
    selectMenu(e) {
      let menu = e.target.innerText;
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
            this.$message.success("发表成功");
            let num = this.$store.getters.updateArticleNum;
            num++;
            this.$store.commit("updateArticleNum", num);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    loginOut() {
      let x_userPhone = localStorage.getItem("x_userPhone");
      localStorage.clear();
      localStorage.setItem("userPhone", x_userPhone);
      this.$router.push("/user-login");
    },
    md(value) {
      return md5(value).slice(0, 8) + value;
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
  width: 1180px;
  margin: 0 auto;
}

.header-navbar {
  height: 64px;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  position: relative;
  display: none;
}

.header-content {
  height: auto;
  min-height: 50px;
  width: auto;
  margin-top: 1px;
  border-bottom: 1px solid #7697b9;
  box-shadow: 0 0 5px;
  background: #7697b9;
}
.header-empty {
  height: 50px;
}
>>> .el-dialog__body {
  padding: 10px 20px !important;
}

.header-content ul {
  width: 1180px;
  margin: 0 auto;
  height: 50px;
}
.header-content li {
  float: left;
  min-height: 50px;
  line-height: 50px;
  padding: 0 20px;
  letter-spacing: 2px;
  cursor: pointer;
}

.header-left {
  cursor: pointer;
  font-size: 20px;
  height: 50px;
  position: relative;
  top: 7px;
  line-height: 64px;
  transition: all 0.3s, padding 0s;
  display: inline-block;
}
.fixed-logo {
  padding: 0;
  top: -7px;
  position: relative;
  margin-right: 8px;
  border-bottom: none;
}
.header-logo {
  border-bottom: none !important;
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
  width: 100%;
  top: -1px;
  position: fixed;
  z-index: 100;
}
.fixed-header {
  width: 1180px;
  margin: 0 auto;
}
.fixed-header ul {
  float: left;
  width: auto;
  color: white;
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
.header-content li:hover {
  border-bottom: 2px solid white;
  color: white;
}
.nav-arrow {
  display: none;
}
>>> .el-dropdown {
  color: white;
}
>>> .el-dropdown-menu__item .active-class {
  color: #0454a9 !important;
  border-bottom: none;
}
@media only screen and (max-width: 481px) {
  .layout-header {
    background: #7697b9;
  }
  .header-main {
    width: 100%;
  }
  .header-right {
    margin-right: 0;
  }
  .header-navbar {
    display: flex;
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
  .header-content,
  .header-empty {
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
  .header-logo {
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
    background: rgba(0, 21, 41, 0.4);
    z-index: 100000;
    font-size: 0;
  }

  .mobile-side-ul {
    overflow-y: scroll;
  }
  .mobile-side li a {
    border: none;
  }
  .mobile-side .mobile-side-ul {
    display: inline-block;
    height: 100vh;
    background: #7697b9;
    padding-top: 0.172414rem;
    box-sizing: border-box;
    transition: all 0.5s;
    animation: myfirst 0.5s;
    width: auto;
  }
  .testColor {
    color: black;
  }
  .mobile-side li {
    width: 1.206897rem;
    font-size: 0.241379rem;
  }
  .mobile-side .mobile-side-ul li {
    height: 0.775862rem;
    line-height: 0.775862rem;
    padding: 0 0.344828rem;
  }
  .mobile-side .mobile-ul-sec li {
    animation: mysecond 0.5s;
  }
  .mobile-side ul a {
    width: 100%;
    display: inline-block;
    height: 100%;
  }
  .nav-arrow {
    display: block;
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



<template>
  <div>
    <div class="layout-header">
      <div class="header-main">

        <div class="header-navbar">
          <router-link
            to='/'
            class="header-logo"
          >
            <img
              class="header-left"
              src="../../assets/let.png"
            />
          </router-link>
          <div
            class="nav-arrow"
            @click="isCollapse = false"
          >
            <img
              class="header-left"
              src="../../assets/nav-menu.png"
            />
          </div>

          <div class="header-center">
            <el-input
              placeholder="搜索文章"
              v-model="searchContent"
              @keyup.enter.native="searchArticle()"
            >
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
              >
              </i>
            </el-input>
          </div>

          <div class="header-right">
            <el-dropdown trigger="click">
              <span
                class="avatar right-span"
                v-show="loginStatus"
              >
                <span>
                  <img
                    :src="userPic"
                    alt="avatar"
                  >
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
              <span
                class="avatar right-span "
                v-show="loginStatus"
              >
                <span>
                  <router-link to="/person-info"><img
                      :src="userPic"
                      alt="avatar"
                    ></router-link>
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
            </div>

            <span
              class="right-span"
              v-show="!loginStatus"
            >
              <router-link to='/user-login'>
                <el-button
                  type="primary"
                  plain
                >登录</el-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="header-empty"></div>

    <!--固定头-->
    <div class="header-content header-fixed">
      <div class=" fixed-header">
        <ul>
          <router-link
            tag="li"
            to='/'
            style="padding:0;top:-8px;position:relative;border-bottom:none"
            class="header-logo"
          >
            <img
              class="header-left"
              src="../../assets/let.png"
            />
          </router-link>
          <router-link
            tag="li"
            to='/music'
          >音乐</router-link>
          <el-dropdown trigger="click">
            <li> <i class="el-icon-menu"></i>版块</li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for=" tag in articleTag"
                :key="tag.articleTagId"
              >
                <router-link
                  @click="pushTribune()"
                  :to="{path:`/tribune/${tag.articleTagId}`}"
                >
                  {{tag.articleTag}}
                </router-link>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </ul>
        <div class="header-right fixed-right">
          <div class="fixed-search">
            <el-input
              placeholder="搜索文章"
              v-model="searchContent"
              @keyup.enter.native="searchArticle()"
            >
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
              >
              </i>
            </el-input>
          </div>
          <div class="fixed-info">
            <el-dropdown trigger="click">
              <span
                class="avatar right-span"
                v-show="loginStatus"
              >
                <span>
                  <img
                    :src="userPic"
                    alt="avatar"
                  >
                </span>
                <span class="header-username">{{userName}}</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/person-info">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to='/edit-text'> 写文章</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="dialogVisible = true">记日志</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="说说记录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        v-model="content"
        :rows="5"
        placeholder="记录美好生活"
      >
      </el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="publish()"
        >发表</el-button>
      </span>
    </el-dialog>

    <!-- 移动端导航侧边栏 -->
    <div
      class="mobile-side"
      v-show="!isCollapse"
      @click="isCollapse = true"
    >
      <ul
        class="mobile-side-ul"
        id="mobile-side-ul"
      >
        <li @click="selectMenu($event)">
          <router-link
            to='/'
            exact
          >主页</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to='/daily'>日记</router-link>
        </li>
        <li @click="selectMenu($event)">
          <router-link to='/music'>音乐</router-link>
        </li>
        <li>
          <router-link to='/edit-text'>写文章</router-link>
        </li>
        <li @click="dialogVisible = true,isCollapse = true">写说说</li>
        <li @click.stop="triume()">版块 <i
            id="triArrow"
            class="el-icon-arrow-down"
          ></i></li>
        <li v-show="showSecond">
          <ul class="mobile-ul-sec">
            <li
              v-for=" tag in articleTag"
              :key="tag.articleTagId"
              @click="selectMenu($event)"
            >
              <router-link
                @click="pushTribune()"
                :to="{path:`/tribune/${tag.articleTagId}`}"
              >
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
      searchContent: this.searchWd,
      flag: false
    };
  },
  activated() {
    if (this.$route.path.indexOf("/search") == -1) {
      this.searchContent = "";
    }
    let fMenuUl = document.getElementsByClassName("mobile-side-ul")[0];
    let fMenuLi = fMenuUl.getElementsByTagName("li");
    Array.from(fMenuLi).forEach(element => {
      if (this.$store.getters.navMenuSelect == element.innerText.trim()) {
        element.firstElementChild.style.color = "#066ac3";
      }
    });
  },
  computed: {
    pageScrollY() {
      return this.$store.getters.pageScrollY;
    }
  },
  watch: {
    searchWd() {
      this.searchContent = this.searchWd;
    },
    $route(to, from) {
      let fMenuUl = document.getElementsByClassName("mobile-side-ul")[0];
      if (!fMenuUl) return;
      let fMenuLi = fMenuUl.getElementsByTagName("li");
      if (this.flag) {
        Array.from(fMenuLi).forEach(element => {
          if (this.$store.getters.navMenuSelect == element.innerText.trim()) {
            element.firstElementChild.style.color = "#066ac3";
          } else {
            if (element.firstElementChild)
              element.firstElementChild.style.color = "white";
          }
        });
      }
    },
    pageScrollY() {}
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
        Array.from(fMenuLi).forEach(element => {
          if (this.$store.getters.navMenuSelect == element.innerText.trim()) {
            element.firstElementChild.style.color = "#066ac3";
          }
        });
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
    selectMenu(e) {
      let menu = e.target.innerText;
      switch (menu) {
        case "主页":
          this.$store.commit("navMenuSelect", "主页");
          break;
        case "日记":
          this.$store.commit("navMenuSelect", "日记");
          break;
        case "音乐":
          this.$store.commit("navMenuSelect", "音乐");
          break;
        case "Java":
          this.$store.commit("navMenuSelect", "Java");
          break;
        case "Web开发":
          this.$store.commit("navMenuSelect", "Web开发");
          break;
        case "Go语言":
          this.$store.commit("navMenuSelect", "Go语言");
          break;
        case "大数据":
          this.$store.commit("navMenuSelect", "大数据");
          break;
        case "Python":
          this.$store.commit("navMenuSelect", "Python");
          break;
        case "其他":
          this.$store.commit("navMenuSelect", "其他");
          break;
        default:
          this.$store.commit("navMenuSelect", "");
      }
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
  display: none;
}

.header-content {
  height: auto;
  min-height: 50px;
  width: auto;
  margin-top: 1px;
  border-bottom: 1px solid #409eff;
  box-shadow: 0 0 5px;
  background: #409eff;
}
.header-empty{
  height: 50px;
}
>>> .el-dialog__body {
  padding: 10px 20px !important;
}

.header-content ul {
  width: 1260px;
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
.header-logo {
  border-bottom: none;
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
  z-index: 10000;
}
.fixed-header {
  width: 1260px;
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
>>> .el-dropdown-menu__item a {
  border-bottom: none;
  color: #666;
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
  .header-content,.header-empty {
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
    color: white;
    height: 100vh;
    background: #1ca2ec;
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



<template>
  <div>
    <div class="layout-header">
      <div class="header-main">

        <div class="header-navbar">
          <router-link to='/' class="header-logo">
            <img class="header-left" src="../../assets/logo.gif" />
          </router-link>
          <div class="nav-arrow" @click="isCollapse = false">
            <img class="header-left" src="../../assets/nav-menu.png" />
          </div>
          <div class="header-nav-menu" v-show="!isCollapse">
            <el-menu class="el-menu-vertical-demo" background-color="rgb(236, 236, 236)" style="padding-top:10px">
              <router-link to='/' exact>
                <el-menu-item index="1" @click="isCollapse = true">首页 </el-menu-item>
              </router-link>
              <router-link to='/daily'>
                <el-menu-item index="2" @click="isCollapse = true">日志 </el-menu-item>
              </router-link>
              <span @click="dialogVisible = true">
                <el-menu-item index="3" @click="isCollapse = true">写说说</el-menu-item>
              </span>
              <router-link to='/edit-text'>
                <el-menu-item index="4"> 写文章</el-menu-item>
              </router-link>
              <el-submenu index="5">
                <template slot="title">
                  <span>论坛</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="tag.articleTagId+''" v-for=" tag in articleTag" :key="tag.articleTagId">
                    <router-link @click.native="pushTribune()" :to="{path:'/tribune', query:{articleTagId:tag.articleTagId}}">
                      {{tag.articleTag}}
                    </router-link>
                  </el-menu-item>
                </el-menu-item-group>

              </el-submenu>
            </el-menu>

            <div style="position:absolute;right:-34px;top:0" @click="isCollapse = true">
              <i class="el-icon-d-arrow-left" style="font-size:24px;color:#43bcff;background:rgb(236, 236, 236);padding:5px"></i>
            </div>
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
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
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
      <ul v-show="!ifSearch">
        <li>
          <router-link to='/' exact>首页</router-link>
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
        <!-- <li>音乐</li> -->
        <!-- <li>视频</li> -->
        <li @click="dialogVisible = true">写说说</li>
        <li>
          <router-link to='/edit-text'>写文章</router-link>
        </li>
      </ul>
      <div v-show="ifSearch">

        <ol style="display:inline-block">
          <li>
            <router-link to='/' exact>首页</router-link>
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
          <!-- <li>音乐</li> -->
          <!-- <li>视频</li> -->
          <li @click="dialogVisible = true"><i class="el-icon-edit"></i>写说说</li>
          <li>
            <i class="el-icon-edit"></i>
            <router-link to='/edit-text'>写文章</router-link>
          </li>
          <span style="color:#43bcff;font-weight:bold;font-size:20px;position:relative;left:20px;top:-16px;">
            <i class="el-icon-tickets"></i> {{dispayText}}
          </span>
        </ol>
      </div>
    </div>

    <el-dialog title="说说记录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input type="textarea" v-model="content" :rows="5" placeholder="记录美好生活">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publish()">发表</el-button>
      </span>
    </el-dialog>
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
      textarea: "",
      dialogVisible: false,
      content: "",
      articleTag: "",
      ifSearch: false,
      searchContent: this.searchWd,
      dispayText: "XXXX"
    };
  },
  watch:{
    searchWd(){
      this.searchContent = this.searchWd
    }
  },
  created() {
    this.loginStatus = StringUtils.isEmpty(localStorage.getItem("x_token"))
      ? false
      : true;
    if (this.loginStatus) {
      this.userName = localStorage.getItem("x_userPhone");
    }

    this.$http.http("/index/classify", { exculde: "yes" }).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
      }
    });
  },
  methods: {
    searchArticle() {
      this.$router.push({
        path: "/search",
        query: { search: this.searchContent }
      });
    },
    pushTribune() {
      // this.ifSearch = true;
      // this.dispayText ="论坛";
    },
    handleClose(done) {
      done();
    },
    publish() {
      if (this.content.trim() == "") {
        return;
      }
      this.$http.http("/index/save", { content: this.content }).then(res => {
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
  display: flex;
  display: -webkit-flex;
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
  height: 64px;
  line-height: 64px;
  transition: all 0.3s, padding 0s;
  width: 68px;
  height: 64px;
  display: inline-block;
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
.header-username {
  display: inline-block !important;
}
.header-nav-menu,
.nav-arrow {
  display: none;
}

@media only screen and (max-width: 481px) {
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
    top: 0.172414rem;
  }

  .header-center >>> input {
    width: 90%;
    margin-right: 5%;
    margin-top: 0.155172rem;
  }
  .header-center >>> .el-input--small .el-input__icon {
    line-height: 0.896552rem;
    position: relative;
    right: 0.206897rem;
  }
  .header-right .right-span {
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
    top: 0.137931rem;
  }
  .header-username {
    display: none !important;
  }
  .nav-arrow {
    display: inline;
  }
  .header-nav-menu {
    display: block;
    position: absolute;
    top: 0;
    background: rgb(236, 236, 236);
    z-index: 10000;
    height: 100vh;
  }
  .el-menu-vertical-demo {
    height: 100vh;
    overflow: scroll;
  }
  .header-logo {
    display: none;
  }
}
</style>



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
      <ul>
        <li>
          <router-link to='/' exact>首页</router-link>
        </li>
        <li>
          <router-link to='/daily' xact>日志</router-link>
        </li>
        <el-dropdown trigger="click">
          <li>论坛</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for=" tag in articleTag" :key="tag.articleTagId">
              <router-link :to="{path:'/tribune', query:{articleTagId:tag.articleTagId}}">
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
  data() {
    return {
      loginStatus: false,
      userName: "",
      textarea: "",
      dialogVisible: false,
      content: "",
      articleTag: ""
    };
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

@media only screen and (max-width: 481px) {
  .header-main {
    width: 100%;
  }
  .header-right {
    margin-right: 0;
  }
  .header-navbar {
    height: 1rem;
  }
  .header-left {
    height: 1rem;
    line-height: 1rem;
  }
  .header-right .right-span {
    line-height: 1rem;
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
}
</style>



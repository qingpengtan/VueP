<template>
    <div>
        <div class="layout-header">
            <div class="header-main">

                <div class="header-navbar">
                    <img class="header-left" src="../../assets/logo.gif" />
                    <div style="background:red;height:64px;float:left;width:auto">

                    </div>
                    <div class="header-right">
                        <!-- <span class="avatar right-span">
                            <span>
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                            </span>
                            <span class="antd-pro-components-global-header-index-name">Serati Ma</span>
                        </span> -->
                        <span class="right-span">
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
                <li>首页</li>
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
export default {};
</script>
<style>
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
  letter-spacing: 3px;
}

.header-left {
  cursor: pointer;
  font-size: 20px;
  height: 64px;
  line-height: 64px;
  transition: all 0.3s, padding 0s;
  background: burlywood;
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



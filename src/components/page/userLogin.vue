<template>

    <div class="login-register-page">

        <div class="login-register-home">

            <div class="header-img">
                <img src="../../assets/timg.gif" alt="">
            </div>
            <!-- <div class="header-input">

                <input type="text" name="" id="" placeholder="请输入手机号或者用户名">
                <input type="text" name="" id="" placeholder="请输入密码">
                <div class="forget-pswd">
                    <span style="float:right">
                        忘记密码
                    </span>
                </div>
                <button class="login">登录</button>

                <div class="login-footer">
                    XXXXXXXXXXXXXXXXXX
                </div>

            </div> -->

            <div class="header-input">

                <input type="text" name="" id="" placeholder="请输入手机号或者用户名">
                <input type="password" name="" id="" placeholder="请输入密码">
                <input type="text" name="" id="" placeholder="请输入短信验证码">

                <div class="send-code">
                    发送验证码
                </div>

                <button class="register">注册</button>

                <div class="register-footer">
                    查看用户协议
                </div>

            </div>

            <div class="login-tip">
                <!-- 已有账号？登录 -->
                没有账号？注册
            </div>

        </div>

    </div>

</template>
<script>
export default {
  name: "login"
};
</script>
<style>
.login-register-page {
  background-image: url(../../assets/sign_bg.db29b0fbd2f78dd8c1b7.png);
  background-repeat: no-repeat;
  background-color: #b8e5f8;
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: auto;
  /* padding-right: 15px; */
}

.login-register-home {
  width: 432px;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-sizing: border-box;
  height: 505px;
  margin-top: 64px;
  color: white;
}
.header-img {
  font-size: 0;
}
.header-img img {
  width: 100%;
  height: 150px;
}
.header-input {
  padding: 0 40px 36px 40px;
  height: 265px;
  width: 352px;
  background: #536dfd;
  position: relative;
}
.header-input input {
  width: 100%;
  margin-top: 16px;
  height: 48px;
  border: none;
  outline: none;
  color: white;
  background: #536dfd;
  font-size: 16px;
  border-bottom: 1px solid white;
}
.header-input input::-webkit-input-placeholder {
  color: #dcdcdc;
}
.header-input input:-webkit-input-placeholder {
  color: #dcdcdc;
}
.header-input input::-moz-input-placeholder {
  color: #dcdcdc;
}
.header-input input:-webkit-input-placeholder {
  color: #dcdcdc;
}
.header-input input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #dcdcdc;
}

.header-input .forget-pswd {
  margin-top: 12px;
  height: auto;
  width: 100%;
}
.header-input button {
  width: 100%;
  height: 36px;
  margin-top: 30px;
  border: none;
  background: white;
  color: #666666;
  cursor: pointer;
  border-radius: 3px;
  font-size: 16px;
}
.login-footer {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.register-footer {
  margin-top: 10px;
}
.register-tip,
.login-tip {
  /* padding: 0 40px; */
  width: 100%;
  text-align: center;
  color: #666666;
  margin-top: 15px;
  font-size: 16px;
}
.send-code{
    position: absolute;
    height: 40px;
    width: 120px;
    left: 270px;
    top:142px;
    background: white;
    color: #536dfd;
    font-size: 16px;
    line-height: 40px;
    border-radius: 3px;
    cursor: pointer;
}
</style>

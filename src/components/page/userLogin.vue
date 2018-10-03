<template>

  <div class="login-register-page">

    <div class="login-register-home">

      <div class="header-img">
        <img src="../../assets/timg.gif" alt="">
            </div>
        <div class="header-input" v-show="isLogin">

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">

            <el-form-item prop="username" :error="errorMsg">
              <el-input type="text" v-model="ruleForm.username" placeholder="请输入手机号或者用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="forget-pswd">
            <span style="float:right">
              忘记密码
            </span>
          </div>
          <button class="login" style="margin-top:25px" @click="login('ruleForm')">登录</button>

          <div class="login-footer">
            XXXXXXXXXXXXXXXXXX
          </div>

        </div>

        <div class="header-input" v-show="!isLogin">

          <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
            <el-form-item prop="userPhone" :error="errorRegister">
              <el-input type="text" v-model="registerForm.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input type="text" v-model="registerForm.imageCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-form>

          <div class="send-code" @click="changeCode()">
            <img :src=imageCode alt="">
          </div>

            <button class="register" @click="register('registerForm')">注册</button>

            <div class="register-footer">
              查看用户协议
            </div>

          </div>

          <div class="login-tip">
            <span v-show="!isLogin">
              已有账号？<span @click="isLogin=!isLogin" class="point">登录</span>
            </span>
            <span v-show="isLogin">
              没有账号？<span @click="isLogin=!isLogin" class="point">注册</span>
            </span>
          </div>

        </div>

      </div>

</template>
<script>
export default {
  name: "login",
  data() {
    return {
      isLogin: true,
      imageCode: "/user/verifiCode",
      ruleForm: {
        username: "",
        password: ""
      },
      registerForm: {
        userPhone: "",
        password: "",
        imageCode: ""
      },
      errorMsg: "",
      errorRegister: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      registerRule: {
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .http("/user/login", {
              userName: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.code == 1) {
                localStorage.setItem("x_token", res.data.token);
                localStorage.setItem("x_userName", res.data.userName);
                localStorage.setItem("x_userPhone", res.data.userPhone);
                localStorage.setItem("x_role", res.data.role);
                this.$router.push("/");
              } else {
                this.errorMsg = res.msg;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = new RegExp(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,16}$/);
          let reg2 = /^1[345678][0-9]{9}$/;
          if (!reg2.test(this.registerForm.userPhone)) {
            return (this.errorRegister = "请输入正确的手机号码");
          }
          if (!reg.test(this.registerForm.password)) {
            return (this.errorRegister = "密码由8-16位数字和字母组成");
          }
          this.$http
            .http("/user/regist", {
              userPhone: this.registerForm.userPhone,
              password: this.registerForm.password,
              imageCode: this.registerForm.imageCode
            })
            .then(res => {
              if (res.code == 1) {
                this.isLogin = true;
                // this.registerForm.resetFields();
                this.$message.success("注册成功！");
              } else {
                this.errorRegister = res.msg;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    changeCode() {
      this.imageCode = "/user/verifiCode?a=" + new Date().getTime();
    }
  }
};
</script>
<style scoped>
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
.header-input >>> input {
  /* .header-input .el-form .el-form-item .el-form-item__content .el-input input { */
  width: 100%;
  margin-top: 16px;
  height: 36px !important;
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
  margin-top: 15px;
  border: none;
  background: white;
  color: #666666;
  cursor: pointer;
  border-radius: 3px;
  font-size: 16px;
}
.login-footer {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
.register-footer {
  margin-top: 10px;
}
.login-tip {
  /* padding: 0 40px; */
  width: 100%;
  text-align: center;
  color: #666666;
  margin-top: 15px;
  font-size: 16px;
}
.login-tip .point {
  cursor: pointer;
  color: #536dfd;
}
.send-code {
  position: absolute;
  height: 36px;
  width: 120px;
  left: 270px;
  top: 142px;
  background: white;
  color: #536dfd;
  font-size: 15px;
  line-height: 36px;
  border-radius: 3px;
  cursor: pointer;
}
.send-code img {
  width: 120px;
  height: 36px;
}
@media only screen and (max-width: 481px) {
  .login-register-home {
    width: 100%;
    margin-top: 1.37931rem;
  }
  .header-input {
    padding: 0 40px 36px 40px;
    width: calc(100% - 80px);
    background: #536dfd;
    position: relative;
  }
  .send-code {
    height: 0.62069rem;
    width: 2.068966rem;
    left: 3.706897rem;
    line-height: 0.62069rem;
  }

  .send-code img {
    height: 0.62069rem;
    width: 2.068966rem;
  }
}
</style>

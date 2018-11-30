<template>

  <div>

    <Header class="ifHead"></Header>

    <div class="layout-main">

      <div class="layout-content">

        <div class="header-bg">

          <div
            style="position:absolute;top:8px;left:14px"
            class="home-btn"
          >
            <router-link
              to='/'
              style="border-bottom:none"
            >
              <img
                src="../../assets/HOME.png"
                alt=""
              >
            </router-link>
          </div>

          <!--
          <div style="position:absolute;top:15px;right:25px;color:white;font-size:20px">
            <i class="el-icon-edit-outline"></i>
            <input style="position:absolute;width:20px;height:20px;right:0;top:0;opacity:0" class="" type="file" name="image" accept="image/*" @change="setImageBg" />
          </div>
-->
          <div class="header-avater">
            <div class="header-avatar-div">
              <img
                :src="cropImg"
                class="pre-img"
              >
              <input
                class="crop-input"
                type="file"
                name="image"
                accept="image/*"
                @change="setImage"
              />
            </div>
            <el-dialog
              title="裁剪图片"
              :visible.sync="dialogVisible"
              width="50%"
            >
              <!-- <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper> -->
              <vue-cropper
                ref='cropper'
                :src="imgSrc"
                style="width:100%;height:300px;"
              ></vue-cropper>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button
                  type="primary"
                  @click="uploadImage()"
                >确 定</el-button>
              </span>
            </el-dialog>
            <div
              class="header-avatar-div mobile-style"
              style="margin-top:30px"
            >
              <div>
                <h1>{{form.userName}}</h1>
              </div>
              <div
                style="margin-top:5px"
                v-if="form.provinceN"
              >{{form.provinceN}} {{form.cityN}}</div>
              <div
                style="margin-top:5px"
                v-else
              >暂无居住地</div>
            </div>
          </div>
          <div class="header-right-contatin">
            <div class="header-right-div">
              <div>
                <h2>关注</h2>
              </div>
              <div style="margin-top:5px">00</div>
            </div>
            <div class="header-right-div">
              <div>
                <h2>关注</h2>
              </div>
              <div style="margin-top:5px">00</div>
            </div>
          </div>
        </div>
        <div
          class="main-content"
          style="padding: 50px 50px 32px 80px"
        >

          <el-tabs
            value="first"
            tab-position="left"
            type="border-card"
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="个人资料"
              name="info"
            >

              <div class="person-info-edit">
                <el-form
                  ref="form"
                  :model="form"
                  style="margin-top:10px"
                  label-width="80px"
                >

                  <el-row :gutter="20">
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="电话">
                        <span>{{form.userPhone}}</span>
                      </el-form-item>
                    </el-col>

                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="角色">
                        <span>{{form.roleId == 1 ? '普通' : 'XX'}}</span>
                      </el-form-item>

                    </el-col>

                  </el-row>

                  <el-row :gutter="20">
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="用户名">
                        <span v-show="!isEdit"> {{form.userName}}</span>
                        <el-input
                          v-model="form.userName"
                          v-show="isEdit"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="性别">
                        <span v-show="!isEdit">{{form.sex}}</span>
                        <el-radio
                          v-model="form.sex"
                          label="男"
                          v-show="isEdit"
                        >男</el-radio>
                        <el-radio
                          v-model="form.sex"
                          label="女"
                          v-show="isEdit"
                        >女</el-radio>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="20">
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="出生日期">
                        <span v-show="!isEdit">{{form.birthday}}</span>
                        <el-date-picker
                          type="date"
                          v-show="isEdit"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          v-model="form.birthday"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="省份/城市">
                        <span v-show="!isEdit">{{form.provinceN}} {{form.cityN}}</span>
                        <el-cascader
                          :options="options"
                          v-model="form.province"
                          v-show="isEdit"
                        ></el-cascader>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="20">
                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="年龄">
                        <span>{{form.age}}</span>
                        <!-- <el-input v-model="form.age" v-show="isEdit"></el-input> -->
                      </el-form-item>
                    </el-col>

                    <el-col
                      :xs="20"
                      :sm="8"
                    >
                      <el-form-item label="详细住址">
                        <span v-show="!isEdit">{{form.address}}</span>
                        <el-input
                          type="textarea"
                          rows="1"
                          v-model="form.address"
                          v-show="isEdit"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-form-item label="兴趣标签">
                    <span v-show="!isEdit">{{form.userTagName}}</span>
                    <el-checkbox-group
                      v-model="form.userTag"
                      v-show="isEdit"
                    >
                      <el-checkbox
                        v-for=" tag in articleTag"
                        :key=tag.articleTagId
                        :label=tag.articleTagId
                      >{{tag.articleTag}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>

                  <div class="finish-btn">
                    <div v-show="isEdit">
                      <i
                        class="el-icon-close"
                        @click="isEdit = !isEdit"
                      ></i> &nbsp;
                      <i
                        class="el-icon-check"
                        @click="updateInfo('form')"
                      ></i>
                    </div>
                    <div v-show="!isEdit">
                      <i
                        class="el-icon-edit-outline"
                        @click="isEdit = !isEdit"
                      ></i>
                    </div>
                  </div>

                  <div
                    class="login-out"
                    v-show="!isEdit"
                  >
                    <el-button
                      type="danger"
                      @click="loginOut"
                    >退出登录</el-button>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="我的文章"
              name="article"
            >
              <el-card
                class="box-card"
                @touchmove.native="touchMove()"
              >
                <div
                  v-for="article in articleList"
                  :key=article.articleId
                  class="text-item"
                >
                  <div class="img-tag">
                    <img
                      :src="article.articleTagName | tagToIcon"
                      alt=""
                    >
                  </div>
                  <div class="title">
                    <router-link :to="{path:`/detail/${article.articleId}`}">
                      {{article.articleTitle }}
                    </router-link>
                    <div class="time">
                      发布时间：{{article.createTime}}
                    </div>
                  </div>
                </div>
                <div class="mobile-more">
                  <span id="loading">
                    正在加载中 <i class="el-icon-loading"></i>
                  </span>
                  <span
                    id="nodata"
                    style="display:none"
                  >
                    没有更多数据啦
                  </span>
                </div>
                <div
                  class="pc-more"
                  @click="moreData"
                  v-show="disMore"
                >
                  加载更多
                </div>

              </el-card>
            </el-tab-pane>
            <el-tab-pane
              label=""
              name="a"
            ></el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
    <Footer></Footer>

  </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import VueCropper from "vue-cropperjs";
import cityData from "./city2.json";
import Footer from "../common/Footer.vue";
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "personInfo",
  components: {
    Header,
    Footer,
    VueCropper
  },
  data() {
    return {
      defaultSrc: "./static/img/img.jpg",
      imgSrc: "",
      cropImg: "",
      dialogVisible: false,
      totalPage: 1,
      current: 1,
      disMore: false,
      options: cityData,
      articleTag: "",
      isEdit: false,
      articleList: [],
      activeName: "info",
      imgFileName: "",
      form: {
        userName: "",
        userPhone: "",
        birthday: "",
        sex: "",
        age: "",
        roleId: "3",
        province: [],
        provinceN: "",
        cityN: "",
        address: "",
        userTag: [],
        createTime: "",
        userTagName: "",
        userPic: ""
      }
    };
  },
  created() {
    this.$http.http("/index/classify", { exculde: "yes" }).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
        this.getUser();
      }
    });
    this.getArticle(this.current);
  },
  //   beforeRouteEnter(to, from, next) {
  //   if ((from.path.indexOf("edit-text") != -1) || (from.path.indexOf("user-login") != -1)) {
  //     to.meta.keepAlive = false;
  //   } else {
  //     to.meta.keepAlive = true;
  //   }
  //   next();
  // },
  methods: {
    touchMove() {
      var clientH = this.$el.getElementsByClassName("el-tabs--border-card")[0]
        .clientHeight;
      var scrollTops = this.$el.getElementsByClassName("el-tabs__content")[0]
        .scrollTop;
      var totalHeight = this.$el.getElementsByClassName("el-tab-pane")[1]
        .clientHeight;
      if (clientH + Math.ceil(scrollTops) >= totalHeight) {
        this.moreData();
        return;
      }
    },

    moreData() {
      this.current++;
      if (this.current > this.totalPage) {
        this.$el.querySelector(".pc-more").innerHTML = "没有更多数据了";
        return;
      }
      this.getArticle(this.current);
    },
    updateInfo() {
      this.isEdit = !this.isEdit;
      let tempTag = this.form.userTag;

      let params = {
        userName: this.form.userName,
        birthday: this.form.birthday,
        sex: this.form.sex,
        province: this.form.province[0],
        city: this.form.province[1],
        address: this.form.address,
        userTag: StringUtils.isEmpty(tempTag) ? "" : tempTag.join(",")
      };

      this.$http.http("/user/save", params).then(res => {
        if (res.code == 1) {
          this.getUser();
          this.$message.success("更改成功");
        } else {
          this.$message.warning(res.msg);
        }
      });
    },

    getUser() {
      this.$http.http("/user/personInfo", {}).then(res => {
        if (res.code == 1) {
          let tempTag = res.data.userTag;
          this.form.userName = res.data.userName;
          this.form.userPhone = res.data.userPhone;
          this.form.birthday = res.data.birthday;
          this.form.sex = res.data.sex;
          this.form.age = res.data.age;
          this.form.roleId = res.data.roleId + "";
          this.form.province = [res.data.provinceV, res.data.cityV, ""];
          this.form.provinceN = res.data.province;
          this.form.cityN = res.data.city;
          this.form.address = res.data.address;
          this.form.userTags = res.data.userTag;
          this.form.userTagName = res.data.userTagName;
          this.cropImg = res.data.userPic;
          this.form.userPic = res.data.userPic;
          this.form.userTag = StringUtils.isEmpty(tempTag)
            ? []
            : StringUtils.str2Int(tempTag.split(","));
        }
      });
    },
    handleClick() {
      if (this.activeName == "article") {
        // this.getArticle();
      }
    },
    getArticle(page) {
      this.$http
        .http("/index/list", {
          personInfo: "phone",
          page: page
        })
        .then(res => {
          this.totalPage = res.data.totalPage;
          this.current = res.data.current;
          this.articleList = this.articleList.concat(res.data.articleList);
          this.disMore = true;
          if (res.data.articleList.length < 10) {
            this.$el.querySelector(".pc-more").innerHTML = "没有更多数据了";
            this.$el.querySelector("#loading").style.display = "none";
            this.$el.querySelector("#nodata").style.display = "inline";
          } else if (this.articleList.length < 20) {
            // this.getArticle(this.current + 1);
          }
        });
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      this.imgFileName = file.name;
      const reader = new FileReader();
      reader.onload = event => {
        this.dialogVisible = true;
        this.imgSrc = event.target.result;
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    setImageBg(e) {},
    uploadImage() {
      let data;
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();

      data = this.cropImg.split(",")[1];
      data = window.atob(data);
      var ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
      }

      var blob = new Blob([ia], { type: "image/png", name: this.imgFileName });
      var fd = new FormData();
      fd.append("img", blob);
      fd.append("imgeFileName", this.imgFileName);
      if (blob.size > 5041311) {
        this.cropImg = this.form.userPic;
        this.$message.error("头像上传失败啦，图片大小仅支持500kb以内");
        return;
      }

      let obj = {
        baseImg: this.cropImg,
        imageName: this.imgFileName
      };
      this.$axios
        .post("/upload/uploadAvater", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("x_token")
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.dialogVisible = false;
            this.cropImg = res.data.data;
            localStorage.setItem("x_userPic", res.data.data);
          } else {
            this.cropImg = this.form.userPic;
            this.$message.error(res.data.msg);
          }
        });
    },
    cancelCrop() {
      this.dialogVisible = false;
      this.cropImg = this.form.userPic;
    },
    loginOut() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        localStorage.clear();
        this.$router.push("/user-login");
      });
    }
  }
};
</script>


<style scoped>
.layout-main {
  width: 1260px;
  height: 100%;
  margin: 0 auto;
}

.layout-content {
  height: auto;
  width: auto;
  background: white;
  margin-top: 20px;
}
.header-bg {
  width: 100%;
  height: 180px;
  background-image: url(../../assets/5b6910e90001549a20000560.jpg);
  background-size: cover;
  position: relative;
}
.header-bg .header-avater {
  position: absolute;
  left: 100px;
  top: 70px;
}
.header-bg .header-avater img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
.header-bg .header-avater .header-avatar-div {
  float: left;
  margin-left: 30px;
  color: white;
}
.header-right-contatin {
  float: right;
  margin-top: 110px;
  margin-right: 150px;
  color: #dfdfdf;
  text-align: center;
}
.header-right-contatin .header-right-div {
  display: inline-block;
  margin-left: 30px;
}
.main-content >>> .el-tabs--border-card {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  height: 300px;
}
.main-content >>> .el-tabs__content {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.main-content >>> .el-tab-pane {
  margin-bottom: 30px;
}
.main-content >>> .person-info .person-info-edit {
  position: relative;
}
.main-content >>> .finish-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 20px;
}
.main-content >>> .el-card {
  box-shadow: none;
  border: none;
}
.main-content >>> .el-card .el-card__body {
  padding: 0;
}
.text-item {
  padding: 5px 0;
}
.text-item .title a {
  font-weight: 600;
}
.text-item .title .time {
  font-size: 12px;
  color: #999999;
}
.text-item .img-tag {
  float: left;
  margin-right: 10px;
  position: relative;
  top: 5px;
}

.pc-more {
  width: 120px;
  height: 35px;
  margin: 0 auto;
  margin-top: 15px;
  line-height: 35px;
  border: 1px solid #999999;
  border-radius: 4px;
  color: #999999;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  display: block;
}
.pc-more:hover {
  border: 1px solid #43bcff;
  color: #43bcff;
}
.mobile-more {
  display: none;
}
.main-content >>> .el-tabs__content::-webkit-scrollbar {
  display: none;
}
.crop-input {
  position: absolute;
  width: 135px;
  height: 100px;
  left: 35;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.pre-img {
  width: 100px;
  height: 100px;
  border: none;
}
.home-btn {
  display: none;
}
.login-out {
  margin-bottom: 20px;
  display: none;
}
.login-out button {
  width: 95%;
}
@media only screen and (max-width: 481px) {
  .layout-main {
    width: 100%;
    overflow: hidden;
  }
  .layout-content {
    margin-top: 0;
  }
  .header-bg {
    height: 2.748276rem;
  }
  .header-bg .header-avater {
    left: -0.344828rem;
    top: 1.265517rem;
  }
  .header-bg .header-avater img {
    width: 1.724138rem;
    height: 1.724138rem;
    border-radius: 50%;
  }
  .header-avater .mobile-style {
    margin: 0.241379rem !important;
    margin-top: 0.344828rem !important;
  }
  .mobile-style h1 {
    font-size: 24px;
  }
  .header-right-contatin {
    margin-right: 0.344828rem;
    margin-top: 2.413793rem;
    display: none;
  }
  .header-right-contatin .header-right-div {
    margin-left: 0.344828rem;
  }
  .header-right-div h2 {
    font-size: 20px;
  }
  .main-content {
    padding: 0px !important;
    margin-top: 20px;
  }

  .main-content >>> .finish-btn {
    top: 0px;
    right: 10px;
  }
  .main-content >>> .el-tab-pane {
    margin-bottom: 0px;
  }
  .main-content >>> .el-tabs--border-card {
    height: calc(100vh - 20px - 2.748276rem);
    border: none;
  }
  .main-content >>> .el-tabs__content {
    padding: 0;
  }
  .main-content >>> .el-col {
    height: 40px;
    width: 95%;
  }

  .main-content >>> .el-checkbox {
    width: 100px;
    margin-left: 0;
  }
  .text-item {
    border-bottom: 1px solid #eeeeee;
  }
  .text-item a {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    max-width: 3.3rem;
  }

  .pc-more {
    display: none !important;
  }
  .mobile-more {
    display: block;
    text-align: center;
    font-size: 14px;
  }
  .ifHead {
    display: none;
  }
  .header-avater >>> .el-dialog {
    width: 100% !important;
    height: 100vh;
    margin-top: 0 !important;
  }
  .home-btn {
    display: block;
  }
  .login-out {
    display: block;
  }
}
</style>


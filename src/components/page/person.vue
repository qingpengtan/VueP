<template>

    <div>

        <Header></Header>

        <div class="layout-main">

            <div class="layout-content">

                <div class="header-bg">

                    <div class="header-avater">
                        <div class="header-avatar-div">
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                        </div>
                            <div class="header-avatar-div mobile-style" style="margin-top:30px">
                                <div>
                                    <h1>{{form.userName}}</h1>
                                </div>
                                <div style="margin-top:5px">{{form.provinceN}} {{form.cityN}}</div>
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
                    <div class="main-content" style="padding: 50px 50px 32px 80px">

                        <el-tabs value="first" tab-position="left" type="border-card">
                            <el-tab-pane label="个人资料" name="first">

                                <div class="person-info-edit">
                                    <el-form ref="form" :model="form" style="margin-top:10px" label-width="80px">

                                        <el-row :gutter="20">
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="电话">
                                                    <span>{{form.userPhone}}</span>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="角色">
                                                    <span>{{form.roleId == 1 ? '普通' : 'XX'}}</span>
                                                </el-form-item>

                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="用户名">
                                                    <span v-show="!isEdit"> {{form.userName}}</span>
                                                    <el-input v-model="form.userName" v-show="isEdit"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="性别">
                                                    <span v-show="!isEdit">{{form.sex}}</span>
                                                    <el-radio v-model="form.sex" label="男" v-show="isEdit">男</el-radio>
                                                    <el-radio v-model="form.sex" label="女" v-show="isEdit">女</el-radio>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="出生日期">
                                                    <span v-show="!isEdit">{{form.birthday}}</span>
                                                    <el-date-picker type="date" v-show="isEdit" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="省份/城市">
                                                    <span v-show="!isEdit">{{form.provinceN}} {{form.cityN}}</span>
                                                    <el-cascader :options="options" v-model="form.province" v-show="isEdit"></el-cascader>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="年龄">
                                                    <span v-show="!isEdit">{{form.age}}</span>
                                                    <el-input v-model="form.age" v-show="isEdit"></el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :xs="20" :sm="8">
                                                <el-form-item label="详细住址">
                                                    <span v-show="!isEdit">{{form.address}}</span>
                                                    <el-input type="textarea" rows="1" v-model="form.address" v-show="isEdit"></el-input>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-form-item label="兴趣标签">
                                            <span v-show="!isEdit">{{form.userTags}}</span>
                                            <el-checkbox-group v-model="form.userTag" v-show="isEdit">
                                                <el-checkbox label="java">Java开发</el-checkbox>
                                                <el-checkbox label="web">前端开发</el-checkbox>
                                                <el-checkbox label="go">Go开发</el-checkbox>
                                                <el-checkbox label="bigdata">大数据</el-checkbox>
                                            </el-checkbox-group>
                                        </el-form-item>

                                        <div class="finish-btn">
                                            <div v-show="isEdit">
                                                <el-button type="primary" @click="updateInfo('form')">完成</el-button>
                                                <el-button @click="isEdit = !isEdit">取消</el-button>
                                            </div>
                                            <div v-show="!isEdit">
                                                <el-button type="primary" plain @click="isEdit = !isEdit">编辑</el-button>
                                            </div>

                                        </div>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="XXXX" name="s">XXXX</el-tab-pane>
                            <el-tab-pane label="XXXXXX" name="a">XXXXXX</el-tab-pane>
                        </el-tabs>

                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import Header from "../common/Fheader.vue";
import cityData from "./city2.json";
import StringUtils from "../../utils/StringUtils.js";

export default {
  name: "index",
  components: {
    Header
  },
  data() {
    return {
      options: cityData,
      isEdit: false,
      form: {
        // ---------------
        userName: "",
        userUuid: "",
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
        userUuid: ""
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    updateInfo() {
      this.isEdit = !this.isEdit;
      let tempTag = this.form.userTag;

      let params = {
        userName: this.form.userName,
        birthday: this.form.birthday,
        sex: this.form.sex,
        age: this.form.age,
        province: this.form.province[0],
        city: this.form.province[1],
        address: this.form.address,
        userTag: StringUtils.isEmpty(tempTag)? "" : tempTag.join(","),
        userUuid: this.form.userUuid
      };

      this.$http.http("/user/save", params).then(res => {
        if (res.code == 1) {
          this.getUser();
          this.$message.success("提交成功！");
        } else {
          this.$message.success(res.msg);
        }
      });
    },

    getUser() {
      this.$http.http("/user/personInfo", {}).then(res => {
        if (res.code == 1) {
          let tempTag = res.data.userTag;
          this.form.userName = res.data.userName;
          this.form.userUuid = res.data.userUuid;
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
          this.form.userTag = StringUtils.isEmpty(tempTag)? "" : tempTag.split(","),
          this.form.userUuid = res.data.userUuid;
        }
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
  height: 200px;
  background-image: url(../../assets/5b6910e90001549a20000560.jpg);
  background-size: cover;
  position: relative;
}
.header-bg .header-avater {
  position: absolute;
  left: 100px;
  top: 90px;
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
  margin-top: 130px;
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
.main-content >>> .person-info .person-info-edit {
  position: relative;
}
.main-content >>> .finish-btn {
  position: absolute;
  top: 30px;
  right: 40px;
}
@media only screen and (max-width: 481px) {
  .layout-main {
    width: 100%;
  }
  .header-bg {
    height:3.448276rem;
  }
  .header-bg .header-avater {
    left: -0.344828rem;
    top: 2.068966rem;
  }
  .header-bg .header-avater img {
    width: 1.724138rem;
    height: 1.724138rem;
    border-radius: 50%;
  }
  .header-avater .mobile-style {
    margin: .241379rem !important;
  }
  .mobile-style h1 {
    font-size: 24px;
  }
  .header-right-contatin {
    margin-right: .344828rem;
    margin-top: 2.413793rem;
  }
  .header-right-contatin .header-right-div {
    margin-left: .344828rem;
  }
  .header-right-div h2 {
    font-size: 20px;
  }
  .main-content {
    padding: 0px !important;
    margin-top: 20px;
  }

  .main-content >>> .finish-btn {
    top: 8px;
    right: 10px;
  }
  .main-content >>> .el-tabs--border-card {
    height: 505px;
    border: none;
  }
  .main-content >>> .el-tabs__content {
    padding: 0;
    padding-top: 30px;
  }
  .main-content >>> .el-col {
    height: 40px;
    width: 95%;
  }

  .main-content >>> .el-checkbox {
    width: 100px;
    margin-left: 0;
  }
}
</style>


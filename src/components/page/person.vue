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
                            <div class="header-avatar-div" style="margin-top:30px">
                                <div>
                                    <h1>星空</h1>
                                </div>
                                <div style="margin-top:5px">暂无居住地</div>
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
                                            <el-col :span="8">
                                                <el-form-item label="电话">
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item label="角色">

                                                </el-form-item>

                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="8">
                                                <el-form-item label="用户名">
                                                    <el-input v-model="form.userName"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">
                                                <el-form-item label="性别">
                                                    <el-radio v-model="form.sex" label="男">男</el-radio>
                                                    <el-radio v-model="form.sex" label="女">女</el-radio>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">

                                            <el-col :span="8">
                                                <el-form-item label="出生日期">
                                                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="10">

                                                <el-form-item label="省份/城市">
                                                    <el-cascader :options="options" v-model="form.province"></el-cascader>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="8">
                                                <el-form-item label="年龄">
                                                    <el-input v-model="form.age">13030860591</el-input>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="10">

                                                <el-form-item label="详细住址">
                                                    <el-input type="textarea" rows="1" v-model="form.address"></el-input>
                                                </el-form-item>
                                            </el-col>

                                        </el-row>

                                        <el-form-item label="兴趣标签">
                                            <el-checkbox-group v-model="form.userTag">
                                                <el-checkbox label="java">Java开发</el-checkbox>
                                                <el-checkbox label="web">前端开发</el-checkbox>
                                                <el-checkbox label="go">Go开发</el-checkbox>
                                                <el-checkbox label="bigdata">大数据</el-checkbox>
                                            </el-checkbox-group>
                                        </el-form-item>

                                        <div class="finish-btn">
                                            <el-button type="primary" @click="onSubmit('form')">完成</el-button>
                                            <el-button>取消</el-button>
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

export default {
  name: "index",
  components: {
    Header
  },
  data() {
    return {
      options: cityData,
      form: {
        // ---------------
        userName: "",
        userUuid: "",
        userPhone: "",
        birthday: "",
        sex: "",
        age: "",
        roleId: "3",
        province: ["津30000", "津30100"],
        address: "",
        status: "",
        userTag: [],
        createTime: "",
        userUuid: ""
      }
    };
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
.main-content >>> .person-info {
}

.main-content >>> .person-info .person-info-edit {
  position: relative;
}
.main-content >>> .finish-btn {
  position: absolute;
  top:30px;
  right: 40px;
}
</style>


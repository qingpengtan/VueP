<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>{{isEdit ? '编辑用户' :'新增用户'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">

                <el-row :gutter="20">
                    <el-col :span="8" v-show="isEdit">
                        <el-form-item label="用户名">
                            <div style="font-size:14px;color:#999;height:20px;line-height:20px">{{form.userName}}({{form.userUuid}})</div>
                            <div style="font-size:12px;color:#999;height:12px;line-height:12px"> {{form.createTime}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-show="!isEdit">
                        <el-form-item prop="userName" label="用户名" :error="errorMsg">
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
                        <el-form-item label="电话" prop="userPhone" :error="errorMsg">
                            <el-input v-model="form.userPhone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="角色" prop="roleId" :error="errorMsg">
                            <el-select v-model="form.roleId" placeholder="请选择">
                                <el-option key="1" label="普通" value="1"></el-option>
                                <el-option key="2" label="会员" value="2"></el-option>
                                <el-option key="3" label="管理员" value="3"></el-option>
                            </el-select>
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

                    <el-col :span="8">

                        <el-form-item label="状态">
                            <el-switch v-model="form.status"></el-switch>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row :gutter="20">
                    <el-col :span="10">

                        <el-form-item label="详细住址">
                            <el-input type="textarea" rows="1" v-model="form.address"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-form-item label="用户标签">
                    <el-checkbox-group v-model="form.userTag">
                        <el-checkbox v-for=" tag in articleTag" :key=tag.articleTagId :label=tag.articleTagId>{{tag.articleTag}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="头像上传">
                    <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn">选择图片
                            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
                        </div>
                        </div>
                </el-form-item>

                <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                    <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelCrop">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import cityData from "../city2.json";
import StringUtils from "../../../utils/StringUtils.js";
import tabUtils from "../../../utils/tabUtils.js";
export default {
  name: "baseform",
  data: function() {
    return {
      defaultSrc: "./static/img/img.jpg",
      imgSrc: "",
      cropImg: "",
      dialogVisible: false,
      options: cityData,
      isEdit: false,
      articleTag: "",
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
      },
      errorMsg: "",
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "请选择角色类型", trigger: "blur" }]
      }
    };
  },

  components: {
    VueCropper
  },
  created() {
    this.$http.http("/index/classify", { exculde: "yes" }).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
        let result = this.$route.query;

        if (StringUtils.isEmpty(result)) {
          this.isEdit = false;
        } else {
          let tempTag = result.userTag;
          this.isEdit = true;
          this.form.userName = result.userName;
          this.form.userUuid = result.userUuid;
          this.form.userPhone = result.userPhone;
          this.form.birthday = result.birthday;
          this.form.sex = result.sex;
          this.form.age = result.age;
          this.form.roleId = result.roleId + "";
          this.form.province = [result.provinceV, result.cityV, ""];
          this.form.address = result.address;
          this.form.status = result.status == 1000 ? true : false;
          this.form.userTag = StringUtils.isEmpty(tempTag)
            ? []
            : StringUtils.str2Int(tempTag.split(","));
          this.form.createTime = result.createTime;
          this.form.userUuid = result.userUuid;
        }
      }
    });
    this.cropImg = this.defaultSrc;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tempTag = this.form.userTag;
          let params = {
            userName: this.form.userName,
            userPhone: this.form.userPhone,
            birthday: this.form.birthday,
            sex: this.form.sex,
            age: this.form.age,
            roleId: this.form.roleId,
            province: this.form.province[0],
            city: this.form.province[1],
            address: this.form.address,
            status: this.form.status ? 1000 : 2000,
            userTag: StringUtils.isEmpty(tempTag) ? "" : tempTag.join(","),
            userUuid: this.form.userUuid
          };

          this.$http.http("/sys/user/save", params).then(res => {
            if (res.code == 1) {
              tabUtils.closeCurrentTab(
                this.$tabsList,
                window.location.hash,
                this
              );
              this.$message.success("提交成功！");
            } else {
              this.errorMsg = res.msg;
            }
          });
        } else {
          this.$message.error("提交失败！");
        }
      });
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        this.dialogVisible = true;
        this.imgSrc = event.target.result;
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cancelCrop() {
      this.dialogVisible = false;
      this.cropImg = this.defaultSrc;
    }
  }
};
</script>

<style scoped>
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>


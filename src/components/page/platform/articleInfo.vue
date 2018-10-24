<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="form" :model="form" label-width="80px">

        <el-input v-show="false" v-model="form.articleId"></el-input>

        <el-form-item label="标题">
          <el-input v-model="form.articleTitle"></el-input>
        </el-form-item>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="类型">
              <el-select placeholder="请选择" v-model="form.articleTag">
                <el-option v-for=" tag in articleTag" :key=tag.articleTagId :label=tag.articleTag :value=tag.articleTagId></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="状态">
              <el-switch v-model="form.status"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="内容">
          <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button class="editor-btn" type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillRedefine } from "vue-quill-editor-upload";
import { quillEditor } from "vue-quill-editor";
import StringUtils from "../../../utils/StringUtils.js";
import tabUtils from "../../../utils/tabUtils.js";
export default {
  name: "editor",
  data: function() {
    return {
      editorOption: {
        placeholder: "Hello World"
      },
      articleTag: "",
      form: {
        articleTitle: "",
        articleTag: "",
        status: "",
        articleBrief: "",
        content: "",
        articleId: 1
      }
    };
  },
  beforeCreate() {
    // bus.$on("tags", msg => {
    //   this.$nextTick(() => {
    //     this.tabsList = msg;
    //   });
    // });
  },
  created() {
    this.setEdirorParam();
    this.$http.http("/index/classify").then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
        let result = this.$route.query;
        if (!StringUtils.isEmpty(result)) {
          this.editArticle(result.articleId);
        }
      }
    });
  },
  components: {
    quillEditor,
    quillRedefine
  },
  methods: {
    onEditorChange(quill) {
      this.articleBrief = quill.quill.container.textContent;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (true) {
          let params = {
            articleTitle: this.form.articleTitle,
            content: this.form.content,
            articleTagId: this.form.articleTag,
            articleId: this.form.articleId,
            articleBrief: this.form.articleBrief.substring(0, 350),
            status: this.form.status ? 1000 : 2000
          };
          this.$http.http("/sys/article/save", params).then(res => {
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
          this.$message.success("提交失败！");
        }
      });
    },
    editArticle(id) {
      this.$http.http("/sys/article/detail", { articleId: id }).then(res => {
        if (res.code == 1) {
          this.form.articleTitle = res.data.articleTitle;
          this.form.content = res.data.content;
          this.form.articleTag = StringUtils.isEmpty(res.data.articleTag)
            ? 1
            : parseInt(res.data.articleTag);
          this.form.status = res.data.status == 1000 ? true : false;
          this.form.articleId = res.data.articleId;
          this.form.articleBrief = res.data.articleBrief;
        }
      });
    },
    setEdirorParam() {
      this.editorOption = quillRedefine({
        placeholder: "内容",
        // 图片上传的设置
        uploadConfig: {
          action: "/upload/image", // 必填参数 图片上传地址
          // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
          // 你必须把返回的数据中所包含的图片地址 return 回去
          res: respnse => {
            if (respnse.code == 1) {
              return respnse.data;
            } else {
              this.$message.error("图片上传失败啦，图片大小仅支持1M以内");
            }
          },
          methods: "POST", // 可选参数 图片上传方式  默认为post
          // token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
          name: "img", // 可选参数 文件的参数名 默认为img
          // size: 1024,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
          accept: "image/png, image/gif, image/jpeg, image/bmp, image/x-icon", // 可选参数 可上传的图片格式
          // start: function (){}
          start: () => {}, // 可选参数 接收一个函数 开始上传数据时会触发
          end: () => {}, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
          success: () => {}, // 可选参数 接收一个函数 上传数据成功时会触发
          error: () => {} // 可选参数 接收一个函数 上传数据中断时会触发
        }
      });
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>
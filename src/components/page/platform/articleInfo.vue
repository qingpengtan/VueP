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
          <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
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
    this.$http.http("/index/classify").then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
        let result = this.$route.query;
        this.form.articleTitle = result.articleTitle;
        this.form.content = result.content;
        this.form.articleTag = StringUtils.isEmpty(result.articleTag) ? 1 : parseInt(result.articleTag);
        this.form.status = result.status == 1000 ? true : false;
        this.form.articleId = result.articleId;
      }
    });
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (true) {
          let params = {
            articleTitle: this.form.articleTitle,
            content: this.form.content,
            articleTagId: this.form.articleTag,
            articleId: this.form.articleId,
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
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>
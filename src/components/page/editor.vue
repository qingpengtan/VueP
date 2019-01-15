<template>

  <div>
    <div class="layout-header">
      <div class="header-main">

        <div class="header-navbar">
          <router-link to='/'>
            <img
              class="header-left"
              src="../../assets/let.png" title="主页"
            />
          </router-link>
          <div class="header-right">
            <span class="right-span">
              <el-button
                type="primary"
                @click="publish()"
              >发表</el-button>
            </span>
          </div>
        </div>
      </div>

    </div>
    <div class="layout-main">

      <div class="layout-content">
        <div
          class="main-content"
          style="padding: 8px 32px 32px;"
        >
          <div>
            <input
              type="text"
              class="editor-title"
              placeholder="标题"
              v-model="articleTitle"
            >
            <input
              type="text"
              v-show="false"
              v-model="articleId"
            >
            <el-select
              placeholder="请选择"
              v-model="articleTagId"
              class="select"
            >
              <el-option
                v-for=" tag in articleTag"
                :key=tag.articleTagId
                :label=tag.articleTag
                :value=tag.articleTagId
              ></el-option>
            </el-select>
            <quill-editor
              ref="myTextEditor"
              v-model="content"
              :options="editorOption"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>

        </div>
      </div>
    </div>
    <Footer></Footer>
    <BackTop></BackTop>
  </div>

</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Footer from "../common/Footer.vue";
import "quill/dist/quill.bubble.css";
import { quillRedefine } from "vue-quill-editor-upload";
import { quillEditor } from "vue-quill-editor";
import StringUtils from "../../utils/StringUtils.js";
import BackTop from "../common/BackTop.vue";
export default {
  name: "editor",
  data: function() {
    return {
      editorOption: {
        placeholder: "Hello World"
      },
      content: "",
      articleTitle: "",
      articleTagId: 1,
      articleTag: "",
      articleId: "",
      articleBrief: ""
    };
  },
  components: {
    quillEditor,
    quillRedefine,
    Footer,
    BackTop
  },
  created() {
    this.setEdirorParam();
    this.$http.http("/index/classify", {}).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
        if (!StringUtils.isEmpty(this.$route.query)) {
          this.getArticle();
        }
      }
    });
  },
  methods: {
    onEditorChange(quill) {
      this.articleBrief = quill.quill.container.textContent;
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
              this.$message.error(respnse.msg);
            }
          },
          methods: "POST", // 可选参数 图片上传方式  默认为post
          // token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
          name: "img", // 可选参数 文件的参数名 默认为img
          // size: 1024,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
          accept: "image/png, image/gif, image/jpeg", // 可选参数 可上传的图片格式
          // start: function (){}
          start: () => {}, // 可选参数 接收一个函数 开始上传数据时会触发
          end: () => {}, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
          success: () => {}, // 可选参数 接收一个函数 上传数据成功时会触发
          error: () => {} // 可选参数 接收一个函数 上传数据中断时会触发
        }
      });
    },
    getArticle() {
      this.$http
        .http("/index/detail", { articleId: this.$route.query.articleId })
        .then(res => {
          this.content = res.data.content;
          this.articleTagId = res.data.articleTag;
          this.articleTitle = res.data.articleTitle;
          this.articleId = res.data.articleId;
          this.articleBrief = res.data.articleBrief;
        });
    },
    publish() {
      if (this.content.trim() == "") {
        return;
      }
      if (this.articleTitle.trim() == "") {
        return;
      }
      this.$http
        .http("/index/save", {
          content: this.content,
          articleTitle: this.articleTitle,
          articleTagId: this.articleTagId,
          articleId: this.articleId,
          articleBrief: this.articleBrief.substring(0, 350)
        })
        .then(res => {
          if (res.code == 1) {
            this.$router.go(-1);
            this.$message.success("发表成功");
            let num = this.$store.getters.updateArticleNum;
            num++;
            this.$store.commit("updateArticleNum", num);
          } else {
            this.$message.error(res.msg);
          }
        });
    }
  }
};
</script>


<style scoped>
.layout-main {
  width: 1180px;
  margin: 0 auto;
}

.layout-header {
  width: 100%;
  height: auto;
  background: white;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-main {
  width: 1180px;
  margin: 0 auto;
}

.header-navbar {
  height: 57px;
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
  width: 1180px;
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
  transition: all 0.3s, padding 0s;
  height: 50px;
  position: relative;
  top: 7px;
  display: inline-block;
}
.header-navbar a {
  border-bottom: none;
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
  line-height: 57px;
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

.layout-content {
  height: auto;
  width: auto;
  min-height: calc(100vh - 194px);
  box-sizing: border-box;
  background: white;
  margin-top: 20px;
}
.editor-title {
  width: 77%;
  height: 40px;
  margin: 20px;
  border: none;
  font-size: 24px;
  outline: none;
  display: inline-block;
}

.layout-main>>>.ql-snow .ql-editor pre.ql-syntax {
  background-color: #7697b9!important;
  font-size: 15px!important;
  font-family: Consolas!important;
}

@media only screen and (max-width: 481px) {
  .layout-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .main-content {
    height: calc(100vh - 0.85rem);
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 10px !important;
  }

  .main-content >>> .select input {
    margin: 10px 0;
  }
  .layout-header {
    width: 100%;
    height: auto;
    background: white;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  .header-main {
    width: 100%;
  }

  .header-right {
    margin-right: 0;
  }
  .header-navbar {
    height: 0.85rem;
  }

  .header-navbar >>> button {
    position: relative;
    top: -0.051724rem;
    padding: 0.103448rem 0.155172rem;
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
    width: 1180px;
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
    height: 0.689655rem;
    display: inline-block;
  }

  .header-right {
    float: right;
    height: 100%;
    margin-right: 20px;
  }

  .header-right .right-span {
    padding: 0 0;
    cursor: pointer;
    display: inline-block;
    height: 100%;
    transition: all 0.3s;
    line-height: 50px;
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

  .layout-content {
    height: auto;
    width: auto;
    background: white;
    margin-top: 0px;
  }
  .editor-title {
    width: 100%;
    height: 40px;
    margin: 0px;
    border: none;
    font-size: 24px;
    outline: none;
    display: inline-block;
  }
  .main-content >>> .el-select {
    width: 100%;
  }
}
</style>


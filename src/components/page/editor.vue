<template>

  <div>
    <div class="layout-header">
      <div class="header-main">

        <div class="header-navbar">
          <router-link to='/'>
            <img class="header-left" src="../../assets/logo.gif" />
                    </router-link>
            <div class="header-right">
              <span class="right-span">
                <el-button type="primary" @click="publish()">发表</el-button>
              </span>
            </div>
        </div>
      </div>

    </div>
    <div class="layout-main">

      <div class="layout-content">
        <div class="main-content" style="padding: 8px 32px 32px;">
          <div style="margin-top:20px">
            <input type="text" class="editor-title" placeholder="请输入标题" v-model="articleTitle">
            <el-select placeholder="请选择" v-model="articleTagId" class="select">
              <el-option  v-for=" tag in articleTag"  :key=tag.articleTagId :label=tag.articleTag :value=tag.articleTagId></el-option>
            </el-select>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
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
      articleTag: ""

    };
  },
  components: {
    quillEditor
  },
  created(){
    this.$http.http("/index/classify", {}).then(res => {
      if (res.code == 1) {
        this.articleTag = res.data;
      }
    });
  },
  methods: {
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
          articleTitle: this.articleTitle
        })
        .then(res => {
          if (res.code == 1) {
            this.$router.push({ path: "/" });
            this.$message.success("提交成功！");
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
  width: 1260px;
  height: 100%;
  margin: 0 auto;
}

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

.layout-content {
  height: auto;
  width: auto;
  background: white;
  margin-top: 20px;
}
.editor-title {
  width: 79%;
  height: 40px;
  margin: 20px;
  border: none;
  font-size: 24px;
  outline: none;
  display: inline-block;
}

@media only screen and (max-width: 481px) {
  .layout-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .main-content {
    padding: 10px !important;
  }

  .main-content >>> .select input {
    margin: 10px 0;
  }
  .layout-header {
    width: 100%;
    height: auto;
    background: #f4f5f5;
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
    height: 1rem;
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
    margin-top: 20px;
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
}
</style>


<template>

  <div>
    <Header></Header>
    <div class="layout-main">

      <div class="layout-content" ref="wrapper">
        <div class="main-content" style="padding: 8px 32px 32px;">

          <div class="ant-list-item">
            <div class="ant-list-item-meta-content">
              <h2>{{article.articleTitle}}</h2>
            </div>
            <div class="publish">
              <span>作者：{{article.userName}}</span>
              <span>类型：{{article.articleTagName}}</span>
              <span> {{article.createTime}}</span>
                <router-link :to="{path:'/edit-text', query:{articleId:article.articleId}}" v-show="isEdit">
                  <i class="el-icon-edit" style="color:#43bcff;font-size:14px" ></i>
                </router-link>

            </div>
            <div class="ant-list-item-content">
              <div>
                <div class="ql-snow">
                  <div class="ql-editor">
                    <div class="text-content" v-html=article.content>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="ant-list-item-action" style="height:18px">
              <li>
                <span>
                  <i class="anticon anticon-star-o" style="margin-right: 8px;">
                    <svg viewBox="64 64 896 896" class="" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                    </svg>
                  </i>183</span>
                <em class="ant-list-item-action-split"></em>
              </li>
              <li>
                <span>
                  <i class="anticon anticon-like-o" style="margin-right: 8px;">
                    <svg viewBox="64 64 896 896" class="" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path>
                    </svg>
                  </i>130</span>
                <em class="ant-list-item-action-split"></em>
              </li>

            </ul>
            <div class="comment">
              <textarea name="" id="" rows="6"></textarea>
              <div class="comment-btn">
                <el-button type="primary">发表评论</el-button>
              </div>

            </div>

            <div class="mobile-commnet" @click="dialogVisible = true">
              <i class="el-icon-edit"></i>发表你的评论
            </div>

            <el-dialog :visible.sync="dialogVisible">
              <el-input type="textarea" v-model="comment" :rows="5" placeholder="发表你的评论">
              </el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="publish()">发表</el-button>
              </span>
            </el-dialog>

            <div class="leave-word">

              <div class="total-comments" style="color:#409eff">
                最新评论（363）
              </div>

              <div class="leave-word-item">
                <div class="leave-img">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                  <span>
                    我是星空
                  </span>
                  <span>
                    2018-09-18 11:19
                  </span>
                </div>
                <div class="leave-comment">

                  <div>
                    段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发
                  </div>
                </div>

              </div>
              <div class="leave-word-item">
                <div class="leave-img">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                  <span>
                    我是星空
                  </span>
                  <span>
                    2018-09-18 11:19
                  </span>

                </div>
                <div class="leave-comment">

                  <div>
                    段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发 段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="aside-content">
            <FAside></FAside>
          </div>

        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Header from "../common/Fheader.vue";
import Scroll from "./foreground/bScroll";
import FAside from "../common/FAside";
import Footer from "../common/Footer.vue";

export default {
  name: "details",
  components: {
    Header,
    FAside,
    Footer,
    "v-scroll": Scroll
  },
  data() {
    return {
      article: "",
      dialogVisible: false,
      comment: "",
      isEdit: false
    };
  },
  created() {
    window.scrollTo(0, 0);
    // this.$nextTick(() => {
    //   this.scroll = new Bscroll(this.$refs.wrapper, {});
    // });
    this.$http
      .http("/index/detail", { articleId: this.$route.query.articleId })
      .then(res => {
        this.article = res.data;
        document.title = this.article.articleTitle;
        this.$http
          .http("/index/isEdit", { userPhone: res.data.userPhone })
          .then(resu => {
            this.isEdit = resu.data;
          });
      });
  },
  methods: {
    publish() {
      this.dialogVisible = false;

      if (this.comment.trim() == "") {
        return;
      }
      // this.$http.http("/index/save", { content: this.content }).then(res => {
      //   if (res.code == 1) {
      //     this.dialogVisible = false;
      //     this.$message.success("提交成功！");
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
    }
  }
};
</script>


<style scoped>
.layout-main {
  width: 1260px;
  height: 100%;
  margin: 0 auto;
  background: white;
}

.layout-content {
  height: auto;
  width: auto;
  background: white;
  margin-top: 20px;
}

.main-content:after {
  content: ".";
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}

.ant-list-item {
  padding: 20px 0;
  width: 720px;
  display: inline-block;
}

.aside-content {
  width: 360px;
  margin: 20px;
  float: right;
}

.ant-list-item-meta-content {
  /* color: #43bcff; */
}

.ant-list-item-meta-content,
.ant-list-item-content {
  margin-bottom: 16px;
}

.ant-list-item-content .text-content {
  line-height: 22px;
}

.publish {
  font-size: 12px;
  margin: 16px 0;
  color: #bbbbbb;
  line-height: 1.5;
  display: flex;
}
.publish span{
  flex: 1;
  overflow: hidden;
}

.ant-list-item-action li {
  float: left;
  padding-right: 16px;
  cursor: pointer;
}
.comment {
  width: 100%;
  margin-top: 20px;
  height: auto;
  display: block;
}
.comment textarea {
  width: 700px;
}
.comment .comment-btn {
  float: right;
  margin-right: 16px;
  margin-top: 10px;
}
.leave-word {
  clear: both;
}
.leave-word-item .leave-img,
.leave-word-item .leave-comment {
  display: inline-block;
}
.leave-word-item {
  padding: 16px 0px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 13px;
}
.leave-word-item:first-child {
  padding-top: 0px;
}
.leave-img img {
  width: 24px;
  position: relative;
  top: 2px;
}
.leave-img span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-left: 5px;
  position: relative;
  top: -5px;
  font-weight: bold;
}
.leave-comment {
  padding-left: 0px;
}
.mobile-commnet {
  display: none;
}
.layout-main >>> .ql-editor {
  padding: 0 !important;
}
@media only screen and (max-width: 481px) {
  .layout-main {
    height: calc(100vh - 0.85rem);
    overflow: scroll;
  }
  .layout-main,
  .main-content,
  .ant-list-item {
    width: 100%;
  }
  .ant-list-item {
    padding: 0;
  }
  .main-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0.206897rem !important;
    font-size: 14px;
  }
  .main-content {
    padding-bottom: 0 !important;
  }
  .layout-content {
    margin-top: 0;
  }

  .ant-list-item-meta-content,
  .ant-list-item-content {
    margin-bottom: 8px;
  }

  .ant-list-item-content .text-content {
    line-height: 22px;
  }

  .publish {
    margin: 10px 0;
  }

  .comment {
    display: none;
  }
  .mobile-commnet {
    display: block;
    width: 100%;
    background: #dddddd;
    padding: 5px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .leave-word {
    margin-top: 10px;
    box-shadow: none;
    padding: 0px;
    background: white;
    font-size: 13px;
  }
  .leave-word-item {
    padding: 10px 0;
  }

  .ant-list-item >>> .el-dialog {
    width: 100% !important;
    position: absolute;
    bottom: 0;
    margin: 0;
  }
  .ant-list-item >>> .el-dialog__body,
  .ant-list-item >>> .el-dialog__header,
  .ant-list-item >>> .el-dialog__footer {
    padding: 10px !important;
  }

  .ant-list-item >>> .el-dialog__close {
    display: none;
  }
  .aside-content {
    display: none;
  }
}
</style>


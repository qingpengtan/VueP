<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 文章列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>-->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="addUser">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="articleTitle" label="标题"></el-table-column>
        <el-table-column label="用户">
          <template slot-scope="scope">
            <p>{{scope.row.userPhone}}/{{ scope.row.userName | emptyValue }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="articleTagName" label="文章类型"></el-table-column>
        <el-table-column label="置顶">
          <template slot-scope="scope">
            <p v-if="scope.row.isStick == '1000'">否</p>
            <p v-else>是</p>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <p>{{ scope.row.status | statusFilter }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发表时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="totalSize"
        ></el-pagination>
      </div>
    </div>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tabUtils from "../../../utils/tabUtils.js";
import bus from "../../common/bus";

export default {
  name: "basetable",
  data() {
    return {
      tableData: [],
      idx: -1,
      delVisible: false,
      deleteId: "",
      select_word: "",
      totalSize: 1,
      current: 1
    };
  },
  created() {
    this.articleLists();
  },
  methods: {
    articleLists(params) {
      this.$http.http("/sys/article/list", params).then(res => {
        this.current = res.data.current;
        this.totalSize = res.data.totalSize;
        this.tableData = res.data.articleList;
      });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.articleLists({ page: val, articleTitle: this.select_word });
    },

    addUser() {
      this.$router.push({ path: "/sys/article-edit" });
      // tabUtils.setTags(this.$tabsList,this);
    },
    search() {
      this.is_search = true;
      this.articleLists({articleTitle:this.select_word})
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/sys/article-edit",
        query: { articleId: row.articleId }
      });
      // tabUtils.setTags(this.$tabsList,this);
    },
    handleDelete(index, row) {
      this.idx = index;
      this.deleteId = row.articleId;
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定删除
    deleteRow() {
      this.$http
        .http("/sys/article/delete", { id: this.deleteId })
        .then(res => {
          if (res.code == 1) {
            this.tableData.splice(this.idx, 1);
            this.$message.success("删除成功");
            this.delVisible = false;
          }
        });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>

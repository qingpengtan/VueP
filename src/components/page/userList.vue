<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select> -->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="addUser">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="编号/用户名">
          <template scope="scope">
            <p>{{ scope.row.userUuid}}/{{scope.row.userName | emptyValue}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="userPhone" label="电话">
        </el-table-column>
        <el-table-column prop="roleId" label="角色">
        </el-table-column>
        <el-table-column label="性别/年龄/出生日期">
          <template scope="scope">
            <p>{{ scope.row.sex | emptyValue}}/{{ scope.row.age | emptyValue}}/{{scope.row.birthday | emptyValue}}</p>
          </template>
        </el-table-column>
        <el-table-column label="省份/城市">
          <template scope="scope">
            <p>{{ scope.row.province | emptyValue }}/{{scope.row.city | emptyValue}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细住址">
        </el-table-column>
        <el-table-column prop="userTag" label="用户标签">
        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <p>{{ scope.row.status | statusFilter }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
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
export default {
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      cur_page: 1,
      select_word: "",
      is_search: false,
      delVisible: false,
      idx: -1,
      deleteId: "",
    };
  },
  created() {
    // this.getData();
    this.$http.http("/sys/user/list", {}).then(res => {
      console.log(res);
      this.tableData = res.data;
    });
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },

    addUser() {
      this.$router.push({ path: "/sys/form" });
    },
    search() {
      this.is_search = true;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/sys/form", query: row });
    },
    handleDelete(index, row) {
      this.idx = index;
      this.deleteId = row.userUuid;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      this.$http
        .http("/sys/user/delete", { id: this.deleteId })
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

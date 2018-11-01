<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 音乐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="uploadMusic">上传音乐</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="图片">
        </el-table-column>
        <el-table-column prop="musicName" label="歌名">
        </el-table-column>
        <el-table-column prop="musicAuthor" label="作者">
        </el-table-column>
        <el-table-column prop="userPhone" label="上传者">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handlePlayer(scope.$index, scope.row)">播放</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="current" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalSize">
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

    <audio controls :src="music.musicUrl" id="myaudio"></audio>
    <div>
      {{music.musicName}}
    </div>
  </div>
</template>

<script>
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
      current: 1,
      music: ""
    };
  },
  created() {
    this.$http.http("/sys/music/list", {}).then(res => {
      this.current = res.data.current;
      this.totalSize = res.data.totalSize;
      this.tableData = res.data.musicList;
    });
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.$http.http("/sys/music/list", { page: val }).then(res => {
        this.current = res.data.current;
        this.totalSize = res.data.totalSize;
        this.tableData = res.data.musicList;
      });
    },

    uploadMusic() {},
    handlePlayer(index, music) {
      var myAuto = document.getElementById("myaudio");
      console.log(myAuto);
      this.music = music;
      myAuto.play();
    },
    search() {
      this.is_search = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.deleteId = row.musicId;
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定删除
    deleteRow() {
      this.$http.http("/sys/music/delete", { id: this.deleteId }).then(res => {
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

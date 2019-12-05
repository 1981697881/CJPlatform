<template>
  <div>
    <list
      :columns="columns"
      :loading="loading"
      :list="list"
      @handlerSize="handleCurrentChange"
      @handlerCurrent="handleCurrentChange"
      @dblclick="dblclick"
       class="list-main"
       selfAdaption
    />

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      @dragDialog="handleDrag"
      :width="'70%'"
      @close="closedDialog"
      destroy-on-close
    >
      <div slot="footer">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="handlerForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { selectStaffList } from "@/api/zy/merchants/organization";
import List from "@/components/List";

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      columns: [
        { text: "fid", name: "fid" },
        { text: "角色名称", name: "name" },
        { text: "类型", name: "code" },
        { text: "创建时间", name: "contact" },
        { text: "备注", name: "phone" },
        { text: "状态", name: "qq" },
      ]
    };
  },
  methods: {
    handlerForm() {},
    //监听每页显示几条
    handleSizeChange(val) {
      this.fetchData();
    },
    //监听当前页
    handleCurrentChange(val) {
      this.list.pageNum = val;
      this.fetchData();
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    closedDialog() {},
    dblclick(obj) {
      this.visible = true;
      this.fid = obj.row.fid;
      this.type = obj.row.type
    },
    fetchData(fid, type) {
      this.loading = true;

      const data = {
        fid: fid,
        type: type,
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 5
      };
      selectStaffList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>

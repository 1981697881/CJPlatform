<template>
  <list
    class="list-main box-shadow"
    :list="list"
    :columns="columns"
    index
    :loading="loading"
    @dblclick="dblclick"
    @row-click="rowClick"
    @handle-size="handleSize"
    @handle-current="handleCurrent"
    type
  >
    <el-table-column fixed="right" label="操作" slot="after" align="center" width="120">
      <template slot-scope="scope">
        <el-button @click="handleUpdataRow(scope.row)" type="text" size="small">编辑查看</el-button>
        <el-button @click="handleDelRow(scope.row)" type="text" size="small">
          <span style="color:#ff4e4e">删除</span>
        </el-button>
      </template>
    </el-table-column>
  </list>
</template>

<script>
import { mapGetters } from "vuex";
import List from "@/components/List";
import { getSpaceList ,deleteSpaceByIds} from "@/api/wy/resource/carlist";

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      list: {},
      columns: [
        { text: "车库名称", name: "garageName" },
        { text: "车位编号", name: "spaceCode" },
        { text: "车位名称", name: "spaceName" },
        { text: "车位状态", name: "status" },
        { text: "车位类型", name: "type" },
        { text: "租户名称", name: "tenantName" },
        { text: "租赁开始日期", name: "rentStartTime" },
        { text: "租赁终止日期", name: "rentEndTime" }
      ],
      loading: false
    };
  },
  watch: {
    node(val) {
      this.fetchData(val.data);
    }
  },
  methods: {
    handleUpdataRow(row) {
      this.$store.dispatch("list/setClickData", row);
      this.$emit("open-dialog","carVisible");
    },
    handleDelRow(row) {
      
      const data = {
        ids:[row.fid]
      }
      deleteSpaceByIds(data).then(res=>{
        if(res.status == 0 )  this.fetchData(this.node.data)
      })
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    //监听双击某一行
    dblclick(obj) {
      this.$store.dispatch("list/setData", obj.row);
      this.$emit("open-dialog","carVisible");
    },
    //监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val;
      this.fetchData(this.node.data);
    },
    //监听当前页
    handleCurrent(val) {
      this.list.pageNum = val;
      this.fetchData(this.node.data);
    },
    //获取列表
    fetchData(data) {
      this.loading = true;
      console.log(data);
      const ndata = {
        userId: this.$store.getters.token,
        treeType: data.type ? data.type : 1,
        garageId: data.type == 3 ? data.fid : "",
        buildId: data.type == 2 ? data.fid : "",
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 30
      };
      getSpaceList(ndata)
        .then(res => {
          this.$store.dispatch("list/setClickData", {});
          this.list = res.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    //刷新列表
    refresh() {
      let node = this.node;
      //清空node在赋值node  触发列表重新获取并刷新列表
      this.$store.dispatch("tree/setNode", "");
      this.$store.dispatch("tree/setNode", node);
    }
  }
};
</script>

<style scoped>
.list-main {
  height: calc(100vh - 255px);
}
</style>
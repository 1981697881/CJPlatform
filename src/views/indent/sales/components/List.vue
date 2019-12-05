<template>
  <div>
    <!-- <el-table :data="list.list" border size="mini" :highlight-current-row="true" @row-dblclick="dblclick">
      <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        :label="t.text"
        :width="t.width?t.width:''"
      ></el-table-column>
    </el-table>

    <div class="text-center" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>-->
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { customerList } from "@/api/wy/customer/commoditylist";
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
      list: {},
      columns: [
        { text: "fid", name: "fid" },
        { text: "订单单号", name: "name" },
        { text: "客户名称", name: "code" },
        { text: "数量", name: "contact" },
        { text: "金额", name: "phone" },
        { text: "下单时间", name: "qq" },
          { text: "审核状态", name: "qq" },
          { text: "发货状态", name: "qq" },
      ]
    };
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val
      this.fetchData(this.node.data.fid,this.node.data.type);
    },
    //监听当前页
    handleCurrent(val) {
      this.list.pageNum = val;
      this.fetchData(this.node.data.fid,this.node.data.type);
    },
    dblclick(obj) {
      const data = {
        fid : obj.row.fid,
        type : obj.row.type
      }
      this.$emit('showDialog',data)
    },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    fetchData(fid, type) {
      this.loading = true;

      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 5
      };
        customerList(data).then(res => {
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

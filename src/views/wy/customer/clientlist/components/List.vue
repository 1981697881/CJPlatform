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
       class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
    />
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rxCustomerList } from "@/api/wy/customer/clientlist";
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
      type: null,
      columns: [
        { text: "所属项目", name: "fid" },
        { text: "客户名称", name: "name" },
        { text: "客户编号", name: "code" },
        { text: "联系人", name: "contact" },
        { text: "联系号码", name: "phone" },
        { text: "QQ号码", name: "qq" },
        { text: "Email", name: "email" },
        { text: "座机", name: "faxNo" },
        { text: "证件类型", name: "idType" },
        { text: "证件号码", name: "idCard" },
        { text: "联系地址", name: "address" },
        { text: "接待人", name: "receiver" },
        { text: "接待时间", name: "receiverTime" }
      ]
    };
  },
  /* watch: {
    node(val) {
      console.log(val)
      this.fid = val.data.fid;
      this.type =  val.data.type
      console.log(this.fid)
      console.log(this.type)
      this.fetchData();
    }
  }, */
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
    fetchData(fid, type) {
      this.loading = true;

      const data = {
        fid: fid,
        type: type,
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 5
      };
      rxCustomerList(data).then(res => {
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
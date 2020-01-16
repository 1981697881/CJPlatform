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
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { returnsList ,receiving} from "@/api/indent/returns";
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
          { text: "reOdId", name: "reOdId" ,default:false},
          { text: "orderId", name: "orderId" ,default:false},
          { text: "退货单号", name: "returnOrderNum" },
          { text: "客户名称", name: "username" },
          { text: "申请时间", name: "createTime" },
          { text: "退货原因", name: "reason" },
          { text: "状态", name: "isAudit" },
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
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    dblclick(obj) {
      this.$emit('showDialog',obj.row)
    },
      //收货确认
      Receiving(val){
          receiving(val).then(res => {
              this.$emit('uploadList')
          });
      },
    fetchData(fid, type) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 5
      };
        returnsList(data).then(res => {
        this.loading = false;
            if(res.flag&&res.data!=null){
                this.list = res.data;
            }
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

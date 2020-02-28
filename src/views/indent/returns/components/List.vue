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
import { returnsListT ,receiving} from "@/api/indent/returns";
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
        { text: "日期", name: "createTime" },
        { text: "原订单单号", name: "sourceOrderNum" },
          { text: "退货单号", name: "orderNum" },
        {text: "购货单位", name: "customer"},
        { text: "物料代码", name: "goodCode" },
        { text: "物料名称", name: "goodName" },
        { text: "规格型号", name: "standard" },
        { text: "单位", name: "unitOfMea" },
        { text: "订单数量", name: "sourceNum" },
        { text: "退货数量", name: "num" },
        { text: "单价", name: "sellPrice" },
        { text: "金额", name: "totalPrice" },
         // { text: "客户名称", name: "username" },
        { text: "发货仓库", name: "plaName" },
        { text: "退货原因", name: "reason" },
        { text: "商品图片", name: "img" },
        { text: "审核状态", name: "isAudit" },
          { text: "状态", name: "status" },
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
    // 监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.pageNum = val
      this.fetchData()
    },
      // 监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    dblclick(obj) {
      if (obj.row.isAudit == '已审核') {
        return this.$message({
          message: "该单已审核",
          type: "warning"
        })
      } else {
        this.$emit('showDialog',obj.row)
      }
    },
      // 收货确认
      Receiving(val) {
          receiving(val).then(res => {
              this.$emit('uploadList')
          });
      },
    fetchData(val) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 50
      };
      returnsListT(data, val).then(res => {
        this.loading = false;
            if(res.flag && res.data != null){
              let record = res.data.records
              let obj = []
              for(const i in record) {
                for(const a in record[i].returnOrderDetailVOS) {
                  record[i].returnOrderDetailVOS[a].image = record[i].img
                  record[i].returnOrderDetailVOS[a].reId = record[i].reOdId
                  record[i].returnOrderDetailVOS[a].reason = record[i].reason
                  record[i].returnOrderDetailVOS[a].isAudit = record[i].isAudit
                  record[i].returnOrderDetailVOS[a].status = record[i].status
                  record[i].returnOrderDetailVOS[a].plaName = record[i].plaName
                  record[i].returnOrderDetailVOS[a].customer = record[i].customer
                  record[i].returnOrderDetailVOS[a].addTime = record[i].createTime
                  record[i].returnOrderDetailVOS[a].sourceOrderNum = record[i].sourceOrderNum
                  obj.push(record[i].returnOrderDetailVOS[a])
                }
              }
              this.list= {
                current: res.data.current,
                pages: res.data.pages,
                size: res.data.size,
                total: res.data.total,
                records: obj
              }
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

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
       timeColor
       show-summary
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
import {
  getPer
} from '@/utils/auth'
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
        { text: "reOdId", name: "reOdId" , default:false},
        { text: "orderId", name: "orderId" , default:false},
        { text: "日期", name: "createTime", width: '150' },
        { text: "原订单单号", name: "sourceOrderNum", width: '150' },
        { text: "退货单号", name: "orderNum", width: '150' },
        {text: "购货单位", name: "customer", width: '120'},
        { text: "物料代码", name: "goodCode", width: '100' },
        { text: "物料名称", name: "goodName", width: '120' },
        { text: "规格型号", name: "standard", width: '70' },
        { text: "单位", name: "unitOfMea", width: '70' },
        { text: "订单数量", name: "sourceNum", width: '70' },
        { text: "退货数量", name: "num", width: '70' },
        { text: "实际退货数量", name: "actualNum", width: '70' },
        { text: "单价", name: "sellPrice", default: false, width: '70' },
        { text: "金额", name: "totalPrice", default: false, width: '70' },
        { text: "发货仓库", name: "plaName", width: '80' },
        { text: "退货原因", name: "reason", width: '120' },
        //{ text: "商品图片", name: "img", width: '100' },
        { text: "审核人", name: "auditor", width: '80' },
        { text: "审核状态", name: "isAudit", width: '80' },
        { text: "状态", name: "status", width: '80' },
        { text: "审核反馈", name: "reasonOfDis", width: '100' },
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
  created() {
    //判断价格权限
    if(unescape(getPer('plper').replace(/\\u/gi, '%u')) === '价格') {
      for(let i in this.columns) {
        if(this.columns[i].name == 'sellPrice' || this.columns[i].name == 'totalPrice') {
          this.columns[i].default = true
        }
      }
    }
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.pageNum = val
      this.$emit('uploadList')
    },
      // 监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    dblclick(obj) {
      if (obj.row.isAudit == '已审核' || obj.row.isAudit == '已驳回') {
        obj.row.isAdd = false
        this.$emit('showDialog',obj.row)
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
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.pageNum || 1,
      pageSize: this.list.pageSize || 50
    }) {
      this.loading = true
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
                  record[i].returnOrderDetailVOS[a].auditor = record[i].auditor
                  record[i].returnOrderDetailVOS[a].plaName = record[i].plaName
                  record[i].returnOrderDetailVOS[a].customer = record[i].customer
                  record[i].returnOrderDetailVOS[a].customerCode = record[i].customerCode
                  record[i].returnOrderDetailVOS[a].addTime = record[i].createTime
                  record[i].returnOrderDetailVOS[a].sourceOrderNum = record[i].sourceOrderNum
                  record[i].returnOrderDetailVOS[a].reasonOfDis = record[i].reasonOfDis
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

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
       timeColor
       show-summary
       :selfAdaption="false"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
       @selection-change="handleSelectionChange"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { salesListT , delivery} from "@/api/indent/sales";
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
      columns: [
        { text: "oid", name: "oid", default: false },
        { text: "日期", name: "createTime", width: '150' },
        { text: "订单单号", name: "orderNum", width: '150' },
        {text: "购货单位", name: "customer", width: '120'},
        { text: "物料代码", name: "goodCode", width: '100' },
        { text: "物料名称", name: "goodName", width: '120' },
        { text: "规格型号", name: "standard", width: '70' },
        { text: "单位", name: "unitOfMea", width: '70' },
        { text: "订单数量", name: "num", width: '70' },
        { text: "实发数量", name: "actualNum", width: '70' },
        { text: "退货数量", name: "retNum", width: '70' },
        { text: "单价", name: "sellPrice", default: false, width: '70' },
        { text: "金额", name: "totalPrice", default: false, width: '70'  },
        { text: "审核人", name: "auditor", width: '80' },
        { text: "审核状态", name: "auditStatus", width: '80' },
        { text: "订单状态", name: "status", width: '100' },
        { text: "发货仓库", name: "plaName", width: '100' },
        //{ text: "商品图片", name: "img", width: '100' },
        { text: "备注", name: "remark", width: '120' },
        { text: "审核反馈", name: "reasonOfDis", width: '100' },

      ]
    };
  },
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
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
        this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val
        this.$emit('uploadList')
      },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections', val)
    },
    dblclick(obj) {
      if (obj.row.auditStatus == '已审核' || obj.row.auditStatus == '已驳回') {
        obj.row.isAdd = false
        this.$emit('showDialog', obj.row)
      }else{
        this.$emit('showDialog', obj.row)
      }
    },
      Delivery(val) {
          delivery(val).then(res => {
              this.$emit('uploadList')
          });
      },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      /*  fid: fid,
        type: type,*/
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      salesListT(data, val).then(res => {
        this.loading = false;
            if(res.flag && res.data != null) {
              this.list = res.data;
              let record = res.data.records
              let obj = []
              for(const i in record) {
                for(const a in record[i].orderDetails) {
                  record[i].orderDetails[a].oid = record[i].oid
                  record[i].orderDetails[a].addTime = record[i].createTime
                  record[i].orderDetails[a].username = record[i].username
                  record[i].orderDetails[a].auditor = record[i].auditor
                  record[i].orderDetails[a].plaName = record[i].plaName
                  record[i].orderDetails[a].customer = record[i].customer
                  record[i].orderDetails[a].customerCode = record[i].customerCode
                  record[i].orderDetails[a].auditStatus = record[i].auditStatus
                  record[i].orderDetails[a].reasonOfDis = record[i].reasonOfDis
                  record[i].orderDetails[a].remark = record[i].remark
                  obj.push(record[i].orderDetails[a])
                }
              }
              this.list = {
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

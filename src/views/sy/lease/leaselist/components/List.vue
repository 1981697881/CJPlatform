<template>
  <!-- <div class="list-main">
    <el-table
      :data="list.list"
      border
      size="mini"
      :highlight-current-row="true"
      @row-dblclick="dblclick"
      :height="'100%'"
    >
      <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        :label="t.text"
        :width="t.width?t.width:'100px'"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>

    <div class="text-center pages" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="list.pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="list.pageSize"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>-->
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
  >
    <el-table-column align="center" slot="title" :label="'操作'" width="220">
      <template slot-scope="scope">
        <el-button-group>
          <el-button
            size="mini"
            :type="scope.row.audit=='已审核'?'warning':'primary'"
            @click="audit(scope.$index, scope.row)"
          >{{scope.row.audit=="已审核"?"反审":"审核"}}</el-button>
          <el-button size="mini" type="success" @click="start(scope.$index, scope.row)">启用</el-button>
          <el-button size="mini" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </list>
</template>

<script>
import { mapGetters } from "vuex";
import {
  rentContractList,
  deleteContract,
  auditRentContract,
  startRentContract
} from "@/api/sy/lease/leaselist";
import fetchJsonp from "fetch-jsonp";
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
        { text: "合同编号", name: "code" },
        { text: "签约日期", name: "signTime" },
        { text: "租户名称", name: "customerName" },
        { text: "起始日期", name: "startTime" },
        { text: "结束日期", name: "endTime" },
        { text: "租赁期限", name: "timeLimit" },
        { text: "交房日期", name: "makingRoomTime" },
        { text: "进场日期", name: "approachTime" },
        { text: "开业日期", name: "openTime" },
        { text: "经营体", name: "companyId" },
        { text: "备注", name: "remark" },
        { text: "房产描述", name: "houseDesc" },
        { text: "租金总额", name: "rental" },
        { text: "管理费总额", name: "backmentCost" },
        { text: "费用描述", name: "costDesc" },
        { text: "免租期描述", name: "rentFree" },
        { text: "租金标准描述", name: "rentStandard" },
        { text: "租金支付日描述", name: "rentPayDate" },
        { text: "管理费标准描述", name: "backStandard" },
        { text: "合同来源", name: "sourceName" },
        { text: "合同状态", name: "statusName" },
        { text: "审核状态", name: "audit" },
        { text: "收取抽成租金", name: "commission" },
        { text: "集中收银", name: "centralizedCashier" },
        { text: "租赁单元列表", name: "rentUnitList" }
      ]
    };
  },
  watch: {
    node(val) {
      this.fetchData(val.data.status);
    },
    list(val) {
      
      // 转换列表的审核状态
      let nlist = this.list.list;
      for (let i in nlist) {
        let audit = nlist[i].audit;

        if (audit == 0) {
          this.list.list[i].audit = "未审核";
        } else if (audit == 1) {
          this.list.list[i].audit = "已审核";
        }
      }
    }
  },
  methods: {
    //审核
    audit(index, row) {
      //获取时间
      let date = new Date();
      let y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate();
      let time = y + "-" + m + "-" + d;

      const data = {
        fid: row.fid,
        reviewTime: time,
        audit: row.audit == "已审核" ? "-3" : 1
      };
      auditRentContract(data).then(res => {
        if (res.status == 0) {
          this.refresh()
        }
      });
    },
    //启用
    start(index, row) {
      startRentContract({ contractId: row.fid }).then(res => {
        if (res.status == 0) {
          this.refresh()
        }
      });
    },
    //删除当前行
    delRow(index, row) {
      deleteContract({ fid: row.fid }).then(res => {
         if (res.status == 0) {
          this.refresh()
        }
      });
    },
    //监听单击某一行
    rowClick(obj){
      this.$store.dispatch('list/setClickData',obj.row)
    },
    //监听双击某一行
    dblclick(obj) {
      this.$emit("handlerColumn", true, obj.row);
    },
    //监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val;
      this.fetchData(this.node.data.status);
    },
    //监听当前页
    handleCurrent(val) {
      this.list.pageNum = val;
      this.fetchData(this.node.data.status);
    },
    //获取列表
    fetchData(status) {
      this.loading = true;
      const data = {
        status: status,
        userId: this.$store.getters.token,
        pageNum: this.list.pageNum || 1,
        pageSize: this.list.pageSize || 30
      };
      rentContractList(data)
        .then(res => {
          this.$store.dispatch('list/setClickData',{})
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
  height: calc(100vh - 336px);
}
</style>

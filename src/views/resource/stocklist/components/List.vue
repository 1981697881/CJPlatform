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
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { stockList } from "@/api/resource/stock";
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
      goodName: null,
      prId: null,
      columns: [
        { text: "gid", name: "gid",default:false },
        { text: "商品名称", name: "goodName" },
        { text: "商品编号", name: "goodCode" },
        { text: "规格型号", name: "standard" },
        { text: "仓库", name: "wareHouseName" },
        { text: "数量", name: "num" },
       /*   { text: "价格", name: "price", default: false },
          { text: "更新时间", name: "updateTime" },*/
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
        if(this.columns[i].name == 'price') {
          this.columns[i].default = true
        }
      }
    }
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.fetchData();
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
          this.fetchData();
      },
    dblclick(obj) {
      const data = {
        fid : obj.row.fid,
        type : obj.row.type
      }
      this.$emit('showDialog',data)
    },
    uploadPr(val) {
      this.prId = val.plaId
      this.goodName = val.goodName
      this.fetchData({
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      let obj = {}
      this.prId != null || this.prId != undefined ? obj.plaId = this.prId : null
      this.goodName != null || this.goodName != undefined ? obj.goodName = this.goodName : null
        stockList(data, obj).then(res => {
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

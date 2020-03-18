<template>
  <div class="list-main">
    <el-table :height="height" ref="multipleTable" :data="list.records" border size="mini" :highlight-current-row="true" >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:''"
      ></el-table-column>
    </el-table>
    <div class="text-center pages" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { warehouseList, queryWarehouse} from "@/api/resource/warehouse";
import List from "@/components/List";
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  props: {
    // 是否自定义高度 默认100%
    height: {
      type: String,
      default: "100%"
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      type: null,
      goodName: null,
      prId: null,
      columns: [
        { text: "wid", name: "wid",default:false },
        { text: "编号", name: "code" },
        { text: "名称", name: "name" },
        { text: "更新时间", name: "updateTime" },
      ]
    };
  },
  created() {

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
          this.fetchData()
      },
   /* dblclick(obj) {
      const data = {
        fid : obj.row.fid,
        type : obj.row.type
      }
      this.$emit('showDialog',data)
    },*/
    uploadPr(val) {
      this.prId = val.plaId
      this.goodName = val.goodName
      this.fetchData();
    },
    // 获取选中
    getSelection() {
      return this.$refs.multipleTable.selection
    },
    toggleSelection(rows) {
      const me = this
      const list = this.list.records
      if (rows) {
        list.forEach(function(item, index) {
          rows.forEach(row => {
            if(item.wid == row){
              me.$refs.multipleTable.toggleRowSelection(item)
            }
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    fetchData() {
      this.loading = true
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      warehouseList(data).then(res => {
        this.loading = false
        if(res.flag) {
          this.list = res.data
          let params = {
            configName: "INCLUDE_WAREHOUSE",
          }
          queryWarehouse(params).then(reso => {
            console.log(reso)
            if(reso.flag) {
              let array = reso.data.configValue.split(",")
              this.toggleSelection(array)
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>

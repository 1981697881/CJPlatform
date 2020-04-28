<template>
  <div>
    <el-table
      :data="list.records"
      border
      :stripe="timeColor?false : true"
      size="mini"
      :highlight-current-row="true"
      @row-dblclick="dblclick"
      @row-click="rowClick"
       @selection-change="handleSelectionChange"
      :height="height"
      :row-class-name="tableRowClassName"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
    >
      <el-table-column v-if="type" :type="type?'selection':''"></el-table-column>
      <el-table-column v-if="index" prop="date"  label="序号" type="index" align="center" sortable></el-table-column>
      <slot name="title"></slot>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        sortable
        :prop="t.name"
        v-if="t.default!=undefined?t.default:true"
        :label="t.text"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <!--<el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button  type="text" size="small"  @click.native="">添加</el-button>
        </template>
      </el-table-column>-->
      <slot name="after"></slot>
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
export default {
  props: {
    list: {
      // 请求返回的json数据
      type: Object,
      default: null
    },
    columns: {
      // 列
      type: Array,
      default: null
    },
    index: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    // 是否开启多选
    type: {
      type: Boolean,
      default: false
    },
    timeColor: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 是否打开底部合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    //是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    },
    //是否自定义高度 默认100%
    height:{
      type:String,
      default:"100%"
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.totalPrice <= 0) {
        return 'urgent-row';
      } else{
        return '';
      }
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections',val)
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {

        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));

        if (!values.every(value => isNaN(value))) {
          if(column.property == 'num' ||  column.property == 'actualNum'|| column.property == 'retNum'|| column.property == 'totalPrice'|| column.property == 'sourceNum'){
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " ";
          }
        } else {
          sums[index] = " ";
        }
      });
      return sums;
    },
    // 表格单击操作
    rowClick(row, column, el) {
      return this.$emit("row-click", { row, column, el });
    },
    // 表格双击操作
    dblclick(row, column, el) {
      return this.$emit("dblclick", { row, column, el });
    },
    //监听每页显示数量
    handleSize(size) {
      return this.$emit("handle-size", size);
    },
    //监听当前页码数
    handleCurrent(current) {
      return this.$emit("handle-current", current);
    }
  }
};
</script>

<style>
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

</style>
<style>
  .urgent-row {
    color: red;
  }
</style>

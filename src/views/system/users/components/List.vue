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
  import {mapGetters} from "vuex";
  import {usersList} from "@/api/system/users";
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
          {text: "uid", name: "uid", default: false},
          {text: "用户名称", name: "name"},
          {text: "登录账号", name: "username"},
          {text: "联系电话", name: "tel"},
          {text: "地址", name: "comp"},
          {text: "状态", name: "status"},
        ]
      };
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData()
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData()
      },
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      fetchData(val) {
        this.loading = true;
        const data = {
          query: val || '',
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        };
        usersList(data).then(res => {
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

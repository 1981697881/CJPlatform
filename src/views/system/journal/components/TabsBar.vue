<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'操作员'">
            <el-input v-model="search.username" placeholder="输入操作员"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.query" placeholder="关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      value: '',
      search: {
        username: null,
        query: null
      }
    };
  },

  methods:{
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.username != null && this.search.username != '' ? obj.username = this.search.username : null
      this.search.query != null && this.search.query != '' ? obj.query = this.search.query : null
      return obj
    },
    // 关键字查询
    query() {
      this.$emit('uploadList', this.qFilter())
    },
    upload() {
      this.search.username = ''
      this.search.query = ''
      this.$emit('uploadList')
    },
  }
};
</script>

<style>
</style>

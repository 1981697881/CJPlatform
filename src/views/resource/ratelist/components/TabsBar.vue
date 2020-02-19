<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'客户名称'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleTab(node)">价格同步</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------  新增客户没做完

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: {
        keyword: null
      }
    };
  },
  computed: {
    ...mapGetters(["node"])
  },
  methods:{
    handleTab(node){
     /*   this.$emit('showDialog')*/
    },
    //关键字查询
    query(){
      if((typeof this.search.keyword != null) && (this.search.keyword !='')){
        this.$emit('queryBtn',this.search.keyword)
      }
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
    }
  }
};
</script>

<style>
</style>

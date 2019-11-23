<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-button :size="'mini'" type="primary" @click="handlerBtn">新增</el-button>
        <el-button :size="'mini'" type="primary">编辑</el-button>
        <el-button :size="'mini'" type="primary">删除</el-button>
        <el-button :size="'mini'" type="primary">审核</el-button>
        <el-button :size="'mini'" type="primary">反审核</el-button>
        <el-button :size="'mini'" type="primary">网格设置</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: {
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["node"])
  },
  methods:{
    handleTab(node){
      if(node){
        console.log(node.data.type)
        if(node){

        }
      }else{
        this.$message({
          type:"warning",
          message:"请先选择房产"
        })
      }
    },
    handlerBtn(){
      this.$emit("add-unit")
    }
  }
};
</script>

<style>
</style>

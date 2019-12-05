<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" @click="handleTab(node)">新增</el-button>
          <el-button :size="'mini'" type="primary" >修改</el-button>
          <el-button :size="'mini'" type="primary" >用户信息同步</el-button>
          <el-button :size="'mini'" type="primary" @click="handleDisable">禁用</el-button>
          <el-button :size="'mini'" type="primary">启用</el-button>
          <el-button :size="'mini'" type="primary">密码重置</el-button>
        </el-button-group>
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
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["node","clickData"])
  },
  methods:{
    handleTab(node){
            this.$emit('showDialog')
    },
      handleDisable(){
          if (this.clickData.fid) {
              console.log(this.clickData)
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
      }
  }
};
</script>

<style>
</style>

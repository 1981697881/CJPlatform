<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-button :size="'mini'" type="primary" @click="handlerBtn">新增</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" @click="saveRole">保存权限</el-button>
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
    ...mapGetters(["node","clickData"])
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
      saveRole(){
          this.$emit("saveRoles")
      },
    handlerBtn(){
      this.$emit("showDialog",{rid:null})
    },
      handlerAlter(){
          if (this.clickData.rid) {
              this.$emit('showDialog',{rid: this.clickData.rid })
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

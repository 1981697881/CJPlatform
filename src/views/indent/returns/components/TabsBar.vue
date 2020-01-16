<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'退货单号'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAudit">审核</el-button>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus"  @click="Receiving">收货确认</el-button>
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
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["node","clickData"])
  },
  methods:{
      Receiving(){
          if (this.clickData.reOdId) {
              this.$emit('receiving',{
                  reOdId:this.clickData.reOdId,
              })
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
      },
      handleAudit(){
          if (this.clickData.reOdId) {
              this.$emit('showDialog',this.clickData)
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }

      },
  }
};
</script>

<style>
</style>

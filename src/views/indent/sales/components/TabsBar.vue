<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'订单单号'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click.native="handleTab">审核</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >发货确认</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------  新增客户没做完

import { mapGetters } from "vuex";
export default {
    components: {},
    computed: {
        ...mapGetters(["node","clickData","selections"])
    },
  data() {
    return {
      search: {
        name: ""
      }
    };
  },

  methods:{
    handleTab(){
        if (this.clickData.fid) {
            console.log(this.clickData)
            this.$emit('showDialog')
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

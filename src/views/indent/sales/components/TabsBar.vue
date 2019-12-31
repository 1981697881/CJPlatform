<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'订单单号'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAudit">审核</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="Delivery">发货确认</el-button>
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
          keyword: null
      }
    };
  },

  methods:{
      Delivery(){
          if (this.clickData.oid) {
              this.$emit('theDelivery',{
                  oid:this.clickData.oid,
              })
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
      },
      //关键字查询
      query(){
          if((typeof this.search.keyword != null) && (this.search.keyword !='')){

          }
      },
      handleAudit(){
        if (this.clickData.oid) {
            this.$emit('showDialog',{
                oid:this.clickData.oid,
                orderId:this.clickData.orderId,
                createTime:this.clickData.createTime
            })
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

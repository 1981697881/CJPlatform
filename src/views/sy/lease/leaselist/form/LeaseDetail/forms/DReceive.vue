<template>
  <div>
    <div class="list-header">
      <el-button :size="'mini'" type="primary">添加合同费用</el-button>
      <el-button :size="'mini'" type="primary">添加其他费</el-button>
      <el-dropdown>
        <el-button size="mini" type="primary">
          修改
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>单个修改</el-dropdown-item>
          <el-dropdown-item>批量修改</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button :size="'mini'" type="primary">添加合同费用</el-button>
      <el-button :size="'mini'" type="primary">添加合同费用</el-button>
    </div>
    <div class="list-header" style="margin-top:10px">
      <el-form :label-width="'100px'" :size="'mini'" v-model="search">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="'应收费列表'">
              <el-radio-group v-model="search.name" size="small">
                <el-radio-button label="明细"></el-radio-button>
                <el-radio-button label="汇总"></el-radio-button>
                <el-radio-button label="月底"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-select :size="'mini'" v-model="search.name">
              <el-option :value="'1'">1</el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select :size="'mini'" v-model="search.name">
              <el-option :value="'1'">1</el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="'开始时间'">
              <el-select  v-model="search.name">
                <el-option :value="'1'">1</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="'结束时间'">
              <el-select v-model="search.name">
                <el-option :value="'1'">1</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <list :columns="columns" :list="list" type index/>
  </div>
</template>

<script>
import List from "@/components/List"
export default {
    components:{
        List
    },
  data() {
    return {
      search: {
        name: "明细"
      },
      list:{},
      columns: [
          { text: "业户名称", name: "customerName" },
          { text: "单元名称", name: "unitName" },
          { text: "费项名称", name: "feeName" },
          { text: "应收期间", name: "receiveTime" },
          { text: "应收金额", name: "receiveAmount" },
          { text: "实收金额", name: "actualAmount" },
          { text: "余额", name: "balanceAmount" },
          { text: "计费开始时间", name: "billingStartTime" },
          { text: "计费终止时间", name: "billingEndTime" },
          { text: "滞纳金起算日", name: "naginTime" },
          { text: "账单日", name: "billTime" },
          { text: "付款日", name: "receiveEndTime" },
          { text: "用量", name: "dosage" },
          { text: "单价", name: "price" },
          { text: "调整金额", name: "adjustAmount" },
          { text: "减免金额", name: "freeAmount" },
          { text: "减免锁定状态", name: "freeStatus" },
          { text: "优惠金额", name: "discountAmount" },
          { text: "状态", name: "status" },
          ]
    };
  }
};
</script>

<style scoped>
</style>

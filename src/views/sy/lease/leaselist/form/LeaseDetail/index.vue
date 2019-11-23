合同基本信息
<template>
  <div>
    <div class="tabs">
      <el-button-group>
        <el-button :size="'mini'" type="primary" @click="saveData">保存</el-button>
        <el-button :size="'mini'" type="primary">启用</el-button>
        <el-button :size="'mini'" type="primary">打印</el-button>
        <el-button :size="'mini'" type="primary">预览</el-button>
        <el-button :size="'mini'" type="primary">业务</el-button>
        <el-button :size="'mini'" type="primary">优惠</el-button>
        <el-button :size="'mini'" type="primary">审核</el-button>
        <el-button :size="'mini'" type="primary">财务</el-button>
        <el-button :size="'mini'" type="primary">发送</el-button>
      </el-button-group>
    </div>
    <el-tabs v-model="activeName" type="card">

      <el-tab-pane label="基础信息" name="info">
        <d-info ref="info"/>
      </el-tab-pane>

      <el-tab-pane label="合同应收" name="receivable">
        <d-receive ref="receivable"/>
      </el-tab-pane>
      <el-tab-pane label="合同应付" name="dealWith ">
        <d-pay ref="dealWith" />
      </el-tab-pane>
      <el-tab-pane label="更多信息" name="more">
        <d-more ref="more"/>
      </el-tab-pane>
      <el-tab-pane label="相关日志" name="log">
        <d-log ref="log"/>
      </el-tab-pane>
      <el-tab-pane label="合同执行" name="execute">
        <d-execute ref="execute"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {DInfo,DReceive,DPay,DMore,DLog,DExecute} from './forms'

export default {
    components:{
        DInfo,
        DReceive,
        DPay,
        DMore,
        DLog,
        DExecute
    },
  data() {
    return {
      activeName: "info",
      form_info:{
        name:''
      }
    };
  },
  methods:{
    saveData(){
      // 触发每个标签页的保存表单函数
      this.$refs[this.activeName].saveData()
    }
  }
  
};
</script>

<style lang="scss" scoped>
.tabs{
  text-align:right;
  margin-bottom:20px;
}
</style>

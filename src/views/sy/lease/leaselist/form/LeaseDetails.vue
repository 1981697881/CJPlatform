合同基本信息
<template>
  <div>
    <div class="tabs">
      <el-button-group>
        <el-button :size="'mini'" type="primary">保存</el-button>
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
        <el-form v-model="form_info" :label-width="'80px'" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'租赁类型'">
                <el-select v-model="form_info.name" class="width-full">
              <el-option :label="'暂无数据'" :value="0"></el-option>
            </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="合同应收" name="receivable">合同应收</el-tab-pane>
      <el-tab-pane label="合同应付" name="dealWith ">合同应付</el-tab-pane>
      <el-tab-pane label="更多信息" name="more">更多信息</el-tab-pane>
      <el-tab-pane label="相关日志" name="log">相关日志</el-tab-pane>
      <el-tab-pane label="合同执行" name="execute">合同执行</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "info",
      form_info:{
        name:''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs{
  text-align:right;
  margin-bottom:20px;
}
</style>

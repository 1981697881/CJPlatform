<template>
  <div class="list-header">
    <el-button-group style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-plus" :size="'mini'">新增</el-button>
      <el-button type="primary" icon="el-icon-edit" :size="'mini'">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" :size="'mini'">删除</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        name: ""
      }
    };
  },
  methods: {
    // 监听每个按钮要打开的对应窗口
    handlerTab(element) {
      this.$emit("handlerTab", true, element);
    }
  }
};
</script>

<style scoped>
</style>

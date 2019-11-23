<template>
  <div class="app-list">
    <Tree class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <div>
        <tabs-bar @add-unit="handlerTabs" />
      </div>
      <list ref="list" :pr-id="floorId" />
    </div>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";

export default {
  components: {
    Tree,
    TabsBar,
    List
  },
  data() {
    return {
      floorId: null
    };
  },
  methods: {
    handlerNode(node) {
      console.log(node.data)
      // 触发列表的获取数据函数（原为像list组件传入id并监听变动在list组件里触发函数，已销毁）
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    handlerTabs(prId) {
      console.log(prId)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

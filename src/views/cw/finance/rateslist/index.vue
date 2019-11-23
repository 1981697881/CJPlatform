<template>
  <div class="app-list">
     <list-tab @handlerTab="handlerTab" />
    <Tree class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <list ref="list" @handlerColumn="handlerColumn" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ListTab, List ,Tree} from "./components";

export default {
  components: {
    Tree,
    ListTab,
    List,
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      activeName: "anfx"
    };
  },
  watch: {},
  methods: {
    // 监听树点击
    handlerNode(node) {
      let projectId = node.data.fid ? node.data.fid : "";
      let systemType = node.data.systemType ? node.data.systemType : "";
      return 
      this.$refs["fx-list-top"].fetchData(projectId, systemType);
    },
    // 修改客户弹窗的显示状态
    // val-显示状态Boolean，element-要显示的组件名，对应dialog里的组件String
    handlerTab(val, element) {
      if (element != "detail") {
        //如果不是新增按钮
        if (typeof this.$store.getters["clickData"].fid == "undefined") {
          return this.$message({
            message: "请选择合同",
            type: "warning"
          });
        }
      }
    },
    // 监听列表点击
    handlerColumn(val, obj) {
      this.$store.dispatch("list/setData", obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-list {
  max-height: calc(100vh - 151px);
}
.app-list .list-tree {
  height: calc(100vh - 192px);
}
.app-list .list-container {
  min-height: calc(100vh - 192px);
}
</style>

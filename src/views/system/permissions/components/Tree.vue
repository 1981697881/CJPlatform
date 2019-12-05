<template>
  <el-scrollbar>
    <el-tree
      ref="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :default-expand-all="false"
      :load="loadTree"
      lazy
      show-checkbox
      @check-change="handleCheckChange"
      @node-click="handlerNode"
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
    />
  </el-scrollbar>
</template>

<script>
import { getJurisdiction } from "@/api/treeList";

export default {
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "text",
        isLeaf: "leaf",
        id: "fid"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    //window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
      handleCheckChange(data, checked, indeterminate) {
          console.log(data, checked, indeterminate);
      },
    handleScroll(el) {
      console.log(el);
    },
    //监听树是否被点击
    handlerNode(data, node) {
      // 保存点击节点的data
      this.$store.dispatch("tree/setNode", node);
      // 向父组件传入node
      this.$emit("handler-node", node);
    },
    loadTree(node, resolve) {
      var ndata = node.data;
      console.log(ndata)
        getJurisdiction(ndata != null ? ndata.fid : "", ndata != null ? ndata.type : "").then(res => {
        var data = res.data;
        if (data.type === 1) {
          return resolve([{ text: data.text, type:1,fid:0 }]);
        }
        data.forEach(item => {
          //返回的leaf是string类型  要转为boolean才能正常加载
          item.leaf = eval(item.leaf.toLowerCase());
        });
        setTimeout(() => {
          return resolve(data);
        }, 500);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>


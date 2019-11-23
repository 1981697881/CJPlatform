<template>
  <el-scrollbar>
    <el-tree
      ref="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :default-expand-all="false"
      :load="loadTree"
      lazy
      @node-click="handlerNode"
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
    />
  </el-scrollbar>
</template>

<script>
import { getHousesTree } from "@/api/treeList";

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
    handleScroll(el) {
      console.log(el);
    },
    handlerNode(data, node) {
      this.$store.dispatch("tree/setNode", node);

      this.$emit("handler-node", data.fid);
    },
    loadTree(node, resolve) {
      var ndata = node.data;
      getHousesTree(ndata != null ? ndata.fid : "", node.level, 1).then(res => {
        var data = res.data;
        if (data.type === 1) {
          return resolve([{ text: data.text, id: 333 }]);
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


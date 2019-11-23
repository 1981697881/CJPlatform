<template>
  <div>
      <el-scrollbar style="margin-bottom: 10px;padding-bottom:10px;height: 33vh;" class="box-shadow">
        <el-tree
          ref="tree"
          :props="defaultProps"
          :default-expand-all="false"
          :data="dynamicTree"
          node-key="id"
          highlight-current
           @node-click="handlerNode"
          :expand-on-click-node="false"
        />
      </el-scrollbar>
      <el-scrollbar>
        <el-tree
          ref="tree"
          :props="defaultProps"
          :default-expand-all="false"
          :load="loadTree"
          lazy
          node-key="id"
          highlight-current
          :expand-on-click-node="false"
        />
    </el-scrollbar>
  </div>
</template>

<script>
import { getReceiveItemFormatList ,getHousesTree } from "@/api/treeList";

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text",
        isLeaf: "leaf",
        id: "status"
      },
       dynamicTree:[]
    };
  },
  mounted(){
    this.fetchTree()
  },
  methods: {
    handlerNode(data, node) {
      this.$store.dispatch("tree/setNode", node);// 将树的node保存到store
      this.$emit("handler-node", node);// 手动触发一次列表获取
    },
    fetchTree(){
      getReceiveItemFormatList().then(res => {
        this.dynamicTree = res.data
      });
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
    }
  }
};
</script>

<style scoped>
</style>

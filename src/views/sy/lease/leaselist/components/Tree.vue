<template>
  <div>
      <div style="margin-bottom: 10px;padding-bottom:10px;height: 33vh;" class="box-shadow">
        <el-tree
          :props="defaultProps"
          :data="staticTree"
          highlight-current
          @node-click="handlerNode"
          :expand-on-click-node="false"
        />
      </div>
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
import { getHousesTree } from "@/api/treeList";

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text",
        isLeaf: "leaf",
        id: "status"
      },
      staticTree: [
        {
          text: "我的合同",
          status: "1",
          children: [
            {
              text: "当前合同",
              status: "11",
              children: [
                {
                  text: "60天内将到期合同",
                  status: "111",
                  leaf: true
                },
                {
                  text: "已变更过合同",
                  status: "112",
                  leaf: true
                },
                {
                  text: "已到期未退租合同",
                  status: "113",
                  leaf: true
                }
              ]
            },
            {
              text: "待执行合同",
              status: "12",
              children: []
            },
            {
              text: "历史合同",
              status: "13",
              children: [
                {
                  text: "已退租合同",
                  status: "131",
                  leaf: true
                },
                {
                  text: "提起退租合同",
                  status: "132",
                  children: [
                    {
                      text: "已启用",
                      status: "1321",
                      leaf: true
                    },
                    {
                      text: "未启用",
                      status: "1322",
                      leaf: true
                    }
                  ]
                },

                {
                  text: "变更前合同",
                  status: "133",
                  leaf: true
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    handlerNode(data, node) {
      this.$store.dispatch("tree/setNode", node);// 将树的node保存到store
      this.$emit("handler-node", node);// 手动触发一次列表获取
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

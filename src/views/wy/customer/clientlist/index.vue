<template>
  <div class="app-list">
    <Tree class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <div>
        <tabs-bar @addUnit="handlerTabs" @showDialog="handlerDialog"/>
      </div>
      <list :id="treeId" ref="list" :pr-id="floorId" @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'70%'"
      destroy-on-close
    >
      <customer-info :fid="fid"></customer-info>
      
    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar, List } from "./components";
import { CustomerInfo } from "./form";

export default {
  components: {
    Tree,
    TabsBar,
    List,
    CustomerInfo
  },
  data() {
    return {
      visible: null,
      fid: null,
      treeId: null, // null
      floorId: null
    };
  },
  methods: {
    saveData(){

    },
    handlerDialog(obj){
      if(obj)this.fid = obj.fid
      
      this.visible = true
    },
    handlerNode(node) {
      console.log(node.data)
      this.treeId = node.data.fid;
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId);
      this.floorId = prId;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

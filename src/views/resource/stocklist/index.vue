<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @addUnit="handlerTabs" @uploadList="upload" @showTable="loadList" @showDialog="handlerDialog" @queryBtn="query"/>
      </div>
      <list :id="treeId" ref="list" :pr-id="floorId" @showDialog="handlerDialog"/>
    </div>

  </div>
</template>

<script>
import { TabsBar, List } from "./components";

export default {
  components: {
    TabsBar,
    List,
  },
  data() {
    return {
      visible: null,
      fid: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
       /* this.$refs.list.fetchData()*/
    },
  methods: {
    saveData(){

    },
    loadList(val){
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
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
    },
    //更新列表
    upload(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    //查询
    query(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

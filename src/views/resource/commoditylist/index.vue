<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @addUnit="handlerTabs" @uploadList="upload" @showTable="loadList" @showDialog="handlerDialog" @queryBtn="query"/>
      </div>
      <list  ref="list" @uploadList="upload" @showDialog="handlerDialog"/>
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
       // this.$refs.list.fetchData()
    },
  methods: {
    saveData(){

    },
    loadList(val) {
      this.$refs.list.uploadPr(val)
    },
    handlerDialog(obj){
      if(obj)this.fid = obj.fid
      this.visible = true
    },
    handlerNode(node) {
      console.log(node.data)
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId);
    },
      //更新列表
      upload() {
          this.$refs.list.fetchData()
      },
    //查询
    query(val) {
      console.log(val)
      this.$refs.list.fetchData(val)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

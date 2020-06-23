<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @addUnit="handlerTabs" @showDialog="handlerDialog" @showTable="loadList" @uploadList="upload"  @queryBtn="query"/>
      </div>
      <list  ref="list"  @showDialog="handlerDialog"/>
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
        //this.$refs.list.fetchData()
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
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId);
    },
    //更新列表
    upload() {
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

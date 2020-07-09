<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";

export default {
  components: {
    TabsBar,
    List
  },
  data() {
    return {
      visible: null,
      oid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      if(obj)this.oid = obj.oid;this.orderId=obj.orderId;this.createTime=obj.createTime
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
      //更新列表
      upload(){
          this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
      }
  }
};
</script>

<style lang="scss" scoped>
</style>

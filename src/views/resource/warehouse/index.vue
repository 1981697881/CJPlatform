<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @addUnit="handlerTabs" @selection="getSelection" @uploadList="upload" @queryBtn="query" @showTable="loadList" @showDialog="handlerDialog"/>
      </div>
      <list :id="treeId" ref="list" :pr-id="floorId" @showDialog="handlerDialog"/>
    </div>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import {alterWarehouse} from "@/api/resource/warehouse";
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
    this.$refs.list.fetchData()
  },
  methods: {
    saveData() {

    },
    loadList(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    handlerDialog(obj) {
      if(obj)this.fid = obj.fid
      this.visible = true
    },
    getSelection() {
      const selection = this.$refs.list.getSelection()
      if(selection.length > 0) {
        let array = []
        selection.forEach(function(item,index) {
          array.push(item.wid)
        })
        let obj ={ configName: "INCLUDE_WAREHOUSE",configValue: array.toString()}
        alterWarehouse(obj).then(res => {
          if(res.flag) {
            this.upload()
          }
        })
      } else {
        this.$message({
          type:"warning",
          message:"请先选择仓库"
        })
      }
    },
    handlerNode(node) {
      this.treeId = node.data.fid;
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    handlerTabs(prId) {
      this.$refs.list.addUnit(prId);
      this.floorId = prId;
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
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

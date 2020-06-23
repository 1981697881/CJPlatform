<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list  ref="list"  @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'40%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @uploadList="upload" :uid="uid"></customer-info>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { CustomerInfo } from "./form";

export default {
  components: {
    TabsBar,
    List,
    CustomerInfo
  },
  data() {
    return {
      visible: null,
        uid: null,
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
      if(obj)this.uid = obj.uid
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    // 更新列表
    upload(val = this.$refs.tabs.returnPar()) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 查询
    query(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

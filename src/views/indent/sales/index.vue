<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @showDialog="handlerDialog" @theDelivery="delivery"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @uploadList="upload" :oid="oid" :orderId="orderId" :createTime="createTime" :username="username"></customer-info>

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
      oid: null,
        username:null,
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
      delivery(obj){
          if(obj){
              this.$refs.list.Delivery(obj.oid)
              this.$refs.list.fetchData()
          }
      },
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      if(obj)this.oid = obj.oid;this.orderId=obj.orderId;this.createTime=obj.createTime;this.username=obj.username;
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      }
  }
};
</script>

<style lang="scss" scoped>
</style>

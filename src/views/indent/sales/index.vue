<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @theDelivery="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="upload"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      :fullscreen="isfullscreen"
      title="基本信息"
      v-if="visible"
      :width="'70%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @operation="operation" @uploadList="onUpload" :isAdd="isAdd" :plaId="plaId" :oid="oid" :orderId="orderId" :createTime="createTime" :customer="customer" :customerCode="customerCode" :remark="remark"></customer-info>

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
      customer: null,
      customerCode: null,
      visible: null,
      oid: null,
      isAdd: null,
      remark: null,
      isfullscreen: null,
      orderId: null,
      createTime: null,
      treeId: null, // null
      plaId: null
    };
  },
    mounted() {
        //this.$refs.list.fetchData()
    },
  methods: {
    delivery(obj){
      if(obj){
        this.$refs.list.Delivery(obj.oid)
        this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      if(obj)this.oid = obj.oid;this.orderId = obj.orderNum;this.createTime=obj.addTime;this.isAdd = obj.isAdd;this.customer = obj.customer;this.customerCode = obj.customerCode;this.remark = obj.remark;this.plaId = obj.plaId;
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 操作窗口
    operation(val) {
      if(val == 1) {
        this.isfullscreen = true
      }else {
        this.isfullscreen = false
      }
    },
    // 更新列表
    query(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    onUpload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>

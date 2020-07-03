<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs"  @showDialog="handlerDialog" @receiving="receiving" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list  ref="list"  @showDialog="handlerDialog" @uploadList="upload"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      :fullscreen="isfullscreen"
      title="基本信息"
      v-if="visible"
      :width="'70%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @operation="operation" :isAdd="isAdd" :img="img" :reOdId="reOdId" @uploadList="onUpload" :orderId="orderId"  :returnOrderNum="returnOrderNum" :createTime="createTime" :customer="customer" :customerCode="customerCode" :reason="reason"></customer-info>

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
      isfullscreen: null,
      fid: null,
      isAdd: null,
      img: null,
      reason: null,
      customer: null,
      returnOrderNum: null,
      customerCode: null,
      treeId: null, // null
      floorId: null
    }
  },
  mounted() {
    //this.$refs.list.fetchData()
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    receiving(obj) {
      if (obj) {
        this.$refs.list.Receiving(obj.reId)
        this.$refs.list.fetchData(this.$refs.tabs.qFilter())
      }
    },
    handlerDialog(obj) {
      if(obj)this.reOdId = obj.reId;this.isAdd = obj.isAdd;this.returnOrderNum=obj.orderNum;this.createTime=obj.addTime;this.orderId=obj.orderId;this.img=obj.image;this.customer = obj.customer;this.customerCode = obj.customerCode;this.reason=obj.reason;
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    // 更新列表
    query(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 操作窗口
    operation(val) {
      if (val == 1) {
        this.isfullscreen = true
      } else {
        this.isfullscreen = false
      }
    },
    // 更新列表
    upload(val = this.$refs.tabs.getPlaId()) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    onUpload() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>

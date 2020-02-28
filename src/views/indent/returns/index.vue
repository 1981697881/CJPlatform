<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar  @showDialog="handlerDialog" @receiving="receiving" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list  ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      :fullscreen="isfullscreen"
      title="基本信息"
      v-if="visible"
      :width="'70%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @operation="operation" :img="img" :reOdId="reOdId" @uploadList="upload" :orderId="orderId"  :returnOrderNum="returnOrderNum" :createTime="createTime" :username="username" :reason="reason"></customer-info>

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
        img:null,
        reason:null,
        username:null,
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
      receiving(obj){
          if(obj){
              console.log(obj.reOdId)
              this.$refs.list.Receiving(obj.reOdId)
              this.$refs.list.fetchData()
          }
      },
    handlerDialog(obj){
      if(obj)this.reOdId = obj.reId;this.returnOrderNum=obj.orderNum;this.createTime=obj.addTime;this.orderId=obj.orderId;this.img=obj.image;this.username=obj.username;this.reason=obj.reason;
      this.visible = true
    },
    handlerNode(node) {
      console.log(node.data)
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
    //更新列表
    query(val) {
        console.log(val)
      this.$refs.list.fetchData(val)
    },
    //操作窗口
    operation(val) {
      if(val == 1) {
        this.isfullscreen = true
      }else {
        this.isfullscreen = false
      }
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

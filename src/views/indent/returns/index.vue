<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar  @showDialog="handlerDialog" @receiving="receiving"/>
      </div>
      <list  ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" :reOdId="reOdId" @uploadList="upload" :orderId="orderId"  :returnOrderNum="returnOrderNum" :createTime="createTime"></customer-info>

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
      fid: null,
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
      if(obj)this.reOdId = obj.reOdId;this.returnOrderNum=obj.returnOrderNum;this.createTime=obj.createTime;this.orderId=obj.orderId;
      this.visible = true
    },
    handlerNode(node) {
      console.log(node.data)
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

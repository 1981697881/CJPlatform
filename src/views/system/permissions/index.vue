<template>
  <div class="app-list">
    <Tree ref="tree" class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <div>
        <tabs-bar @showDialog="handlerDialog" @saveRoles="handlerSave" />
      </div>
      <list ref="list" @showDialog="handlerDialog" @showTree="handlerTree" />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'40%'"
      destroy-on-close
    >
      <customer-info @hideDialog="hideWindow" @uploadList="upload" :rid="rid"></customer-info>

    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";
import { CustomerInfo } from "./form";
import { addRoleMenu} from "@/api/system/permissions";
export default {
  components: {
    Tree,
    TabsBar,
    List,
      CustomerInfo
  },
  data() {
    return {
        visible:null,
        rid:null,
      floorId: null
    }
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      hideWindow(val){
          this.visible = val
      },
      handlerSave(){
          this.loading = true;
          let val = this.$refs.list.getClickRow();
          addRoleMenu({menuIds:this.$refs.tree.getChecked(),rid:val.rid,}).then(res => {
              console.log(res)
              this.loading = false;
          });
      },
      handlerDialog(obj){
          console.log(obj)
          if(obj)this.rid = obj.rid
          this.visible = true
      },
      handlerTree(obj){
          this.$refs.tree.setMeunKeys(obj)
      },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      },
    handlerNode(node) {
      // 触发列表的获取数据函数（原为像list组件传入id并监听变动在list组件里触发函数，已销毁）
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>

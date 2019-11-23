<template>
  <div class="app-list">
    <Tree class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <div>
        <list-tab @handlerTab="handlerTab" />
      </div>
      <list ref="list" @handlerColumn="handlerColumn" />
    </div>

    <el-dialog :visible.sync="visible" :title="title" :width="width" @close="cleanStore">
      <lease-detail v-if="dialog.detail.visible" ref="lease-detail" />
      <lease-audit v-if="dialog.audit.visible" />
      <lease-sublet v-if="dialog.sublet.visible" />
      <lease-relet v-if="dialog.relet.visible" />
      <lease-change v-if="dialog.change.visible" />
      <lease-out v-if="dialog.out.visible" />
      <lease-break v-if="dialog.break.visible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Tree, ListTab, List } from "./components";
import {
  LeaseDetail,
  LeaseAudit,
  LeaseSublet,
  LeaseRelet,
  LeaseChange,
  LeaseOut,
  LeaseBreak
} from "./form";

export default {
  components: {
    Tree,
    ListTab,
    List,
    LeaseDetail, //合同详情
    LeaseAudit, //审核
    LeaseSublet, //转租
    LeaseRelet, //续租
    LeaseChange, //变更
    LeaseOut, //退租
    LeaseBreak //违约
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      dialog: {
        // 弹窗里的组件
        detail: {
          visible: false,
          title: "合同详情",
          width: "70%"
        },
        audit: {
          visible: false,
          title: "审核",
          width: "30%"
        },
        sublet: {
          visible: false,
          title: "合同转租",
          width: "70%"
        },
        relet: {
          visible: false,
          title: "合同续租",
          width: "70%"
        },
        change: {
          visible: false,
          title: "合同变更",
          width: "70%"
        },
        out: {
          visible: false,
          title: "合同退租",
          width: "70%"
        },
        break: {
          visible: false,
          title: "合同违约",
          width: "70%"
        }
      },
      visible: false,
      title: "", //当前弹窗的标题
      width: "50%" //当前弹窗的宽度 百分比// 默认50%
    };
  },
  watch: {
    // 监听关闭窗口，窗口关闭时里面的所有元素和组件消除
    visible(val) {
      if (!val) {
        // 关闭唐朝
        for (let item in this.dialog) {
          this.dialog[item].visible = val; // 所有弹窗里的组件销毁
        }
      } else {
        // 打开弹窗
        for (let item in this.dialog) {
          if (this.dialog[item].visible) {
            const el = this.dialog[item];
            el.visible = val; // 加载对应组件
            // 加载组件里的配置
            this.title = el.title;
            this.width = el.width;
            return;
          }
        }
      }
    }
  },
  methods: {
    // 弹窗关闭清空store
    cleanStore() {
      let node = this.node;
      //清空node在赋值node  触发列表重新获取并刷新列表
      this.$store.dispatch("tree/setNode", "");
      this.$store.dispatch("tree/setNode", node);

      this.$store.dispatch("list/setData", {});
    },
    // 监听树点击
    handlerNode(node) {
      //this.$refs.list.fetchData(node.data.status);
    },
    // 修改客户弹窗的显示状态
    // val-显示状态Boolean，element-要显示的组件名，对应dialog里的组件String
    handlerTab(val, element) {
     
      if (element != "detail") {
        //如果不是新增按钮
        if (typeof this.$store.getters["clickData"].fid == "undefined") {
          return this.$message({
            message: "请选择合同",
            type: "warning"
          });
        }
      }
       this.visible = val;
      this.dialog[element].visible = val; // 加载对应组件
    },
    // 监听列表点击
    handlerColumn(val, obj) {
      this.visible = val;
      this.dialog.detail.visible = val; // 加载leaseDetail组件
      this.$store.dispatch("list/setData", obj);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

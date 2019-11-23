<template>
  <div>
      <list :list="list" :columns="columns" index/>
      <div slot="footer" style="margin-top:10px;">
        <el-button type="primary" :size="'mini'">付款</el-button>
        <el-button type="primary" :size="'mini'">添加</el-button>
        <el-button type="primary" :size="'mini'">添加代理应付</el-button>
        <el-button type="primary" :size="'mini'">删除</el-button>
        <el-button type="primary" :size="'mini'">修改</el-button>
        <el-button type="primary" :size="'mini'">冲抵</el-button>
      </div>
  </div>
</template>

<script>
import List from "@/components/List"
export default {
    components:{
        List
    },
    data(){
        return {
            list:{},
            columns:[
                {text:"楼盘编号",name:"buildCode"},
                {text:"楼盘名称",name:"buildName"},
                {text:"楼栋编号",name:"towerCode"},
                {text:"楼栋名称",name:"towerName"},
                {text:"楼层编号",name:"floorCode"},
                {text:"楼层名称",name:"floorName"},
                {text:"单元编号",name:"unitCode"},
                {text:"单元名称",name:"unitName"},
                {text:"建筑面积",name:"buildArea"},
                {text:"住户编号",name:"customerCode"},
                {text:"住户名称",name:"customerName"},
                {text:"项目名称",name:"feeName"},
                {text:"应付金额",name:"payableAmount"},
                {text:"已付金额",name:"paidAmount"},
                {text:"抵充金额",name:"offsetAmount"},
                {text:"未付金额",name:"unpaidAmount"},
                {text:"应付期间",name:"payablePeriod"},
                {text:"应付期限",name:"payableDeadline"},
                {text:"应付说明",name:"payableExplain"},
            ]
        }
    }
}
</script>

<style scoped>

</style>

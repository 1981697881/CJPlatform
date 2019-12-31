<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'订单编号'">
            <el-input v-model="form.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下单日期'">
            <el-input v-model="form.createTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户名称'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户编号'">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
       <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true" >
     <el-table-column
       v-for="(t,i) in columns"
       :key="i"
       :prop="t.name"
       :label="t.text"
       :width="t.width?t.width:'120px'"
     ></el-table-column>
         <el-table-column
           fixed="right"
           label="操作"
           width="100">
           <template slot-scope="scope">
             <el-button  type="text" size="small"  @click.native="alterNum(scope.row)">修改数量</el-button>
           </template>
         </el-table-column>
   </el-table>

     </el-row>
   </el-form>
    <el-dialog
      :visible.sync="visible"
      title="下单数量"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'下单数量'">
              <el-input-number v-model="num1"  :min="1" label="请输入数量"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum">确定</el-button>
      </div>
    </el-dialog>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="warning" @click.native="rejected">驳回</el-button>
       <el-button type="primary" @click.native="audit">审核</el-button>
     </div>
 </div>
</template>

<script>
import { saleInfo,auditOrder,Dismissed} from "@/api/indent/sales";
import List from "@/components/List";

export default {
   components: {
       List
   },
 props: {
   oid: {
     type: Number,
     default: null
   },
     orderId: {
         type: String,
         default: null
     },
     createTime: {
         type: String,
         default: null
     }
 },
 data() {
   return {
       num1: 1,
       visible:false,
     form: {
         oid: null,
         orderId: null,
         createTime: null,
       name: null, // 客户名称
       code: null, // 客户编号
     },
       loading: false,
       list: [],
       obj:{},
       type: null,
       columns: [
           { text: "gid", name: "gid" },
           { text: "商品名称", name: "goodName" },
           { text: "商品编码", name: "goodCode" },
           { text: "下单数量", name: "num" },
           { text: "实发数量", name: "actualNum" },
           { text: "价格", name: "phone" },
       ],
   };
 },
 created() {

 },
 mounted() {
     this.form.oid=this.oid
     this.form.orderId=this.orderId
     this.form.createTime=this.createTime
   if (this.form.oid) {
     this.fetchData(this.form.oid);
   }
 },
 methods: {
     //修改数量
     alterNum(row) {
         this.obj = row;
         this.visible = true;
     },
     saveNum(){
         this.visible = false
        this.obj["actualNum"]=this.num1
         this.num1=1
     },
     audit() {
         let list=this.list,array=[]
         if (list.length > 0) {
             for (const i in list) {
                 var jbj = {}
                 jbj.gid = list[i].gid
                 jbj.oid = this.form.oid
                 jbj.actualNum = list[i].actualNum
                 array.push(jbj)
             }

             auditOrder(array).then(res => {
                     this.$emit('hideDialog', false)
                 this.$emit('uploadList')
                 });

         } else {
             return this.$message({
                 message: "无退货商品",
                 type: "warning"
             })
         }
   },
     rejected() {
         Dismissed(this.form.oid).then(res => {
             this.$emit('hideDialog', false)
             this.$emit('uploadList')

         })
     },
   fetchData(val) {
       saleInfo(val).then(res => {
       this.list = res.data;
     });
   },
 }
};
</script>

<style>
</style>

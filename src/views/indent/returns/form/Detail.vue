<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'reOdId'">
            <el-input v-model="form.reOdId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="'returnOrderNum'">
          <el-input v-model="form.returnOrderNum"></el-input>
        </el-form-item>
      </el-col>
        <el-col :span="12">
          <el-form-item :label="'orderId'">
            <el-input v-model="form.orderId"></el-input>
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
        <el-col :span="12">
          <el-form-item :label="'申请时间'">
            <el-input v-model="form.createTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'退货原因'">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>

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
        </el-table>
        <!--<list
          class="list-main"
          :columns="columns"
          :loading="loading"
          :list="list"
          index
          type
        />-->
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="warning" @click="rejected">驳回</el-button>
      <el-button type="primary" @click="audit">审核</el-button>
    </div>
  </div>
</template>

<script>
    import {getReturnOrder,auditOrder,Dismissed} from "@/api/indent/returns";
    export default {
        props: {
            orderId: {
                type: Number,
                default: null
            },
            reOdId: {
                type: Number,
                default: null
            },
            returnOrderNum: {
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
                form: {
                    reOdId: null,
                    orderId:null,
                    returnOrderNum: null,
                    createTime:null,
                    name: null, // 客户名称
                    code: null, // 客户编号
                },
                loading: false,
                list: [],
                type: null,
                columns: [
                    { text: "shopId", name: "shopId" },
                    { text: "商品名称", name: "name" },
                    { text: "商品编码", name: "code" },
                    { text: "退货数量", name: "number" },
                    { text: "价格", name: "phone" },
                ],
            };
        },
        mounted() {
            this.form.reOdId=this.reOdId
            this.form.orderId=this.orderId
            this.form.returnOrderNum=this.returnOrderNum
            this.form.createTime=this.createTime
            if (this.form.reOdId) {
                this.fetchData(this.form.reOdId);
            }
        },
        methods: {
            audit() {
                let list=this.list
                if (list.length > 0) {
                    auditOrder(this.form.reOdId).then(res => {
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
                Dismissed(this.form.reOdId).then(res => {
                    this.$emit('hideDialog', false)
                    this.$emit('uploadList')
                })
            },
            fetchData(val) {
                getReturnOrder(val).then(res => {
                    this.list = res.data["returnOrders"]
                });
            },
        }
    };
</script>

<style>
</style>

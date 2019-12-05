<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
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
            <el-input v-model="form.name"></el-input>
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
        <el-table :data="list" border stripe size="mini" :highlight-current-row="true" >
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
    <div slot="footer" style="text-align:center">
      <el-button type="info" @click.native="visible= false">驳回</el-button>
      <el-button type="primary" @click.native="saveData">审核</el-button>
    </div>
  </div>
</template>

<script>
    import { getCustomerById, saveCustomer,customerList} from "@/api/wy/customer/commoditylist";
    import List from "@/components/List";

    export default {
        components: {
            List
        },
        props: {
            fid: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                form: {
                    fid: null,
                    name: null, // 客户名称
                    code: null, // 客户编号
                },
                loading: false,
                list: [{

                }],
                type: null,
                columns: [
                    { text: "fid", name: "fid" },
                    { text: "商品名称", name: "name" },
                    { text: "商品编码", name: "code" },
                    { text: "退货数量", name: "contact" },
                    { text: "价格", name: "phone" },
                ],
            };
        },
        created() {

        },
        mounted() {
            this.tableData();
            if (this.fid) {
                this.fetchData(this.fid);
            }
        },
        methods: {
            saveData() {
                if(!this.form.buildId) return this.$message({
                    message: "请选择房产",
                    type: "warning"
                });
                saveCustomer(this.form).then(res => {
                    console.log(res)
                });
            },
            tableData(){
                const data = {
                    pageNum: 1,
                    pageSize:  5
                };
                customerList(data).then(res => {
                    console.log(res.data)
                    this.list = res.data.list;
                });
            },
            fetchData(val) {
                getCustomerById(val).then(res => {
                    this.form = res.data;

                });
            },
        }
    };
</script>

<style>
</style>

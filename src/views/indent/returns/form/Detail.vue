<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'reOdId'" style="display: none">
            <el-input v-model="form.reOdId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'申请时间'">
            <el-input v-model="form.createTime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'退货单号'">
            <el-input v-model="form.returnOrderNum" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'orderId'" style="display: none">
            <el-input v-model="form.orderId" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户名称'">
            <el-input v-model="form.customer" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户编号'">
            <el-input v-model="form.customerCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'退货原因'">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-upload
          :disabled="true"
          :on-preview="handlePictureCardPreview"
          action="https://jsonplaceholder.typicode.com/posts/"
          :class="{hide:hideUpload}"
          :file-list="fileList"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-row>
      <el-row :gutter="20">
        <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
          <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:''"
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
      <el-button type="success" v-show="biggest" @click="mWin(1)">最大化窗口</el-button>
      <el-button type="success" v-show="normal" @click="mWin(2)">正常窗口</el-button>
      <el-button type="warning" v-show="isAdd" @click="rejected">驳回</el-button>
      <el-button type="primary" v-show="isAdd" @click="audit">审核</el-button>
    </div>
  </div>
</template>

<script>
  import {getReturnOrder, auditOrder, Dismissed, getOrderGoodsById} from "@/api/indent/returns";
  import {
    getPer
  } from '@/utils/auth'
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
      },
      img: {
        type: String,
        default: null
      },
      isAdd: {
        type: Boolean,
        default: true
      },
      customer: {
        type: String,
        default: null
      },
      customerCode: {
        type: String,
        default: null
      },
      reason: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        form: {
          reOdId: null,
          orderId: null,
          returnOrderNum: null,
          createTime: null,
          customerCode: null, // 客户名称
          customer: null, // 客户编号
          reason: null,
        },
        biggest: true,
        normal: false,
        limitCount: 5,
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: true,
        loading: false,
        list: [],
        type: null,
        columns: [
          {text: "gid", name: "gid", default: false},
          {text: "商品名称", name: "goodName"},
          {text: "商品编码", name: "goodCode"},
          {text: "退货数量", name: "num"},
          {text: "价格", name: "sellPrice", default: false },
        ],
      };
    },
    created() {
      //判断价格权限
      if(unescape(getPer('plper').replace(/\\u/gi, '%u')) === '价格') {
        for(let i in this.columns) {
          if(this.columns[i].name == 'sellPrice') {
            this.columns[i].default = true
          }
        }
      }
    },
    mounted() {
      console.log(this.img)
      let imgArray = this.img.split(',');
      if (this.img != '') {
        if (imgArray.length > 0) {
          this.fileList = []
          for (let i in imgArray) {
            this.fileList.push({
              url: 'http://120.78.168.141:8091/web' + imgArray[i]
            })
          }
          console.log(this.fileList)
        } else {
          this.fileList = [];
        }
      }
      this.form.reOdId = this.reOdId
      this.form.orderId = this.orderId
      this.form.returnOrderNum = this.returnOrderNum
      this.form.createTime = this.createTime
      this.form.customer = this.customer
      this.form.customerCode = this.customerCode
      this.form.reason = this.reason
      if (this.form.reOdId) {
        this.fetchData(this.form.reOdId);
      }
    },
    methods: {
      //调整窗口
      mWin(val) {
        if (val == 1) {
          this.biggest = false
          this.normal = true
          this.$emit('operation', val)
        } else {
          this.biggest = true
          this.normal = false
          this.$emit('operation', val)
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      audit() {
        let list = this.list
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
      open() {
        this.$prompt('请输入原因', '提示', {
          confirmButtonText: '确定',
          maxlength:"10",
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '原因不能为空'
        }).then(({ value }) => {
          Dismissed({
            id: this.form.reOdId,
            reason: value
          }).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        }).catch(() => {
        });
      },
      rejected() {
        this.open()
      },
      fetchData(val) {
        getOrderGoodsById(val).then(res => {
          this.list = res.data
        });
      },
    }
  };
</script>

<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>


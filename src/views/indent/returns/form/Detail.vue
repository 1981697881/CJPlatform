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
        <el-col :span="12">
          <el-table :data="list2" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
            <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
            <el-table-column
              v-for="(t,i) in columns2"
              :key="i"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:'120px'"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native="handleAdd(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
            <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:'120px'"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              v-show="isAdd"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index,list)">删除</el-button>
                <el-button type="text" size="small" @click.native="alterNum(scope.row)">修改数量</el-button>
                <el-button type="text" size="small" @click.native="alterPrice(scope.row)">修改单价</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
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
    <el-dialog
      :visible.sync="visible"
      title="退货数量"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'退货数量'">
              <el-input-number v-model="num1" :min="0.1" :precision="2" :step="1" :max='max' label="请输入数量"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="价格"
      v-if="visible2"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'价格'">
              <el-input-number v-model="price1" :min="1" label="请输入价格"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="savePrice">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="success" v-show="biggest" @click="mWin(1)">最大化窗口</el-button>
      <el-button type="success" v-show="normal" @click="mWin(2)">正常窗口</el-button>
      <el-button type="primary" v-show="isAdd" @click="saveData">保存</el-button>
      <el-button type="warning" v-show="isAdd" @click="rejected">驳回</el-button>
      <el-button type="primary" v-show="isAdd" @click="audit">审核</el-button>
    </div>
  </div>
</template>

<script>
  import {updateReturns, auditOrder, Dismissed, getOrderGoodsById, alterReturn} from "@/api/indent/returns";
  import {saleInfo} from "@/api/indent/sales";
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
        num1: 1,
        max: 0,
        price1: 1,
        visible: null,
        visible2: null,
        biggest: true,
        normal: false,
        limitCount: 5,
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: true,
        loading: false,
        list: [],
        list2: [],
        type: null,
        columns2: [
          {text: "商品名称", name: "goodName"},
          {text: "编码", name: "goodCode"},
          {text: "型号", name: "standard"},
          {text: "计量单位", name: "unitOfMea"},
          {text: "单价", name: "sellPrice", default:false},
          {text: "仓库", name: "wareHouseName"},
          //{text: "数量", name: "num"},
          {text: "数量", name: "actualNum"},
        ],
        columns: [
          {text: "gid", name: "gid", default: false},
          {text: "商品名称", name: "goodName"},
          {text: "商品编码", name: "goodCode"},
          {text: "退货数量", name: "num"},
          {text: "实退数量", name: "actualNum"},
          {text: "价格", name: "sellPrice" },
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
      this.tableData(this.orderId)
      if (this.form.reOdId) {
        this.fetchData(this.form.reOdId);
      }
    },
    methods: {
      //添加数量->待确认区
      saveNum() {
        if (this.num1 > 0) {
          this.$set(this.obj, 'num', this.num1)
          this.$set(this.obj, 'siId', this.obj.siId)
          this.$set(this.obj, 'gid', this.obj.gid)
          var tList = this.list,
            number = 0,
            obj = this.obj;
          //判断添加到待确认的数据是否重复
          for (var i in tList) {
            //判断id是否== 是数量加 否添加添加一行
            if (obj['siId'] == tList[i]['siId']) {
              this.$set(tList, i, {
                ...tList[i],
                num: parseFloat(tList[i].num) + parseFloat(obj['num']),
                actualNum: parseFloat(tList[i].actualNum) + parseFloat(obj['num'])
              });
              number++;
              break;
            }
          }
          console.log(tList)
          //false
          if (number == 0) {
            this.obj["actualNum"] = this.num1
            //查询窗口插入数据
            console.log(obj)
            this.list.push(obj)
          }
          //数量添加后 数量输入框还原默认1
          this.num1 = 1;
          this.visible = false;
        } else {
          return this.$message({
            message: "不可超出可退数",
            type: "warning"
          });
        }

      },
      //添加退货
      handleAdd(val) {
        this.obj = JSON.parse(JSON.stringify(val))
        this.visible = true
        var list = this.list
        var number = 0
        for (var i in list) {
          if (list[i]['siId'] == this.obj['siId']) {
            this.max = parseInt(this.obj['actualNum']) - parseInt(list[i]['num'])
            number++;
            break;
          }
        }
        if (number == 0) {
          this.max = this.obj['actualNum']
        }
      },
      tableData(orderNum) {
        saleInfo(orderNum).then(res => {
          this.list2 = res.data
        })
      },
      //删除带确认区 单行删除
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
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
      // 修改数量
      alterNum(row) {
        this.obj = row;
        this.visible = true;
      },
      // 修改价格
      alterPrice(row) {
        this.obj = row
        this.visible2 = true
      },
      /*saveNum() {
        this.visible = false
        this.obj["actualNum"] = this.num1
        this.num1 = 1
      },*/
      savePrice() {
        updateReturns({
          returnOrderId: this.obj.oid,
          reOddId: this.obj.ogId,
          actualNum: this.obj.actualNum,
          sellPrice: this.price1,
        }).then(res => {
          if(res.flag) {
            this.visible2 = false
            this.obj["sellPrice"] = this.price1
            this.price1 = 1
            this.$emit('uploadList')
          }
        })
      },
      audit() {
        let list = this.list, array = []
        let me = this, ment
        if (list.length > 0) {
          list.some(function(v) {
            if (v.sellPrice <= 0) {
              ment = 0
              array = []
              return me.$message({
                message: "单价不能为0",
                type: "warning"
              })
            } else {
              ment = 1
              var jbj = {}
              //jbj.gid = list[i].gid
              jbj.siId = v.siId
              jbj.returnOrderId = me.form.reOdId
              jbj.sellPrice = v.sellPrice
              jbj.reOddId = v.ogId
              jbj.actualNum = v.actualNum
              array.push(jbj)
            }
          })
          if(ment == 1) {
            auditOrder(array).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        } else {
          return this.$message({
            message: "无退货商品",
            type: "warning"
          })
        }
      },
      saveData() {
            let list = this.list,
              obj = {},
              array = [];
            if (list.length > 0) {
              for (const i in list) {
                var jbj = {}
                jbj.gid = list[i].gid
                jbj.siId = list[i].siId
                jbj.number = list[i].num
                array.push(jbj)
              }
                  obj.order = {
                    orderId: this.form.oid,
                    reason: this.form.reason,
                    reOdId: this.form.reOdId,
                  }
                  obj.returnOrders = array
                  alterReturn(obj).then(res => {
                    if (res.flag) {
                      this.$emit('hideDialog', false)
                      this.$emit('uploadList')
                    }
                  })
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


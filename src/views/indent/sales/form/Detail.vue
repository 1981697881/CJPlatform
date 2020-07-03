<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'订单编号'">
            <el-input v-model="form.orderId" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下单日期'">
            <el-input v-model="form.createTime" :disabled="true"></el-input>
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
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品'">
            <el-input v-model="search" @input.native="inat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-table :data="list2.records" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
              <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns2"
                :key="i"
                :prop="t.name"
                :label="t.text"
                :width="t.width?t.width:'120px'"
                v-if="t.default!=undefined?t.default:true"
              ></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                v-show="isAdd"
                width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native="handleAdd(scope.row)">添加</el-button>
                  <el-button type="text" size="small" @click.native="handleLook(scope.row)">查看图片</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="text-center pages" v-if="list2.total && list2.total!=0">
              <el-pagination
                @size-change="handleSize"
                @current-change="handleCurrent"
                :current-page="list2.current"
                :page-sizes="[50, 100, 250, 500]"
                :page-size="list2.size"
                :page-count="list2.pages?list2.pages:0"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list2.total?list2.total:0"
              ></el-pagination>
            </div>
          </el-col>
          <el-col :span="12">
            <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
              <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                :prop="t.name"
                :label="t.text"
                :width="t.width?t.width:'120px'"
                v-if="t.default!=undefined?t.default:true"
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
        </el-row>
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
              <el-input-number v-model="num1" :precision="2" :step="1" :min="0.1" label="请输入数量"></el-input-number>
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
    <el-dialog
      :visible.sync="tpvisible"
      title="图片详情"
      v-if="tpvisible"
      :width="'40%'"
      destroy-on-close
      append-to-body
    >
      <div style="text-align: center">
        <el-upload
          action="#"
          list-type="picture-card"
          accept="png,jpg,jpeg"
          name="imgS"
          :class="{hide:hideUpload}"
          :on-preview="handlePictureCardPreview"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="success" v-show="biggest" @click="mWin(1)">最大化窗口</el-button>
      <el-button type="success" v-show="normal" @click="mWin(2)">正常窗口</el-button>
      <el-button type="primary" v-show="isAdd" @click="saveData">保存</el-button>
      <el-button type="warning" v-show="isAdd" @click.native="rejected">驳回</el-button>
      <el-button type="primary" v-show="isAdd" @click.native="audit">审核</el-button>
    </div>
  </div>
</template>

<script>
  import {saleInfo, auditOrder, Dismissed, updateSale, updateSales} from "@/api/indent/sales";
  import {stockList} from "@/api/resource/stock";
  import List from "@/components/List";
  import {
    getPer
  } from '@/utils/auth'
  export default {
    components: {
      List
    },
    props: {
      oid: {
        type: Number,
        default: null
      },
      isAdd: {
        type: Boolean,
        default: true
      },
      orderId: {
        type: String,
        default: null
      },
      createTime: {
        type: String,
        default: null
      },
      customer: {
        type: String,
        default: null
      },
      plaId: {
        type: Number,
        default: null
      },
      customerCode: {
        type: String,
        default: null
      },remark: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        num1: 1,
        visible: false,
        visible2: false,
        biggest: true,
        normal: false,
        price1: 1,
        hideUpload: true,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        tpvisible: null,
        search: '',
        form: {
          oid: null,
          orderId: null,
          remark: null,
          createTime: null,
          customer: null, // 客户名称
          customerCode: null, // 客户编号
        },
        loading: false,
        list: [],
        list2: [],
        obj: {},
        type: null,
        columns: [
          {text: "gid", name: "gid", default: false},
          {text: "siId", name: "siId", default: false},
          {text: "商品名称", name: "goodName"},
          {text: "商品编码", name: "goodCode"},
          {text: "下单数量", name: "num"},
          {text: "实发数量", name: "actualNum"},
          {text: "价格", name: "sellPrice" },
        ],
        columns2: [
          {text: "gid", name: "gid", default: false},
          {text: "siId", name: "siId", default: false},
          {text: "商品名称", name: "goodName"},
          {text: "编码", name: "goodCode"},
          {text: "型号", name: "standard"},
          {text: "计量单位", name: "unitOfMea"},
          {text: "数量", name: "num"},
          {text: "仓库", name: "wareHouseName"},
          {text: "单价", name: "price", default:false},
        ],
      };
    },
    created() {
//判断价格权限
      if(unescape(getPer('plper').replace(/\\u/gi, '%u')) === '价格') {
        for(let i in this.columns) {
          if(this.columns[i].name == 'sellPrice' ) {
            this.columns[i].default = true
          }
        }
      }
    },
    mounted() {
      this.form.oid = this.oid
      this.form.orderId = this.orderId
      this.form.customer = this.customer
      this.form.plaId = this.plaId
      this.form.remark = this.remark
      this.form.customerCode = this.customerCode
      this.form.createTime = this.createTime
      if (this.form.oid) {
        this.fetchData(this.form.oid)
        this.fetchDataStock()
      }
    },
    methods: {
      inat(value) {
        if(value.data == null) {
          setTimeout(() =>{
            this.query()
          },500);
        }else{
          if(value.data.replace(/\s+/g, "") != "") {
            this.search = value.data
            setTimeout(() =>{
              this.query()
            },500);
          }
        }
      },
      handleAdd(val) {
        this.num1 = 1;
        this.obj = JSON.parse(JSON.stringify(val))
        this.alter = false
        this.visible = true
      },
      //查看图片
      handleLook(val) {
        let imgArray = val.img.split(',');
        if (imgArray.length > 0 && val.img != "") {
          //判断图片是否为空
          this.tpvisible = true;
          if (this.fileList.length > 0) {
            this.fileList[0].url = 'http://120.78.168.141:8090/web' + imgArray[0];
          } else {
            this.fileList = []
            this.fileList.push({
              url: 'http://120.78.168.141:8090/web' + imgArray[0]
            })
          }
        } else {
          return this.$message({
            message: "无图片",
            type: "warning"
          });
        }
      },
      //修改数量
      alterNum(row) {
        this.num1 = row['num'];
        this.alter = true;
        this.obj = row;
        this.visible = true;
        console.log(this.obj)
      },
      //添加数量->待确认区
      saveNum() {
        if (!this.alter) {
          this.$set(this.obj, 'num', this.num1);
          var list = this.list,
            number = 0,
            obj = this.obj;
          //判断添加到待确认的数据是否重复
          for (var i in list) {
            if (obj['siId'] == list[i]['siId']) {
              this.$set(list, i, {...list[i], num: parseFloat(list[i].num) + parseFloat(obj['num'])});
              this.$set(list, i, {...list[i], actualNum: parseFloat(list[i].actualNum) + parseFloat(obj['num'])});
              number++;
              break;
            }
          }
          //false
          if (number == 0) {
            //查询窗口插入数据
            this.obj["actualNum"] = this.num1
            this.list.push(obj)
          }
        } else {
          this.$set(this.obj, 'actualNum', this.num1);
        }
        this.num1 = 1;
        this.visible = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      query() {
        this.list.current = 1;
        this.fetchDataStock();
      },
      //监听每页显示几条
      handleSize(val) {
        this.list2.size = val
        this.fetchDataStock();
      },
      //监听当前页
      handleCurrent(val) {
        this.list2.current = val;
        this.fetchDataStock();
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
     /* //修改数量
      alterNum(row) {
        this.obj = row
        this.visible = true
      },*/
      //修改价格
      alterPrice(row) {
        this.obj = row
        this.visible2 = true
      },
     /* saveNum() {
        this.visible = false
        this.obj["actualNum"] = this.num1
        this.num1 = 1
      },*/
      savePrice() {
        updateSale({
          oid: this.obj.oid,
          ogId: this.obj.ogId,
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
      saveData() {
            let obj = {}, list = this.list
            obj.plaId = this.plaId
            let array = []
            if (list.length > 0) {
              for (const i in list) {
                var jbj = {}
                jbj.gid = list[i].gid
                jbj.siId = list[i].siId
                jbj.num = list[i].num
                array.push(jbj)
              }
                obj.oid = this.oid
                obj.remark = this.form.remark
                obj.orderGoods = array
                updateSales(obj).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                });
            } else {
              return this.$message({
                message: "无数据",
                type: "warning"
              });
            }
      },
      audit() {
        let list = this.list, array = []
        let me = this, ment
        if (list.length > 0) {
         /* for (const i in list) {*/
          list.some(function(v) {
           if(v.sellPrice <= 0) {
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
             jbj.oid = me.form.oid
             jbj.actualNum = v.actualNum
             array.push(jbj)
           }
          })
          if(ment == 1){
            auditOrder(array).then(res => {
              me.$emit('hideDialog', false)
              me.$emit('uploadList')
            })
          }
        } else {
          return me.$message({
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
              id: this.form.oid,
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
      fetchDataStock(val) {
        this.loading = true;
        const data = {
          //wid: this.form.wid || '',
          pageNum: this.list2.current || 1,
          pageSize: this.list2.size || 50
        };
        const obj = { plaId: this.plaId }
        this.search != '' ? obj.goodName = this.search : null
        stockList(data, obj).then(res => {
          if (res.flag) {
            this.loading = false
            this.list2= {
              current: res.data.current,
              pages: res.data.pages,
              size: res.data.size,
              total: res.data.total,
              records: res.data.records
            }
          }
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

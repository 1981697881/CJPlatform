<template>
  <div class="list-main">
     <el-table :height="height" :data="list.records" border size="mini" :highlight-current-row="true" >
      <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"

        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:''"
      ></el-table-column>
       <el-table-column label="操作" align="center">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">查看图片</el-button>
         </template>
       </el-table-column>
    </el-table>
    <div class="text-center pages" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="图片详情"
      v-if="visible"
      :width="'40%'"
      destroy-on-close

    >
      <div style="text-align: center">
        <el-upload
          action="web/file/Goods/imgUpload"
          list-type="picture-card"
          accept="png,jpg,jpeg"
          :headers="headers"
          :data="imgData"
          name="imgS"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :class="{hide:hideUpload}"
          :on-preview="handlePictureCardPreview"
          :on-change="handleChange"
          :file-list="fileList"
          ref="upload"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"  append-to-body >
          <img width="100%"  :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    <!--  <div slot="footer" style="text-align:center">
        <el-button @click.native="submitUpload">上传</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
import { mapGetters } from "vuex";
import { commodityList ,alterCommodity,delImg} from "@/api/resource/commodity";
import {
    getToken
} from '@/utils/auth'
export default {
  computed: {
    ...mapGetters(["node"])
  },
    props: {
        //是否自定义高度 默认100%
        height:{
            type:String,
            default:"100%"
        },
    },
  data() {
    return {
        headers:{
            'authorization': getToken('rx'),
        },
        imgData:{
            gid:null
        },
      query: null,
      prId: null,
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        visible:null,
        fileList: [],
      loading: false,
        limitCount:3,
      list: {},
      type: null,
      columns: [
        { text: "gid", name: "gid" ,default:false},
          { text: "商品编码", name: "goodCode" },
        { text: "商品名称", name: "goodName" },
        { text: "规格型号", name: "standard" },
        { text: "单位", name: "unitOfMea" },
      ]
    };
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.fetchData();
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
          this.fetchData();
      },
      handleChange(file, fileList){
          this.hideUpload = fileList.length >= this.limitCount;
      },
      uploadFile(file){
          this.formDate.append('imgS', file.file);
      },
      //批量上传图片
      submitUpload() {
          this.formDate = new FormData();
          this.$refs.upload.submit();
          this.formDate.append('gid', this.imgData.gid);
          let config = {
              headers: {
                  'authorization': getToken('rx'),
                  'Content-Type': 'multipart/form-data'
              }
          }
          console.log(this.formDate)
          axios.post("/web/file/Goods/imgUpload", this.formDate,config).then(res => {
              if(res.data.flag){
                this.visible=false;
                  this.$message({
                      message: res.msg,
                      type: "success"
                  });
                  this.$emit('uploadList')
              }
          }).catch( res => {
              console.log(res)
          })

      },
      handleEdit(index,row){
          this.hideUpload = false;
          this.visible = true;
          this.imgData.gid=row.gid;
          this.fileList=[];
          if(row.img != ''&& row.img!=null){
              let imgArray=row.img.split(',');
              if(imgArray.length>0){
                  if(imgArray.length>=3){
                      this.hideUpload = true;
                  }else{
                      this.hideUpload = false;
                  }
                  this.fileList=[]
                  for(let i in imgArray){
                      this.fileList.push({
                          url:'http://120.78.168.141:8091/web'+imgArray[i]
                      })
                  }
              }else{
                  this.fileList = [];
              }
          }
         /* if(row.img){
              if(this.fileList.length>0){
                  this.fileList[0].url = 'http://120.78.168.141:8091'+row.img;
              }else{
                  this.fileList=[]
                  this.fileList.push({
                      url:'http://120.78.168.141:8091'+row.img
                  })
              }
          }else{
              this.fileList = [];
          }*/
          console.log(this.fileList)
      },
      uploadError(res,file){
          this.$message({
              message: res.msg,
              type: "warning"
          });
          this.$emit('uploadList')
      },
      uploadSuccess(res,file,fileList){
          file.url='http://120.78.168.141:8091/web/good/img/'+res.data;
          this.$message({
              message: res.msg,
              type: "success"
          });
          this.$emit('uploadList')
      },
      handleRemove(file, fileList) {
          var val = file.url.split('http://120.78.168.141:8091/web/good/img/')[1]
          console.log(val)
          this.loading = true;
          delImg({
              gid:this.imgData.gid,
              img:val
          }).then(res => {
              this.$message({
                  message: res.msg,
                  type: "success"
              });
              if(res.flag){
                  this.hideUpload = fileList.length >= this.limitCount;
                  this.$emit('uploadList')
                  this.loading = false;
                  //this.visible=false;
              }
          });
      },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
      },
    uploadPr(val) {
        console.log(val)
      this.prId = val.plaId
      this.query = val.query
      this.fetchData();
    },
    fetchData(val) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
        query: val || '',
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      let obj = {}
      this.prId != null || this.prId != undefined ? obj.plaId = this.prId : null
      this.query != null || this.query != undefined ? obj.query = this.query : null
        commodityList(data, obj).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>
<style lang="scss" >
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>

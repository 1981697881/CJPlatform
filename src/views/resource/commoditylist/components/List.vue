<template>
  <div>
     <el-table class="list-main" :data="list.records" border size="mini" :highlight-current-row="true" >
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
          action="/file/Goods/imgUpload"
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
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { commodityList ,alterCommodity} from "@/api/resource/commodity";
import List from "@/components/List";
import {
    getToken
} from '@/utils/auth'
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
        headers:{
            'authorization': getToken('rx'),
        },
        imgData:{
            gid:null
        },
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        visible:null,
        fileList: [],
      loading: false,
        limitCount:1,
      list: {},
      type: null,
      columns: [
        { text: "gid", name: "gid" ,default:false},
          { text: "商品编码", name: "goodCode" },
        { text: "商品名称", name: "goodName" },
        { text: "规格型号", name: "model" },
        { text: "单位", name: "unitOfMea" },
      ]
    };
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.fetchData(this.node.data.fid,this.node.data.type);
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
          this.fetchData(this.node.data.fid,this.node.data.type);
      },
      handleChange(file, fileList){
          this.hideUpload = fileList.length >= this.limitCount;
      },
      handleEdit(index,row){
          this.hideUpload = false;
          this.visible = true;
          this.imgData.gid=row.gid;
          if(row.img){
              this.hideUpload = true;
              if(this.fileList.length>0){
                  this.fileList[0].url = 'http://test.gzfzdev.com:8080'+row.img;
              }else{
                  this.fileList=[]
                  this.fileList.push({
                      url:'http://test.gzfzdev.com:8080'+row.img
                  })
              }
          }else{
              this.fileList = [];
          }
          console.log(this.fileList)
      },
      uploadError(res){
          this.$message({
              message: res.msg,
              type: "warning"
          });
          this.$emit('uploadList')
      },
      uploadSuccess(res){
          console.log(123)
          this.$message({
              message: res.msg,
              type: "success"
          });
          this.$emit('uploadList')
      },
      handleRemove(file, fileList) {
          this.loading = true;
          alterCommodity({
              gid:this.imgData.gid,
              img:''
          }).then(res => {
              this.$message({
                  message: res.msg,
                  type: "success"
              });
              if(res.flag){
                  this.hideUpload = fileList.length >= this.limitCount;
                  this.$emit('uploadList')
                  this.loading = false;
                  this.visible=false;
              }
          });
      },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
      },
    fetchData(fid, type) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
        commodityList(data).then(res => {
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

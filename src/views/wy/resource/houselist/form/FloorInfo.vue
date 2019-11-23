<template>
  <el-form ref="form" v-model="form" label-width="100px" :size="'mini'">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="楼层名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼层编号">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="所属区域">
          <el-input v-model="form.prId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="物业类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="可租面积">
          <el-input v-model="form.rentArea"></el-input>
          房屋建筑面积合计：<span style="color:rgba(255, 0, 0, 1);margin-right:20px;">{{form.area || 753.17}} </span>
          房屋计费面积合计：<span style="color:rgba(255, 0, 0, 1);">{{form.area || 753.17}} </span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="附加说明">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getFloorById ,saveBuildFloor} from "@/api/wy/resource/houseslist";
export default {
  props: {
    fid: {
      type: Number,
      default: null
    },
    prId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        fid:null,
        prId:this.prId,// 上级Id
        name:null,// 楼层名称
        code:null,// 楼层编号
        type:null,// 物业类型
        rentArea:null,// 可租面积
        remark:null,// 附加说明
        
      },
    };
  },
  mounted() {
    if (this.fid) this.fetchData(this.fid);
  },
  methods:{
    saveData(){
      saveBuildFloor(this.form).then(res=>{
        
      })
    },
    fetchData(val){
      getFloorById(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>

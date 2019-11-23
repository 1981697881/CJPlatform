<template>
  <el-form ref="form" :model="form" label-width="100px" :size="'mini'">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="楼阁名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼阁编号">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="占地面积">
          <el-input v-model="form.coverArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼高">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="物业接盘日期">
          <el-date-picker
            v-model="form.flangeDate"
            class="width-full"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="楼宇管家">
          <el-input v-model="form.steward"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="管家联系电话">
          <el-input v-model="form.phone"></el-input>
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

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="自定义项目">
          <el-table :data="form.customPros" border style="width: 100%" size="mini" height="300px">
            <el-table-column :prop="'name'" :label="'项目名称'"></el-table-column>
            <el-table-column :prop="'content'" :label="'项目内容'"></el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getTowerById ,saveBuildTower} from "@/api/wy/resource/houseslist";
export default {
  props: {
    fid:{
      type:Number,
      default:null
    },
    prId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        fid: this.fid,
        prId: this.prId, // 上级Id
        name: null, // 楼层名称
        code: null, // 楼层编号
        type: null, // 物业类型
        rentArea: null, // 可租面积
        remark: null, // 附加说明
        customPros: [
          // 自定义项目
          {
            name: null,// 项目名称
            content: null// 项目内容
          }
        ]
      },
    };
  },
  mounted() {
    if (this.fid) this.fetchData(this.fid);
  },
  methods: {
    saveData(){
      saveBuildTower(this.form).then(res=>{
        
      })
    },
    fetchData(val) {
      getTowerById(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>

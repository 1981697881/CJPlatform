<template>
  <el-form ref="form" :model="form" label-width="80px" :size="'mini'">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="所属机构">
          <el-input v-model="form.deptId"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="楼盘编号">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="楼盘名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="楼盘业务">
          <el-select class="width-full" v-model="form.business" placeholder="请选择楼盘业务">
            <el-option label="暂无" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <!-- <el-form-item label="楼盘业务">
          <el-row>
            <el-col :span="12">
              <el-select class="width-full" v-model="form.region" placeholder="请选择楼盘业务">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select class="width-full" v-model="form.region" placeholder="请选择楼盘业务">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>-->
      </el-col>
      <el-col :span="24">
        <el-form-item label="楼盘地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="占地面积">
          <el-input v-model="form.coverArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="建筑面积">
          <el-input v-model="form.totalArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="地上面积">
          <el-input v-model="form.floorUpArea"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="地下面积">
          <el-input v-model="form.floorDownArea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总户数">
          <el-input v-model="form.totalUnits"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="容积率">
          <el-input v-model="form.volumeRate"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="开发单位">
          <el-input v-model="form.developers"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="楼盘简介">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getBuildById, saveBuild,saveEstate } from "@/api/wy/resource/houseslist";

export default {
  props: {
    fid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        fid: this.fid,
        deptId: null, // 隶属机构
        name: null, // 楼盘名称
        code: null, // 楼盘编号
        business: null, // 楼盘业务
        address: null, // 项目地址
        totalArea: null, // 总建筑面积
        coverArea: null, // 占地面积
        floorUpArea: null, // 地上面积
        floorDownArea: null, // 地下面积
        totalUnits: null, // 总户数
        volumeRate: null, // 容积率
        developers: null, // 开发单位
        contact: null, // 联系人
        phone: null, // 联系电话
        remark: null, // 楼盘简介
        list:[]
      }
    };
  },
  watch: {
    code(val) {
      return this.$emit("handlerCode", val);
    },
    id(val) {
      console.log(val);
    }
  },
  computed: {
    code() {
      return this.form.code;
    }
  },
  mounted() {
    this.$emit("handlerCode", this.code);
    if (this.fid) this.fetchData(this.fid);
  },
  methods: {
    saveData(builds) {
      if (builds) {
        this.form.list = builds
        console.log(this.form)
        saveEstate(this.form).then(res=>{
          console.log(res)
        }) 
      } else {
        saveBuild(this.form)
      }
    },
    fetchData(val) {
      getBuildById(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <div class>
    <el-form ref="form" :model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="房间名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业类型">
            <el-select v-model="form.proType" class="width-full">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in proTypeFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间编号">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房屋状态">
            <el-select v-model="form.status" class="width-full">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in statusFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="建筑面积">
            <el-input v-model="form.buildArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="套内面积">
            <el-input v-model="form.withinArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实用面积">
            <el-input v-model="form.actualArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计费面积">
            <el-input v-model="form.costArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="隶属上级">
            <!-- <el-select v-model="form.prId" class="width-full">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in prIdFormat" :key="i"></el-option>
            </el-select> -->
            <el-input v-model="form.floorId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业用途">
            <el-input v-model="form.propertyUse"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间全称">
            <el-input v-model="form.fullName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="图片">
            <el-input v-model="form.img" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="户型">
            <el-select v-model="form.tenantType" class="width-full">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="朝向">
            <el-select v-model="form.faceTo" class="width-full">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="起租日期">
            <el-date-picker
              v-model="form.rentTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月租金">
            <el-input v-model="form.rent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="购入日期">
            <el-date-picker
              v-model="form.buyDate"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="售出日期">
            <el-date-picker
              v-model="form.saleDate"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收楼日期">
            <el-date-picker
              v-model="form.recycleTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入伙日期">
            <el-date-picker
              v-model="form.joinTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="说明">
            <el-input v-model="form.explain"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getUnitById, saveBuildUnit } from "@/api/wy/resource/houseslist";

import { generalFormat, floorFormat } from "@/api/wy/format";

export default {
  props: {
    id: null,
    prId: null
  },
  data() {
    return {
      proTypeFormat: [],
      statusFormat: [],
      prIdFormat: [],
      form: {
        name: null,
        proType: null,
        code: null,
        status: null,
        buildArea: null,
        withinArea: null,
        actualArea: null,
        costArea: null,
        prId: null,
        propertyUse: null,
        fullName: null,
        disabled: null,
        tenantType: null,
        faceTo: null,
        rentTime: null,
        rent: null,
        buyDate: null,
        saleDate: null,
        recycleTime: null,
        joinTime: null,
        explain: null,
        floorId:null
      }
    };
  },
  created() {
    this.fetchFormat();
  },
  mounted() {
    if (this.id) {
      this.fetchData(this.id);
    } 
  },
  methods: {
    subForm() {
      saveBuildUnit(this.form).then(res => {
        if (res.status == 0) {
          this.$message({
            message: res.msg || "操作成功",
            type: "success"
          });
          this.$emit("subSucces");
        }
      });
    },
    fetchFormat() {
      generalFormat("物业类型", "单元表").then(res => {
        this.proTypeFormat = res.data;
      });
      generalFormat("状态", "单元表").then(res => {
        this.statusFormat = res.data;
      });
    },
    fetchData(val) {
      getUnitById(val).then(res => {
        this.form = res.data;
        // 楼层下拉需要prid所以先请求房间
        /* floorFormat(this.form.prId).then(res => {
          this.prIdFormat = res.data;
        }); */
      });
    }
  }
};
</script>

<style scoped>
</style>

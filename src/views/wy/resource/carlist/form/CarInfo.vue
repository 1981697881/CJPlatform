<template>
  <div>
    <el-form :model="form" :label-width="'110px'" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'销售状态'">
            <el-select v-model="form.saleStatus" class="width-full">
              <el-option
                :value="item[0]"
                v-for="item in saleStatusFormat"
                :key="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'预售面积'">
            <el-input v-model="form.preSaleArea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'销售总价'">
            <el-input v-model="form.preSaleTotal" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'车位类型'">
            <el-select v-model="form.type" class="width-full">
              <el-option
                :value="item[0]"
                v-for="item in typeFormat"
                :key="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'车位性质'">
            <el-select v-model="form.nature" class="width-full">
              <el-option
                :value="item[0]"
                v-for="item in natureFormat"
                :key="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'车位状态'">
            <el-select v-model="form.status" class="width-full">
              <el-option
                :value="item[0]"
                v-for="item in statusFormat"
                :key="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'车位名称'">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'车位编号'">
            <el-input v-model="form.code" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'附加说明'">
            <el-input v-model="form.remark" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'车位面积'">
            <el-input v-model="form.area" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'计费面积'">
            <el-input v-model="form.billingArea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'面积规格'">
            <el-row :gutter="5">
              <el-col :span="8">
                <el-input v-model="form.length" />
              </el-col>
              <el-col :span="2">米</el-col>
              <el-col :span="8">
                <el-input v-model="form.wide" />
              </el-col>
              <el-col :span="2">米</el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { generalFormat } from "@/api/format";
import { mapGetters } from "vuex";
import {
  getSpaceById,
  saveSpace,
  updateSpaceBase
} from "@/api/wy/resource/carlist";
export default {
  data() {
    return {
      form: {
        fid: null,
        garageId: null,
        saleStatus: null, //销售状态
        preSaleArea: null, //预售面积
        preSaleTotal: null, //销售总价
        type: null, //车位类型
        nature: null, //车位性质
        status: null, //车位状态
        name: null, //车位名称
        code: null, //车位编号
        remark: null, //附加说明
        area: null, //车位面积
        billingArea: null, //计费面积
        length: null, //面积规格 - 长
        wide: null //面积规格 - 宽
      },
      saleStatusFormat: [], //销售下拉
      typeFormat: [], //车位类型下拉
      natureFormat: [], //车位性质下拉
      statusFormat: [] //车位状态下拉
    };
  },
  computed: {
      ...mapGetters(["clickData"]),
    dblData() {
      return this.$store.getters["dblData"];
    }
  },
  created() {
    this.fetchFormat();
  },
  mounted() {
    this.form["garageId"] = this.$store.getters.node.data.fid;
    if (this.dblData["fid"] != null || this.clickData["fid"] != null) {
      this.fetchData(this.dblData["fid"]?this.dblData["fid"]:this.clickData["fid"]);
    }
  },
  methods: {
    saveData() {
      if (this.form.fid == "" || this.form.fid == null) {
        saveSpace(this.form).then(res => {
          if (res.status == 0) {
            this.$emit("close-dialog");
          }
        });
      } else {
        updateSpaceBase(this.form).then(res => {
          if (res.status == 0) {
            this.$emit("close-dialog");
          }
        });
      }
    },
    StringToNum(data){
        let d = data;
        d.forEach((t, i) => {
          t[0] = Number(t[0]); // 需要把下拉的key转换为数字
        });
        return d
    },
    fetchFormat() {
      generalFormat("销售状态", "车位表").then(res => {
        this.saleStatusFormat = this.StringToNum(res.data);
      });
      generalFormat("车位类型", "车位表").then(res => {
        this.typeFormat = this.StringToNum(res.data);
      });
      generalFormat("车位性质", "车位表").then(res => {
        this.natureFormat = this.StringToNum(res.data);
      });
      generalFormat("车位状态", "车位表").then(res => {
        this.statusFormat = this.StringToNum(res.data);
      });
    },
    fetchData(fid) {
      const data = {
        fid: fid
      };
      getSpaceById(data).then(res => {
        for (let key in res.data) {
          // 在form找出与dblData同样的字段并赋值
          if (typeof this.form[key] != "undefined") {
            this.form[key] = res.data[key];
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
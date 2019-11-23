<template>
  <div>
    <div class="tabs" style="text-align:right;">
      <el-button-group>
        <el-button :size="'mini'" type="primary" @click="saveData">退租</el-button>
        <el-button :size="'mini'" type="primary">打印</el-button>
      </el-button-group>
    </div>
    <h2 class="text-center" style="color:green">租赁合同退租</h2>
    <el-form :model="form" :label-width="'110px'" :size="'mini'" ref="ruleForm">
      <div class="box-shadow mini-padding">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'合同编号'">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'租赁形式'">
              <el-input v-model="form.type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'退租'">
              <el-radio-group v-model="form.termination">
                <el-radio :label="1" size="mini">到期终止</el-radio>
                <el-radio :label="2" size="mini">提前终止</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'签约日期'">
              <el-date-picker
                v-model="form.signTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'合同起始时间'">
              <el-date-picker
                v-model="form.startTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'合同终止时间'">
              <el-date-picker
                v-model="form.endTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'起租日期'">
              <el-date-picker
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'进场日期'">
              <el-date-picker
                v-model="form.approachTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'开业日期'">
              <el-date-picker
                v-model="form.openTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'租户名称'">
              <el-input v-model="form.customerId" v-show="false" />
              <el-input readonly style="width:70%" v-model="customer" />
              <el-button icon="el-icon-search" @click="showCustomer" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'租户简称'">
              <el-input v-model="form.lesseename" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'状态'">
              <el-select v-model="form.status" disabled placeholder="请选择">
                <el-option :label="'当前合同(已启用)'" :value="1"></el-option>
                <el-option :label="'预定合同(未启用)'" :value="2"></el-option>
                <el-option :label="'到期合同(终止)'" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'租户编号'">
              <el-input v-model="form.lesseecode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'租户编号类别'">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'联系电话'">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-table
          :data="houseData"
          class="box-shadow"
          :style="{'margin-bottom':'20px'}"
          ref="housesTable"
        >
          <el-table-column :prop="'fid'" :label="''" :align="'center'" v-if="false"></el-table-column>
          <el-table-column :prop="'unitCode'" :label="'单元编号'" :align="'center'"></el-table-column>
          <el-table-column :prop="'text'" :label="'单元名称'" :align="'center'"></el-table-column>
          <el-table-column :prop="'buildArea'" :label="'建筑面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'costArea'" :label="'计费面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'purpose'" :label="'租赁用途'" :align="'center'"></el-table-column>
        </el-table>

        <el-tabs v-model="activeName" type="border-card" style="margin-bottom:20px;">
          <el-tab-pane name="1" :label="'退租资料'">
            <el-form-item :label="'合同实际结束日期'">
              <el-date-picker
                v-model="form.actualEndTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="'办理日期'">
                  <el-date-picker
                    v-model="form.handleTime"
                    class="width-full"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'经手人'" required>
                  <el-select v-model="form.handlers" filterable placeholder="请选择">
                    <el-option
                      v-for="item in userFormat"
                      :key="item[0]"
                      :label="item[1]"
                      :value="item[0]"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="'退租说明'">
              <el-input type="textarea" v-model="form.exitRemark" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" :label="'退租验收'"></el-tab-pane>
          <el-tab-pane name="3" :label="'应收未收'"></el-tab-pane>
          <el-tab-pane name="4" :label="'应付未付'"></el-tab-pane>
        </el-tabs>
      </div>

      <customer ref="customer" @click="selectCustomer" />
    </el-form>
  </div>
</template>

<script>
import { getRentContract, saveRentContract } from "@/api/sy/lease/leaselist";
import { userFormat } from "@/api/format";
import { Customer } from "@/components/Dialog";

export default {
  components: {
    Customer
  },
  data() {
    return {
      activeName: "1",

      form: {
        fid: null,
        status: 1, //原合同状态
        code: null, //合同编号

        type: null, //租赁形式
        termination: 1, //退租
        approachTime: null, //进场日期
        openTime: null, //开业日期
        actualEndTime: null, //合同实际结束日期
        handleTime: null, //办理日期
        handlers: null, //经手人
        exitRemark: null, //退租说明

        startTime: null, //合同起始时间
        endTime: null, //合同终止时间
        signTime: null, //签约日期
        customerId: null, //客户Id
        customerName: null, //租户名称
      },
      houseData: [],
      userFormat: [], //用户下拉
      customer: "" //租户名称
    };
  },
  computed: {
    clickData() {
      return this.$store.getters["clickData"];
    },
    dblData() {
      return this.$store.getters["dblData"];
    },
    st() {
      // 取出form里面的startTime字段并且watch监听他们
      return this.form.startTime;
    },
    et() {
      // 取出form里面的endTime字段并且watch监听他们
      return this.form.endTime;
    }
  },
  watch: {
    st(val) {
      //将val转换成Date类型
      let date = new Date(val);
      const startTime = date.getTime(); // 获取时间轴
      const endTtime = this.et ? new Date(this.et).getTime() : null;
      let dateDiff = endTtime - startTime; //计算出相差天数
      let mo = Math.floor(dateDiff / (24 * 3600 * 1000));
      this.form.timeLimit = Math.floor(mo >= 30 ? mo / 30 : 0) + "个月"; // 转换为数字
    },
    et(val) {
      let date = new Date(val);
      const endTtime = date.getTime(); // 获取时间轴
      const startTime = this.st ? new Date(this.st).getTime() : null;
      let dateDiff = endTtime - startTime; //计算出相差天数
      let mo = Math.floor(dateDiff / (24 * 3600 * 1000));
      this.form.timeLimit = Math.floor(mo >= 30 ? mo / 30 : 0) + "个月"; // 转换为数字
    }
  },
  created() {
    this.fetchFormat();
  },
  mounted() {
    if (this.clickData["fid"] != null) {
      this.fetchData();
      //将表格数据绑定到form
      for (let key in this.clickData) {
        // 在form找出与dblData同样的字段并赋值
        if (typeof this.form[key] != "undefined") {
          this.form[key] = this.clickData[key];
        }
      }
      this.form.termination = 1;
    }
  },
  methods: {
    
    saveData() {
      delete this.form['customerName']
      let nd = [];
              this.houseData.map((val, index) => {
                nd.push({
                  unitId: val.fid,
                  way: val.way,
                  contractId: val.contractId,
                  creator: val.creator,
                  createTime: val.createTime,
                  editor: val.editor,
                  updateTime: val.updateTime
                });
              });
              this.form.rentUnitList = nd.length != 0 ? nd : null;
      if (this.form.handlers != null) {
        saveRentContract(this.form).then(res=>{
          console.log(res)
        })
      } else {
        this.$message({
          message: "请选择经手人",
          type: "warning"
        });
      }
    },
    //选择客户
    selectCustomer(data) {
      this.form.customerId = data.fid;
      this.customer = data.name;

      this.$refs["customer"].handlerVisible(false);
    },
    //显示客户弹窗
    showCustomer() {
      this.$refs["customer"].handlerVisible(true);
    },
    fetchFormat() {
      userFormat().then(res => {
        let d = res.data;
        d.forEach((t, i) => {
          t[0] = Number(t[0]); // 需要把下拉的key转换为数字
        });
        this.userFormat = d;
      });
    },
    fetchData() {
      this.houseData = [];
      getRentContract({ contractId: this.clickData["fid"] }).then(res => {
        res.data.map((val, index) => {
          this.houseData.push({
            fid: val.fid,
            unitCode: val.unitCode,
            name: val.name,
            buildArea: val.buildArea,
            costArea: val.costArea,
            purpose: val.purpose
          });
        });
      });
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <div>
    <div class="tabs" style="text-align:right;">
      <el-button-group>
        <el-button :size="'mini'" type="primary" @click="saveData">保存</el-button>
        <el-button :size="'mini'" type="primary">打印</el-button>
      </el-button-group>
    </div>
    <h2 class="text-center" style="color:green">租赁合同续租</h2>
    <el-form :model="form" :label-width="'110px'" :size="'mini'" ref="ruleForm">
      <div class="box-shadow mini-padding">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'签约日期'" required>
              <el-date-picker
                v-model="form.signTime"
                class="width-full"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'合同编号'">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'原合同编号'">
              <el-input v-model="form.rawCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'原合同状态'">
              <el-select v-model="form.status" disabled placeholder="请选择">
                <el-option :label="'当前合同(已启用)'" :value="1"></el-option>
                <el-option :label="'预定合同(未启用)'" :value="2"></el-option>
                <el-option :label="'到期合同(终止)'" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item :label="'租户名称'" required>
              <el-input v-model="form.customerId" v-show="false" />
              <el-input readonly style="width:90%" v-model="customer" />
              <el-button icon="el-icon-search" @click="showCustomer" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button :size="'mini'" class="width-full" type="warning">其他合同</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item>新合同资料(续租后系统产生一份新的预定合同)</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-checkbox>立即启用</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
          <el-col :span="8">
            <el-form-item :label="'租赁期限'">
              <el-input v-model="form.timeLimit" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="'合同备注'">
          <el-input type="textarea" v-model="form.remark" />
        </el-form-item>
        <el-table
          :data="houseData"
          class="box-shadow"
          :style="{'margin-bottom':'20px'}"
          ref="housesTable"
        >
          <el-table-column label="租赁房屋列表" :align="'center'">
            <el-table-column>
              <el-button-group slot="header" style="float:right">
                <el-button :size="'mini'" type="primary" @click="showHouses">添加</el-button>
                <el-button :size="'mini'" type="primary" @click.native="handlerTableTab">资料</el-button>
                <el-button :size="'mini'" type="primary" @click.native="handlerTableTab">设置</el-button>
              </el-button-group>
              <el-table-column :prop="'fid'" :label="''" :align="'center'" v-if="false"></el-table-column>
              <el-table-column :prop="'unitCode'" :label="'单元编号'" :align="'center'"></el-table-column>
              <el-table-column :prop="'text'" :label="'单元名称'" :align="'center'"></el-table-column>
              <el-table-column :prop="'buildArea'" :label="'建筑面积'" :align="'center'"></el-table-column>
              <el-table-column :prop="'costArea'" :label="'计费面积'" :align="'center'"></el-table-column>
              <el-table-column :prop="'purpose'" :label="'租赁用途'" :align="'center'"></el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="delHouses(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <el-tabs v-model="activeName" type="card" style="margin-top:10px">
        <el-tab-pane label="业务资料" name="1">
          <el-form-item :label="'转租经办人'" required>
            <el-select v-model="form.agent" filterable placeholder="请选择">
              <el-option
                v-for="item in userFormat"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'续租办理日期'">
            <el-date-picker
              v-model="form.refreshRentDate"
              class="width-full"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="'续租说明'">
            <el-input type="textarea" v-model="form.refreshRentRemark" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="合同其他资料" name="2">合同其他资料</el-tab-pane>
        <el-tab-pane label="应收列表" name="3">应收列表</el-tab-pane>
      </el-tabs>
      <customer ref="customer" @click="selectCustomer" />
      <houses ref="houses" @click="selectHouses" />
    </el-form>
  </div>
</template>

<script>
import { getRentContract, saveRentContract } from "@/api/sy/lease/leaselist";
import { userFormat } from "@/api/format";
import { Customer, Houses } from "@/components/Dialog";

export default {
  components: {
    Customer,
    Houses
  },
  data() {
    return {
      activeName: "1",
      form: {
        fid: null,
        rawCode: null, // 原合同编号
        categoryId: null, //租赁类型
        status: 1, //原合同状态
        code: null, //合同编号
        startTime: null, //合同起始时间
        endTime: null, //合同终止时间
        signTime: null, //签约日期
        timeLimit: null, //租赁期限
        remark: null, //合同备注
        customerId: null, //客户Id
        source: "2", //合同来源 1.新签2.续租3.转租4.变更
        agent: null, //转租经办人
        refreshRentDate: null, //续租办理日期
        refreshRentRemark: null, //续租说明
        classify:null,
        nullName: null // {{后台没有给字段}}
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
      this.form["rawCode"] = this.clickData["code"];
      //this.form["rawTime"] = this.clickData["signTime"];
      //this.form["rawCustomerName"] = this.clickData["customerName"];

      this.customer = this.clickData['customerName']

      this.form.source = 2;
    }
  },
  methods: {
    saveData() {
      if (!this.form.signTime || !this.form.customerId || !this.form.agent) {
        return this.$message({
          message: "请将必填字段填写完整",
          type: "warning"
        });
      }
      if (this.houseData.length != 0) {
        let nd = [];
        let f = this.form;
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

        // 空字段删除
        for (let key in f) {
          if (f[key] == "" || f[key] == null) {
            delete f[key];
          }
        }
        delete f["timeLimit"];
        delete f['rawCode']
        //添加必备的字段
        if (typeof this.form["fid"] == "undefined") {
          this.form.fid = "";
        }
        console.log(this.form)
        this.form.contractId = String(this.form.fid);

        saveRentContract(this.form).then(res => {
          console.log(res);
          if (res.status == 0) {
            console.log(this);
          }
        });
      } else {
        this.$message({
          message: "请添加至少一条房产！",
          type: "error"
        });
      }
    },
    //选择房产
    selectHouses(data) {
      console.log(data);
      let hd = this.houseData;
      let fids = [];
      //fid去重
      const fidRilter = ({ fid }) => {
        //{fid} => 传入的obj中的字段["fid"] == data[num].fid
        let bool = true;
        hd.map((obj, index) => {
          if (obj.fid == fid) bool = false;
        });
        return bool;
      };
      for (let num in data) {
        // 插入表格data
        if (fidRilter(data[num])) {
          hd.push(data[num]);
        }
      }
      this.$refs["houses"].handlerVisible(false);
    },
    //选择客户
    selectCustomer(data) {
      this.form.customerId = data.fid;
      this.customer = data.name;

      /* let f = this.form,
        d = data;
      f.lesseecode = d.code;
      f.lesseename = d.name;
      f.linkman = d.linkman;
      f.phone = d.phone;
      f.mobPhone = d.mobPhone;
      f.IDnumber = d.idCard;
      f.isLessee = d.isLessee;
      f.commercialActivities = d.commercialActivities;
      f.legalPerson = d.legalPerson; */

      this.$refs["customer"].handlerVisible(false);
    },
    //删除选中的数组
    delHouses(index, row) {
      this.houseData.splice(index, 1);
    },
    //显示房产弹窗
    showHouses() {
      this.$refs["houses"].handlerVisible(true);
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

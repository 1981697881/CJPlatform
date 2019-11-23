<template>
  <div>
    <div class="tabs" style="text-align:right;">
      <el-button-group>
        <el-button :size="'mini'" type="primary">保存</el-button>
        <el-button :size="'mini'" type="primary">打印</el-button>
      </el-button-group>
    </div>
    <h2 class="text-center" style="color:green">租赁合同转租</h2>
    <el-form :model="form" :label-width="'110px'" :size="'mini'" ref="ruleForm">
      <div class="box-shadow mini-padding">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'原合同编号'">
              <el-input v-model="form.rawCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'原签约日期'">
              <el-input v-model="form.rawTime" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item :label="'原住户名称'">
              <el-input v-model="form.rawCustomerName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'原住户编号'">
              <el-input v-model="form.rawCustomerCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          :data="houseData"
          class="border-gray"
          :style="{'margin-bottom':'20px'}"
          ref="housesTable"
        >
          <el-table-column :prop="'fid'" :label="''" :align="'center'" v-if="false"></el-table-column>
          <el-table-column :prop="'unitCode'" :label="'单元编号'" :align="'center'"></el-table-column>
          <el-table-column :prop="'name'" :label="'单元名称'" :align="'center'"></el-table-column>
          <el-table-column :prop="'buildArea'" :label="'建筑面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'costArea'" :label="'计费面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'purpose'" :label="'租赁用途'" :align="'center'"></el-table-column>
        </el-table>
        <el-form-item :label="'房产描述'">
          <el-input v-model="form.houseDesc" />
        </el-form-item>
      </div>

      <div class="box-shadow mini-padding">
        <h4 class="text-center">新租户信息</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="'租户名称'" required>
              <!-- <el-select v-model="form.customerId" class="width-full" @click="showCustomer">
              </el-select>-->
              <el-input v-model="form.customerId" v-show="false" />
              <el-input readonly style="width:50%" v-model="customer" />
              <el-button icon="el-icon-search" @click="showCustomer" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'租户编号'">
              <el-input v-model="form.lesseecode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'租户简称'">
              <el-input v-model="form.lesseename" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="'联系人'">
              <el-input v-model="form.linkman" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'联系电话'">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'联系手机'">
              <el-input v-model="form.mobPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'身份证号'">
              <el-input v-model="form.IDnumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="'租户类型'">
              <el-radio v-model="form.isLessee" label="1">机构</el-radio>
              <el-radio v-model="form.isLessee" label="2">个人</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'经营业态'">
              <el-input v-model="form.commercialActivities" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="'法人代表'">
              <el-input v-model="form.legalPerson" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="warning" :size="'mini'" class="width-full">更多信息</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="box-shadow mini-padding">
        <h4 class="text-center">新合同资料</h4>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'合同编号'">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item :label="'合同起始时间'" required>
              <el-date-picker
                v-model="form.startTime"
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
            <el-form-item :label="'合同终止时间'" required>
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
        <el-row :gutter="60">
          <el-col :span="12">从转租日期起生成新合同</el-col>
          <el-col :span="12">
            <el-checkbox>当前合同立即退租，新合同立即启用</el-checkbox>
          </el-col>
        </el-row>
      </div>

      <el-tabs v-model="activeName" type="border-card" style="margin-bottom:20px;">
        <el-tab-pane name="1" :label="'业务资料'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'转租经办人'">
                <el-select v-model="form.agent" filterable placeholder="请选择">
                  <el-option
                    v-for="item in userFormat"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'转租办理时间'">
                <el-date-picker
                  v-model="form.refreshRentDate"
                  class="width-full"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'招商人员'">
                <el-select v-model="form.recruitMan" filterable placeholder="请选择">
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
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'信息来源'">
                <el-select v-model="form.sourceOfInfo" filterable placeholder="请选择">
                  <el-option :label="'报纸'" :value="'1'"></el-option>
                  <el-option :label="'路过'" :value="'2'"></el-option>
                  <el-option :label="'朋友介绍'" :value="'3'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'收取抽成佣金'">
                <el-select v-model="form.commission" filterable placeholder="请选择">
                  <el-option :label="'否'" :value="'1'"></el-option>
                  <el-option :label="'纯抽成租金'" :value="'2'"></el-option>
                  <el-option :label="'保底租金加抽成租金'" :value="'3'"></el-option>
                  <el-option :label="'保底租金与抽成租金两者取高'" :value="'4'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'集中收银'">
                <el-select v-model="form.centralizedCashier" filterable placeholder="请选择">
                  <el-option :label="'是'" :value="'1'"></el-option>
                  <el-option :label="'否'" :value="'2'"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="'附加说明'">
            <el-input type="textarea" v-model="form.refreshRentRemark"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" :label="'合同其他资料'"></el-tab-pane>
      </el-tabs>

      <span style="margin-right:20px">录入人：{{$store.getters['name']}}</span>
      <span>录入时间：{{new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()}}</span>

      <customer ref="customer" @click="selectCustomer" />
    </el-form>
  </div>
</template>

<script>
import { getRentContract } from "@/api/sy/lease/leaselist";
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
        rawCode: null, // 原合同编号
        rawTime: null, // 原签约日期
        rawCustomerName: null, // 原住户名称
        rawCustomerCode: null, // 原住户编号

        categoryId: null, //租赁类型
        status: 1, //原合同状态
        code: null, //合同编号
        startTime: null, //合同起始时间
        endTime: null, //合同终止时间
        signTime: null, //签约日期
        timeLimit: null, //租赁期限
        classify: "商业合同", //合同分类
        remark: null, //合同备注
        customerId: null, //客户Id
        lesseecode: null, //租户编号
        lesseename: null, //租户简称
        linkman: null, //联系人
        phone: null, //联系电话
        mobPhone: null, //联系手机
        IDnumber: null, //身份证号
        isLessee: "2", //租户类型
        commercialActivities: null, //经营业态
        legalPerson: null, //法人代表
        houseDesc: null, //房产描述
        commission: null, //收取抽成佣金
        source: "1", //合同来源 默认1
        agent: null, //转租经办人
        refreshRentDate: null, //转租办理时间
        recruitMan: null, //招商人员
        sourceOfInfo: null, //信息来源
        commission: null, //集中收银
        centralizedCashier: null, //房产描述
        refreshRentRemark: null, //附加说明
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
        if (typeof this.form[key] != undefined) {
          this.form[key] = this.clickData[key];
        }
      }
      this.form["rawCode"] = this.clickData["code"];
      this.form["rawTime"] = this.clickData["signTime"];
      this.form["rawCustomerName"] = this.clickData["customerName"];
    }
  },
  methods: {
    saveData() {},
    //选择客户
    selectCustomer(data) {
      this.form.customerId = data.fid;
      this.customer = data.name;

      let f = this.form,
        d = data;
      f.lesseecode = d.code;
      f.lesseename = d.name;
      f.linkman = d.linkman;
      f.phone = d.phone;
      f.mobPhone = d.mobPhone;
      f.IDnumber = d.idCard;
      f.isLessee = d.isLessee;
      f.commercialActivities = d.commercialActivities;
      f.legalPerson = d.legalPerson;

      this.$refs["customer"].handlerVisible(false);
    },
    //删除选中的数组
    delHouses(index, row) {
      this.houseData.splice(index, 1);
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

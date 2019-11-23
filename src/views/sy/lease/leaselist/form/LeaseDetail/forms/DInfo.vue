<template>
  <el-form :model="form" :label-width="'110px'" :size="'mini'" :rules="rules" ref="ruleForm">
    <div class="box-shadow">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'租赁类型'" required>
            <el-select v-model="form.categoryId" class="width-full">
              <el-option
                :value="item[0]"
                v-for="item in rentCategoryFormat"
                :key="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'合同状态'">
            <span style="color:red;">{{form.statusName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'合同编号'">
            <el-input v-model="form.code" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <h4 class="text-center">合同时间</h4>
      <el-row :gutter="20">
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item :label="'租赁期限'">
            <el-input v-model="form.timeLimit" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item :label="'合同分类'" required>
            <el-input v-model="form.classify" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'交房日期'">
            <el-date-picker
              v-model="form.makingRoomTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
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
      <el-row>
        <el-col :span="24">
          <el-form-item :label="'合同备注'">
            <el-input type="textarea" v-model="form.remark" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="box-shadow">
      <h4 class="text-center">客户信息</h4>
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
          <!-- <el-table-column
              :label="t.text"
              :align="'center'"
              v-for="(t,i) in houseColumns"
              :key="i"
          ></el-table-column>-->
          <el-table-column :prop="'fid'" :label="''" :align="'center'" v-if="false"></el-table-column>
          <el-table-column :prop="'unitCode'" :label="'单元编号'" :align="'center'"></el-table-column>
          <el-table-column :prop="'text'" :label="'单元名称'" :align="'center'"></el-table-column>
          <el-table-column :prop="'buildArea'" :label="'建筑面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'costArea'" :label="'计费面积'" :align="'center'"></el-table-column>
          <el-table-column :prop="'purpose'" :label="'租赁用途'" :align="'center'"></el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delHouses(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>

    <div class="box-shadow">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'房产描述'">
            <el-input v-model="form.houseDesc" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'租金总额'">
            <el-input v-model="form.rental" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'管理费总额'">
            <el-input v-model="form.backmentCost" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="'费用描述'">
            <el-input v-model="form.costDesc" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-form-item :label="'佣金'">
            <el-checkbox v-model="form.commission">收取抽成佣金</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="box-shadow">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-table :data="tableData">
            <el-table-column label="免租期设置" :align="'center'">
              <el-table-column>
                <el-button-group slot="header" style="float:right">
                  <el-button :size="'mini'" type="primary" @click.native="handlerTableTab">添加</el-button>
                  <el-button :size="'mini'" type="primary" @click.native="handlerTableTab">修改</el-button>
                  <el-button :size="'mini'" type="primary" @click.native="handlerTableTab">删除</el-button>
                </el-button-group>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="tableData" height="100%">
            <el-table-column label="免租期描述" :align="'center'"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div class="box-shadow">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'租金标准描述'">
            <el-input v-model="form.nullName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'租金支付日描述'">
            <el-input v-model="form.nullName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'管理费标准描述'">
            <el-input v-model="form.nullName" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <customer ref="customer" @click="selectCustomer" />
    <houses ref="houses" @click="selectHouses" />
  </el-form>
</template>

<script>
import {
  getRentContract,
  getCustomerById,
  saveRentContract
} from "@/api/sy/lease/leaselist";
import { rentCategoryFormat } from "@/api/format";
import { Customer, Houses } from "@/components/Dialog";

export default {
  components: {
    Customer,
    Houses
  },
  data() {
    return {
      form: {
        fid: null,
        categoryId: null, //租赁类型
        statusName: "当前合同", //合同状态
        status: 1, //合同状态Id
        code: null, //合同编号
        startTime: null, //合同起始时间
        endTime: null, //合同终止时间
        signTime: null, //签约日期
        timeLimit: null, //租赁期限
        classify: "商业合同", //合同分类
        makingRoomTime: null, //交房日期
        approachTime: null, //进场日期
        openTime: null, //开业日期
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
        rental: null, //租金总额
        backmentCost: null, //管理费总额
        costDesc: null, //费用描述
        commission: null, //佣金
        source: "1", //合同来源 默认1
        nullName: null // {{后台没有给字段}}
      },
      rules: {
        // 校验规则
        categoryId: [
          { required: true, message: "请选择租赁类型", trigger: "change" }
        ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        signTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        classify: [
          { required: true, message: "请填写分类", trigger: "change" }
        ],
        customer: [{ required: true, message: "请选择客户", trigger: "blur" }]
      },
      tableData: [],
      houseData: [
        /*  {
          fid: "1",
          text: "1"
        },
        {
          fid: "2",
          text: "2"
        },
        {
          fid: "3",
          text: "4"
        } */
      ], // 房产列表data
      houseColumns: [
        { text: "", name: "fid", hide: true },
        { text: "单元编号", name: "unitCode" },
        { text: "单元名称", name: "text" },
        { text: "建筑面积", name: "buildArea" },
        { text: "计费面积", name: "costArea" },
        { text: "租赁用途", name: "purpose" }
      ],
      rentCategoryFormat: [], //租赁类型下拉
      customer: "" //租户名称
    };
  },
  computed: {
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
    if (this.dblData["fid"] != null) {
      this.fetchData();
      //将表格数据绑定到form
      for (let key in this.dblData) {
        // 在form找出与dblData同样的字段并赋值
        if (typeof this.form[key] != undefined) {
          this.form[key] = this.dblData[key];
        }
      }
    }
  },
  methods: {
    saveData() {
      let f = this.form;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (
            f.categoryId &&
            f.startTime &&
            f.endTime &&
            f.signTime &&
            f.customerId
          ) {
            if (this.houseData.length != 0) {
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

              // 空字段删除
              for (let key in f) {
                if (f[key] == "" || f[key] == null) {
                  delete f[key];
                }
              }
              delete f["lesseecode"];
              delete f["lesseename"];
              delete f["statusName"];
              delete f["classify"];
              delete f["timeLimit"];
              delete f["phone"];
              if (f["classify"] == "商业合同") f["classify"] == "1";

              //添加必备的字段
              if (typeof this.form["fid"] == "undefined") {
                this.form.fid = "";
              }
              if (typeof this.form["rentUnitList"] == "undefined") {
                this.form.rentUnitList = [];
              }
              f.status = String(f.status);
              saveRentContract(this.form).then(res => {
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
          } else {
            this.$message({
              message: "有必填项未填写",
              type: "error"
            });
          }
        } else {
          console.log("有必填项没有填写");
          return false;
        }
      });
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
    //显示房产弹窗
    showHouses() {
      this.$refs["houses"].handlerVisible(true);
    },
    //显示客户弹窗
    showCustomer() {
      this.$refs["customer"].handlerVisible(true);
    },
    handlerTableTab() {},
    fetchFormat() {
      rentCategoryFormat().then(res => {
        let d = res.data;
        d.forEach((t, i) => {
          t[0] = Number(t[0]); // 需要把下拉的key转换为数字
        });
        this.rentCategoryFormat = d;
        console.log(this.rentCategoryFormat);
      });
    },
    fetchData() {
      getRentContract({ contractId: this.dblData["fid"] }).then(res => {
        this.houseData = res.data;
      });
      getCustomerById({ fid: this.dblData["customerId"] }).then(res => {
        this.form.customerId = res.data.fid;
        this.customer = res.data.name;
        let f = this.form;
        let d = res.data;
        f.lesseecode = d.code;
        f.lesseename = d.name;
        f.linkman = d.linkman;
        f.phone = d.phone;
        f.mobPhone = d.mobPhone;
        f.IDnumber = d.IDnumber;
        f.isLessee = d.isLessee;
        f.commercialActivities = d.commercialActivities;
        f.legalPerson = d.legalPerson;
      });
    }
  }
};
</script>

<style scoped>
</style>

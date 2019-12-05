<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目选择'">
            <el-select v-model="form.buildId" class="width-full">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in buildFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户名称'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户编号'">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-select class="width-full" v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系号码'">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系人'">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'QQ号码'">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'Email邮箱'">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'国籍'">
            <el-input v-model="form.nationality"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'户口所在地'">
            <el-input v-model="form.idAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'证件类型'">
            <el-select class="width-full" v-model="form.idType" placeholder="请选择证件类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="港澳通行证" value="2"></el-option>
              <el-option label="营业执照" value="3"></el-option>
              <el-option label="护照" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'证件号码'">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'紧急联系人'">
            <el-input v-model="form.urgencyContact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'紧急联系电话'">
            <el-input v-model="form.urgencyPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'座机（传真）'">
            <el-input v-model="form.faxNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'会员卡号'">
            <el-input v-model="form.vipCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'门禁卡编号'">
            <el-input v-model="form.accessCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发票抬头'">
            <el-input v-model="form.invoiceTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'纳税识别号'">
            <el-input v-model="form.faxNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'购买日期'">
            <el-date-picker
              v-model="form.buyDate"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出售日期'">
            <el-date-picker
              v-model="form.sellDate"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'租赁开始日期'">
            <el-date-picker
              v-model="form.rentStartTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'租赁结束日期'">
            <el-date-picker
              v-model="form.rentEndTime"
              class="width-full"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'接待人员'">
            <el-input v-model="form.receiver"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'接待时间'">
            <el-input v-model="form.receiverTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="saveData">保存</el-button>
      </div>
  </div>
</template>

<script>
import { buildFormat } from "@/api/wy/format";
import { getCustomerById, saveCustomer } from "@/api/wy/customer/commoditylist";

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
        fid: null,
        buildId: null, // 所属项目
        name: null, // 客户名称
        code: null, // 客户编号
        sex: null, // 性别
        phone: null, // 联系号码
        contact: null, // 联系人
        qq: null, // QQ号码
        email: null, // Email邮箱
        nationality: null, // 国籍
        idAddress: null, // 户口所在地
        idType: null, // 证件类型
        idCard: null, // 证件号码
        urgencyContact: null, // 紧急联系人
        urgencyPhone: null, // 紧急联系电话
        faxNo: null, // 座机（传真）
        address: null, // 联系地址
        vipCard: null, // 会员卡号
        accessCode: null, // 门禁卡编号
        invoiceTitle: null, // 发票抬头
        faxNo: null, // 纳税识别号
        buyDate: null, // 购买日期
        sellDate: null, // 出售日期
        rentStartTime: null, // 租赁开始日期
        rentEndTime: null, // 租赁结束日期
        receiver: null, // 接待人员
        receiverTime: null // 接待时间
      },
      buildFormat: []
    };
  },
  created() {
    this.fetchFormat();
  },
  mounted() {
    if (this.fid) {
      this.fetchData(this.fid);
    }
  },
  methods: {
    saveData() {
      if(!this.form.buildId) return this.$message({
        message: "请选择房产",
        type: "warning"
      });
      saveCustomer(this.form).then(res => {
        console.log(res)
      });
    },
    fetchFormat() {
      buildFormat().then(res => {
        this.buildFormat = res.data;
      });
    },
    fetchData(val) {
      getCustomerById(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>

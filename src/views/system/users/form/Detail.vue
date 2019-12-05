<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户名称'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户账号'">
            <el-input v-model="form.code"></el-input>
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
          <el-form-item :label="'所属公司'">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户权限'">
            <el-select class="width-full" v-model="form.idType" placeholder="请选择用户权限">
              <el-option label="管理员1" value="1"></el-option>
              <el-option label="管理员2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'是否启用'">
            <el-switch v-model="form.nationality"></el-switch>
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

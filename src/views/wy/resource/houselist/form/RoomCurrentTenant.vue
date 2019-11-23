<template>
  <div class>
    <el-form ref="form" :model="form" label-width="100px" :size="'mini'">
      <div>
        <el-row>
          <el-col :span="16">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item :label="'租户名称'">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'租户编号'">
                  <el-input v-model="form.code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item :label="'联系电话'">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'联系电话'">
                  <el-input v-model="form.mobPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item :label="'身份证号码'">
                  <el-input v-model="form.idCard"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item :label="'身份证地址'">
                  <el-input v-model="form.idCardAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item :label="'紧急联系人'">
                  <el-input v-model="form.jcontact"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'联系人电话'">
                  <el-input v-model="form.contactPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item :label="'联系地址'">
                  <el-input v-model="form.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <img :src="form.img" name="File" v-if="form.img" />
            <div v-else style="text-align:center;">暂无图片</div>
          </el-col>
        </el-row>
      </div>
      <hr style="margin:10px 0;background-color:#cccccc;border:none;height:1px;" />
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item :label="'企业法人'">
            <el-input v-model="form.legalPerson"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'企业性质'">
            <el-input v-model="form.nature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="'统一社会信用代码'">
            <el-input v-model="form.creditCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'税务识别号'">
            <el-input v-model="form.taxNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'注册资本'">
            <el-input v-model="form.capital"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="'传真号码'">
            <el-input v-model="form.faxNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'电子邮箱'">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'联系人'">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="'开户银行'">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'银行账号'">
            <el-input v-model="form.bankNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'品牌级别'">
            <el-input v-model="form.brandType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item :label="'经营业态'">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'品牌名称'">
            <el-input v-model="form.brandName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'招牌名称'">
            <el-input v-model="form.signatureName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item :label="'附加说明'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCustomerById, saveCustomer } from "@/api/wy/resource/houseslist";

export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  components: {},
  data() {
    return {
      currentFormat: [],
      form: {
        name: null,
        code: null,
        phone: null,
        mobPhone: null,
        idCard: null,
        idCardAddress: null,
        jcontact: null,
        contactPhone: null,
        address: null,
        img: null,
        legalPerson: null,
        nature: null,
        creditCode: null,
        taxNo: null,
        capital: null,
        faxNo: null,
        email: null,
        contact: null,
        bank: null,
        bankNo: null,
        brandType: null,
        status: null,
        brandName: null,
        signatureName: null,
        remark: null
      }
    };
  },
  mounted() {
    if (this.id) {
      this.fetchData(this.id);
    }
  },
  methods: {
    subForm() {
      saveCustomer(this.form).then(res => {
        if (res.status == 0) {
          this.$message({
            message: res.msg || "操作成功",
            type: "success"
          });
        }
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

<style scoped>
</style>

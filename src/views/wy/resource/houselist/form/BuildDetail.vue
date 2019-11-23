<template>
  <el-form ref="form" :model="form" label-width="100px" :size="'mini'">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="楼栋总数">
          <el-input-number :min="0" v-model="form.towerNum" @change="handleTowerChange"></el-input-number>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="6">
        <el-form-item label="楼栋梯数">
          <el-input-number :min="0" v-model="form.unitNum" @change="handleUnitChange"></el-input-number>
        </el-form-item>
      </el-col> -->
      <el-col :span="8">
        <el-form-item label="楼栋层数">
          <el-input-number :min="0" v-model="form.floorNum" @change="handleFloorChange"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="每层户数">
          <el-input-number :min="0" v-model="form.unitNum" @change="handleRoomChange"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="房间命名样式">
          <el-input v-model="form.unitNameType"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
      height="300px"
      @row-dblclick="dblclick"
    >
      <el-table-column :prop="'a'" :label="'楼栋编号'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.code" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column :prop="'b'" :label="'楼栋名称'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column :prop="'c'" :label="'楼梯梯数'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.c" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column> -->
      <el-table-column :prop="'d'" :label="'楼层层数'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.floorNum" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column :prop="'e'" :label="'房产命名样式'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.unitNameType" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column :prop="'f'" :label="'每层户数'">
        <template slot-scope="scope">
          <el-input v-model="scope.row.unitNum" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        num: 0,
        code: "",
        towerNum: 0,
        unitNum: 0,
        floorNum: 0,
        roomNum: 0,
        unitNameType:""
      },
      tableData: [],
      columns: [
        { text: "楼栋编号", name: "code" },
        { text: "楼栋名称", name: "name" },
        /* { text: "楼梯梯数", name: "c" }, */
        { text: "楼层层数", name: "floorNum" },
        { text: "房产命名样式", name: "unitNameType" },
        { text: "每层户数", name: "unitNum" }
      ]
    };
  },
  methods: {
    getTowerCode(val) {
      this.form.code = val;
    },
    //监听楼栋总数/楼栋梯数/楼栋层树/每层户数的变化
    handleTowerChange(val) {
      var cha = val - this.tableData.length;
      var doublen = ""; //01，02，03.....数字类型
      if (val < 10) {
        doublen = "0" + val;
      }
      if (val > this.tableData.length) {
        for (var i = 0; i < cha; i++) {
          this.tableData.push({
            code: this.form.code + "0" + (this.tableData.length + 1),
            name: "第" + "0" + (this.tableData.length + 1) + "栋",
            /* c: this.form.unitNum, */
            floorNum: this.form.floorNum,
            unitNameType: this.form.unitNameType,
            unitNum: this.form.unitNum
          });
        }

        return this.tableData;
      } else {
        var jian = this.tableData.length - val;
        this.tableData.splice(this.tableData.length - jian, jian);
      }
    },
    handleUnitChange(val) {
      console.log(val);
    },
    handleFloorChange(val) {
      console.log(val);
    },
    handleRoomChange(val) {
      console.log(val);
    },
    dblclick() {}
  },
};
</script>

<style scoped>
</style>

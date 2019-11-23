<template>
  <div class="list-header">
    <el-dropdown @command="handlerTabs">
      <el-button size="mini">
        新增
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="build_visible = true" :command="1">新增楼盘</el-dropdown-item>
        <el-dropdown-item @click.native="handlerTower(node)" :command="2">新增楼栋</el-dropdown-item>
        <!-- <el-dropdown-item>新增梯楼</el-dropdown-item> -->
        <el-dropdown-item @click.native="handlerFloor(node)" :command="3">新增楼层</el-dropdown-item>
        <el-dropdown-item @click.native="handlerRoom(node)" :command="4">新增房号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="handlerTabs">
      <el-button size="mini">
        修改
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handlerBuild(node,true)" :command="1">修改楼盘</el-dropdown-item>
        <el-dropdown-item @click.native="handlerTower(node,true)" :command="2">修改楼栋</el-dropdown-item>
        <!-- <el-dropdown-item>修改梯楼</el-dropdown-item> -->
        <el-dropdown-item @click.native="handlerFloor(node,true)" :command="3">修改楼层</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="handlerTabs">
      <el-button size="mini">
        删除
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="delBuild(node)" :command="1">删除楼盘</el-dropdown-item>
        <el-dropdown-item @click.native="delTower(node)" :command="2">删除楼栋</el-dropdown-item>
        <!-- <el-dropdown-item>删除梯楼</el-dropdown-item> -->
        <el-dropdown-item @click.native="delFloor(node)" :command="3">删除楼层</el-dropdown-item>
        <el-dropdown-item @click.native="delUnit(node)" :command="4">删除房号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown>
      <el-button size="mini">
        其他操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>房屋拆分</el-dropdown-item>
        <el-dropdown-item>房屋合并</el-dropdown-item>
        <el-dropdown-item>批量修改房产</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-button size="mini">导入</el-button>

    <!-- 楼盘信息编辑弹窗 -->
    <template v-if="build_visible">
      <el-dialog
        :visible.sync="build_visible"
        title="楼盘资料"
        :width="'80%'"
        @close="closedDialog"
        destroy-on-close
      >
        <el-tabs v-model="active" type="card">
          <el-tab-pane label="楼盘信息" name="buildInfo">
            <build-info :fid="buildId" ref="buildInfo" @handlerCode="handlerTabDisabled" />
          </el-tab-pane>
          <el-tab-pane label="楼栋楼梯楼层房产信息" name="buildDetail"  ref="tabpane" :disabled="buildDetailDisabled">
            <build-detail ref="buildInfo" />
          </el-tab-pane>
        </el-tabs>
        <div slot="footer">
          <el-button @click.native="build_visible= false">取 消</el-button>
          <el-button type="primary" @click.native="handlerForm">保存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 楼栋信息编辑弹窗 -->
    <template v-if="tower_visible">
      <el-dialog
        :visible.sync="tower_visible"
        title="楼栋资料"
        :width="'80%'"
        @close="closedDialog"
        destroy-on-close
      >
        <tower-info :prId="buildId" :fid="towerId" ref="towerInfo" />
        <div slot="footer">
          <el-button @click.native="tower_visible= false">取 消</el-button>
          <el-button type="primary" @click.native="handlerForm">保存</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 楼层信息编辑弹窗 -->
    <template v-if="floor_visible">
      <el-dialog
        :visible.sync="floor_visible"
        title="楼层资料"
        :width="'80%'"
        @close="closedDialog"
        destroy-on-close
      >
        <floor-info :prId="towerId" :fid="floorId" ref="floorInfo" />
        <div slot="footer">
          <el-button @click.native="floor_visible= false">取 消</el-button>
          <el-button type="primary" @click.native="handlerForm">保存</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BuildInfo, BuildDetail, TowerInfo, FloorInfo } from "../form";
import {
  deleteBuildById,
  deleteTowerById,
  deleteFloorById,
  deleteUnitById
} from "@/api/wy/resource/houseslist";

export default {
  components: {
    BuildInfo,
    BuildDetail,
    TowerInfo,
    FloorInfo
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      active: "buildInfo",

      build_visible: false,
      tower_visible: false,
      floor_visible: false,
      buildId: null,
      towerId: null,
      floorId: null,
      buildDetailDisabled: true
    };
  },
  watch: {
    route(to, from) {}
  },
  methods: {
    delBuild(node) {
      if (node) {
        if (node.data.type - 1 != 1) {
          return this.$message({
            message: "请选择楼盘",
            type: "warning"
          });
        }
        deleteBuildById(node.data.fid);
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    delTower(node) {
      if (node) {
        if (node.data.type - 1 != 2) {
          return this.$message({
            message: "请选择楼栋",
            type: "warning"
          });
        }
        deleteTowerById(node.data.fid);
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    delFloor(node) {
      if (node) {
        if (node.data.type - 1 != 3) {
          return this.$message({
            message: "请选择楼层",
            type: "warning"
          });
        }
        deleteFloorById([node.data.fid]);
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    delUnit(node) {
      if (node) {
        if (node.data.type - 1 != 4) {
          return this.$message({
            message: "请选择房间",
            type: "warning"
          });
        }
        deleteUnitById([node.data.fid]);
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    // 监听tabs禁用状态
    // 该组件下，只有buildinfo里的code有值才能批量新增
    handlerTabDisabled(val) {
      this.buildDetailDisabled = val == null || val == "" ? true : false;
    },
    handlerBuild(node, current) {
      if (node) {
        var fid = node.data.fid,
          type = node.data.type,
          type = type - 1;
        // current - 是否需要对当前节点修改
        if (current) {
          // 编辑/查看当前
          //对当前节点操作
          if (type != 1) {
            return this.$message({
              message: "请选择楼盘",
              type: "warning"
            });
          }
        }
        this.buildId = fid;
        this.build_visible = true;
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    handlerTower(node, current) {
      if (node) {
        var fid = node.data.fid,
          type = node.data.type,
          type = type - 1;

        if (current) {
          // 编辑/查看当前
          if (type != 2) {
            return this.$message({
              message: "请选择楼栋",
              type: "warning"
            });
          }
          this.towerId = fid; // 当前的fid
        } else {
          if (type != 1) {
            return this.$message({
              message: "请选择楼盘",
              type: "warning"
            });
          }
          this.buildId = fid; // 获取当前上级ID
        }
        console.log("pr-" + node.data.text);
        this.tower_visible = true;
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    handlerFloor(node, current) {
      if (node) {
        var fid = node.data.fid,
          type = node.data.type,
          type = type - 1;

        if (current) {
          // 编辑/查看当前
          if (type != 3) {
            return this.$message({
              message: "请选择楼层",
              type: "warning"
            });
          }
          this.floorId = fid; // 当前的fid
        } else {
          if (type != 2) {
            return this.$message({
              message: "请选择楼栋",
              type: "warning"
            });
          }
          this.towerId = fid; // 获取当前上级ID
        }
        console.log("pr-" + node.data.text);
        this.floor_visible = true;
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    handlerRoom(node, current) {
      if (node) {
        var fid = node.data.fid,
          type = node.data.type,
          type = type - 1;

        /* if (current) {
          // 编辑/查看当前
          if (type != 4) {
            return this.$message({
              message: "请选择房间",
              type: "warning"
            });
          }
          this.floorId = fid;// 获取当前上级ID
        } else {
          if (type != 3) {
            return this.$message({
              message: "请选择楼层",
              type: "warning"
            });
          }
        } */
        if (type != 3) {
          return this.$message({
            message: "请选择楼层",
            type: "warning"
          });
        }
        this.$emit("addUnit", fid);
        console.log("pr-" + node.data.text);
      } else {
        return this.$message({
          message: "请先选择菜单",
          type: "warning"
        });
      }
    },
    handlerTabs(val) {
      if (this.node) {
        console.log(val);
        console.log(this.node.data.type - 1);
      }

      //console.log(this.node);
    },
    handlerForm() {
      var dianame = ""
      if (this.build_visible) dianame = "buildInfo"
      if (this.tower_visible) dianame = "towerInfo"
      if (this.floor_visible) dianame = "floorInfo"
      if(dianame=="buildInfo"){//如果保存房产，需要额外判断第二个附表有无数据
        const builds = this.$refs.buildDetail.tableData
        if(builds.length>0){
          // 如果需要批量新增楼盘
          return this.$refs.buildInfo.saveData(builds)
        }

      }
      console.log(dianame)
      console.log(this.$refs)
      this.$refs[dianame].saveData()
      
    },

    closedDialog() {
      this.buildId = null;
      this.towerId = null;
      this.floorId = null;
      this.active = !this.build_visible ? "buildInfo" : this.active;
    }
  }
};
</script>

<style>
</style>
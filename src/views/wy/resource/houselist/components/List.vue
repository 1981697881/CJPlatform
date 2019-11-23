<template>
  <div class="list-main">
    <el-row v-for="floor in list.list" :key="floor.fid" style="margin-bottom:10px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{floor.name}}</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            class="text-center"
            v-for="unit in floor.unitList"
            :key="unit.fid"
            style="margin-bottom:20px"
          >
            <el-tooltip class="item" effect="dark" :content="unit.status==1?'已租':(unit.status==2?'自用':'空置')" placement="top-start">
              <div
                class="pan-btn green-btn"
                :class="{'pink-btn':unit.status==1?true:false,'yellow-btn':unit.status==2?true:false}"
                @click="handlerRoom(unit.fid,unit.currentOwnerId,unit.currentTenantId)"
              >
                <span>{{unit.name}}</span>
                <span>业主：{{unit.current_owner?unit.current_owner:"暂无业主"}}</span>
                <span>租户：{{unit.currentTenant?unit.currentTenant:"暂无租户"}}</span>
              </div>
            </el-tooltip>
          </el-col>
        </div>
      </el-card>
    </el-row>

    <div class="text-center" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
    <div v-else>请选择楼栋</div>

    <el-dialog
      :visible.sync="visible"
      title="房间资料"
      v-if="visible"
      @dragDialog="handleDrag"
      :width="'80%'"
      @close="closedDialog"
      destroy-on-close
    >
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="房产信息" name="roomInfo">
          <room-info :id="data_room.unitId" @subSucces="loadList" ref="roomInfo" :prId="prId" />
        </el-tab-pane>
        <el-tab-pane label="业户资料" name="currentOwner">
          <room-current-owner
            :id="data_room.currentOwnerId"
            @subSucces="loadList"
            ref="currentOwner"
          />
        </el-tab-pane>
        <el-tab-pane label="租户资料" name="currentTenant">
          <room-current-Tenant
            :id="data_room.currentTenantId"
            @subSucces="loadList"
            ref="currentTenant"
          />
        </el-tab-pane>
        <el-tab-pane label="仪器仪表" name="4"></el-tab-pane>
        <el-tab-pane label="收费设置" name="5"></el-tab-pane>
        <el-tab-pane label="租赁信息" name="6"></el-tab-pane>
        <el-tab-pane label="历史记录" name="7"></el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button @click.native="visible= false">取 消</el-button>
        <el-button type="primary" @click.native="handlerForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUnitByTowerId } from "@/api/wy/resource/houseslist";
import { RoomInfo, RoomCurrentOwner, RoomCurrentTenant } from "../form";
export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    prId: {
      //用于新增房号
      type: Number,
      default: null
    }
  },
  components: {
    RoomInfo,
    RoomCurrentOwner,
    RoomCurrentTenant
  },
  data() {
    return {
      list: {},
      visible: false,
      active: "roomInfo",
      pageSize: 5, //默认每页显示条数
      pageNum: 1, //默认当前页
      data_room: {
        unitId: {
          type: Number,
          default: null
        },
        unitIdReq: {},
        currentOwnerId: {
          type: Number,
          default: null
        },
        currentTenantId: {
          type: Number,
          default: null
        }
      }
    };
  },
  watch: {
    id(val) {
      this.fetchData(val);
    }
  },
  methods: {
    addUnit() {
      this.visible = true;

      this.data_room.unitId = null;
      this.data_room.currentOwnerId = null;
      this.data_room.currentTenantId = null;
    },
    loadList() {
      this.fetchData(this.id);
    },
    handlerForm() {
      this.$refs[this.active].subForm();
    },
    closedDialog() {
      this.active = !this.visible ? "roomInfo" : this.active;
    },

    handlerRoom(unitId, currentOwnerId, currentTenantId) {
      this.visible = true;
      this.data_room.unitId = unitId;
      this.data_room.currentOwnerId = currentOwnerId;
      this.data_room.currentTenantId = currentTenantId;
    },
    //监听每页显示几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(this.id);
    },
    //监听当前页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchData(this.id);
    },
    fetchData(val) {
      getUnitByTowerId(val, this.pageNum, this.pageSize).then(res => {
        this.list = res.data;
      });
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    }
  }
};
</script>

<style scoped>
.pan-btn {
  font-size: 12px !important;
  width: 200px;
}
.pan-btn span {
  display: block;
}
</style>
<template>
  <div class="dashboard-container">
    <el-alert
      :title="'欢迎回来！'+name"
      type="success"
      effect="dark"
      :closable="false"
    ></el-alert>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />

     <panel-group @handleSetLineChartData="handleSetLineChartData" />
 -->
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>-->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart @uploadList="barUpload" ref='barC'/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart @uploadList="pieUpload" ref='parC'/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-form  :size="'mini'"  :label-width="'50px'">
          <el-row :gutter="32">
            <el-col :span="5">
              <el-form-item :label="'日期'">
                <el-date-picker
                  v-model="value1"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-left: 40%;">
              <el-button  :size="'mini'" type="primary" icon="el-icon-search" @click="query1">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="list-main">
          <el-table :height="height" :data="list2" show-summary :summary-method="getSummaries" border size="mini" :highlight-current-row="true">
            <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
            <el-table-column
              v-for="(t,i) in columns1"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:(selfAdaption?'':'120px')"
            ></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-form  :size="'mini'" :label-width="'50px'">
          <el-row :gutter="32">
            <el-col :span="5">
              <el-form-item :label="'日期'">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="padding-left: 40%;">
              <el-button  :size="'mini'" type="primary" icon="el-icon-search" @click="query2">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="list-main">
          <el-table :height="height" :data="list" show-summary :summary-method="getSummaries" border size="mini" :highlight-current-row="true">
            <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
            <el-table-column
              v-for="(t,i) in columns2"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
            ></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--<el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>-->
    <!--<el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'我的审批'"/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'我的任务'" />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <todo-list :placeholder="'公告通知'" />
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import PanelGroup from "./components/PanelGroup"
    import LineChart from './components/LineChart'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'
    import TodoList from './components/TodoList'
    import { productCategory, product} from '@/api/table'

    const lineChartData = {
        newVisitis: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    }

    export default {
        props: {
            //是否自定义高度 默认100%
            height: {
                type: String,
                default: "400px"
            },
            //是否自适应宽度，不自适应宽度默认为120px
            selfAdaption: {
                type: Boolean,
                default: true
            },
        },
        name: "Dashboard",
        components: {
            PanelGroup,
            LineChart,
            RaddarChart,
            PieChart,
            BarChart,
            TodoList,
        },
        computed: {
            ...mapGetters(["name"]),
        },
        data() {
          return {
            value1: '',
            value2: '',
            lineChartData: lineChartData.newVisitis,
            loading: false,
            list: [],
            radio: 3,
            list2: [],
            type: null,
            columns1: [
              { text: "gid", name: "gid" ,default:false},
              { text: "产品长代码", name: "goodCode" },
              { text: "产品名称", name: "goodName" },
              { text: "单位", name: "uom" },
              { text: "销售量", name: "totalNum", default:true},
              { text: "金额", name: "totalPrice", default:false},
              { text: "占比", name: "percent1", default:false},
              { text: "占比", name: "percent2", default:true},
            ],
            columns2: [
              { text: "gid", name: "gid" ,default:false},
              { text: "分类", name: "name" },
              { text: "销售量", name: "totalNum", default:true},
              { text: "金额", name: "totalPrice", default:false},
              { text: "占比", name: "percent1", default:false},
              { text: "占比", name: "percent2", default:true},
            ],
              pickerOptions: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              },
            }
        },
      mounted() {
        this.fetchData1({backstage: true})
        this.fetchData2({backstage: true})
      },
      methods: {
        // 查询条件过滤
        qFilter(val) {
          let obj = {}
          val[1] != null || val[1] != undefined ? obj.endDate = val[1] : null
          val[0] != null || val[0] != undefined ? obj.startDate = val[0] : null
          obj.backstage = true
          return obj
        },
        //时间查询
        query1() {
          this.fetchData1(this.qFilter(this.value1))
        },
        //时间查询
        query2() {
          this.fetchData2(this.qFilter(this.value2))
        },
        // 计算百分
        getPercent(num, total) {
          num = parseFloat(num);
          total = parseFloat(total);
          if (isNaN(num) || isNaN(total)) {
            return "-";
          }
          return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
        },
        fetchData2(val) {
          let me = this
          // 获取数据 1.计算总数 2.计算百分比 3.赋值
          console.log(val)
          productCategory(val).then(res => {
            if(res.flag) {
              let data = res.data
              let count1 = 0
              let count2 = 0
              data.forEach(function(item, index) {
                count1 += item.totalPrice
                count2 += item.totalNum
              })
              data.forEach(function(item, index) {
                item.percent1 = me.getPercent(item.totalPrice, count1)
                item.percent2 = me.getPercent(item.totalNum, count2)
              })
              this.list = data
              this.$refs.parC.initChart(res.data)
            }
          })
        },
        fetchData1(val) {
          console.log(val)
          let me = this
          // 获取数据 1.计算总数 2.计算百分比 3.赋值
          product(val).then(res => {
            if(res.flag) {
              let data = res.data
              let count1 = 0
              let count2 = 0
              data.forEach(function(item, index) {
                count1 += item.totalPrice
                count2 += item.totalNum
              })
              data.forEach(function(item, index) {
                item.percent1 = me.getPercent(item.totalPrice, count1)
                item.percent2 = me.getPercent(item.totalNum, count2)
              })
              this.list2 = data
              this.$refs.barC.initChart(res.data)
            }
          })
        },
        //切换数据 销售量/金额
        barUpload(val) {
            for(let i in this.columns1) {
              if(this.columns1[i].name == 'totalNum') {
                this.columns1[i].default = val
              } else if(this.columns1[i].name == 'totalPrice') {
                this.columns1[i].default = !val
              } else if(this.columns1[i].name == 'percent1') {
                this.columns1[i].default = !val
              } else if(this.columns1[i].name == 'percent2') {
                this.columns1[i].default = val
              }
          }
        },
        //切换数据 销售量/金额
        pieUpload(val) {
            for (let i in this.columns2) {
              if (this.columns2[i].name == 'totalNum') {
                this.columns2[i].default = val
              } else if (this.columns2[i].name == 'totalPrice') {
                this.columns2[i].default = !val
              } else if(this.columns2[i].name == 'percent1') {
                this.columns2[i].default = !val
              } else if(this.columns2[i].name == 'percent2') {
                this.columns2[i].default = val
              }
          }
        },
        getSummaries({columns,data}) {
          const sums = [];
          columns.forEach((column,index) => {
            if(index == 0){
              sums[index] = "总价"
            }else{
              const values = data.map(item=>Number(item[column.property]))
              const flag = values.every(item=>isNaN(item))
              if(flag){
                return sums[index] = ""
              }else{
                if(column.property == 'totalNum') {
                  sums[index] = values.reduce((total, item) => total + item);
                  sums[index] = Math.round(sums[index] * 100) / 100;
                  sums[index] += ""
                }
              }
            }
          });
          return sums
        },
        handleSetLineChartData(type) {
          this.lineChartData = lineChartData[type]
        }
      }
    };
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      padding: 32px;
      background-color: rgb(240, 242, 245);
      position: relative;

      .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }

    &-main {
      margin: 30px;
    }

  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

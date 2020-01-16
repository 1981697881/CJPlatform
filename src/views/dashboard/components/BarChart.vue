<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
         /* title: {
              text: '世界人口总量',
              subtext: '数据来自网络'
          },*/
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['销量', '金额']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
          },
          yAxis: {
              type: 'category',
              data: ['吊龙', '打包盒', '纸巾', '鸡肉', '鱼肉', '牛肉']
          },
          series: [
              {
                  name: '销量',
                  type: 'bar',
                  data: [18203, 23489, 29034, 10497, 13174, 3023]
              },
              {
                  name: '金额',
                  type: 'bar',
                  data: [19325, 23438, 31000, 12159, 13414, 8180]
              }
          ]
      })
    }
  }
}
</script>

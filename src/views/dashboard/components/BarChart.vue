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
      chart: null,
      type: 1
    }
  },
  mounted() {
   /* this.$nextTick(() => {
      this.initChart()
    })*/
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    reset() {
      if (this.type === 1) {
        this.type = 2
        this.$emit('uploadList',false)
      } else {
        this.type = 1
        this.$emit('uploadList',true)
      }
    },
    initChart(infoData) {
      let array1 = []
      let me = this
      let array2 = []
      let info = []
      infoData.forEach(function(item, index) {
        array1.push(item.totalNum)
        array2.push(item.totalPrice)
        info.push(item.goodName)
      })
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
        toolbox: {
          feature: {
            myTool: {
              show: true,
              title: '切换销量/销售额',
              icon: 'image://' + require('@/assets/logo/edzh.png'),
              onclick: function() {
                me.reset()
              }
            },
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true},
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
              data: info,
          },
          series: [
              {
                  name: '销量',
                label: {
                  show: true
                },
                  type: 'bar',
                  data: array1
              },
              {
                  name: '金额',
                  type: 'bar',
                label: {
                  show: true
                },
                  data: array2
              }
          ]
      })
    }
  }
}
</script>

<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import store from "../../../store";

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
      dateEnd: null,
      dateStart: null,
      headData: [],
      bodyData: [],
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
    reset(infoData) {
      let info = []
      if (this.type === 1) {
        infoData.forEach(function(item, index) {
          info.push({
            name: item.name,
            value: item.totalPrice
          })
        })
        this.$emit('uploadList',false)
        this.type = 2
      } else {
        infoData.forEach(function(item, index) {
          info.push({
            name: item.name,
            value: item.totalNum
          })
        })
        this.$emit('uploadList',true)
        this.type = 1
      }
      this.chart.setOption({
        series: {
          data: info
        }
      })
    },
    initChart(infoData) {
      let me = this
      let array = []
      let info = []
        infoData.forEach(function(item, index) {
          array.push(item.name)
          info.push({
            name: item.name,
            value: item.totalNum
          })
        })
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            myTool: {
              show: true,
              title: '切换销量/销售额',
              icon: 'image://' + require('@/assets/logo/edzh.png'),
              onclick: function() {
                me.reset(infoData)
              }
            },
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true},
          }
        },
        legend: {
          orient: 'vertical',
          type: 'scroll',
          left: '10',
          data: array
        },
          series: [
              {
                  name: '分类',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: info,
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      })
    }
  }
}
</script>

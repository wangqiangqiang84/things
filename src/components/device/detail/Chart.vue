<template>
  <div class="chartContainer">
    <div class="chart" id="myChart"></div>
    <div>
      <button class="crease" @click="creaseTime($event)">+</button>
      <button @click="switchData($event)" class="selectedTime" name="hour">时</button>
      <button @click="switchData($event)" class="selectedTime" name="day">日</button>
      <button @click="switchData($event)" class="selectedTime" name="week">周</button>
      <button @click="switchData($event)" class="selectedTime" name="month">月</button>
      <button class="decrease" @click="decreaseTime($event)">-</button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  import echarts from  '../../../assets/js/device/require/echarts'
  import '../../../assets/js/device/require/esl.js'

  export default {
    name: 'echart',
    data() {
      return {
        sum: 0,
        index: 1,
        option: {
          title: {
            text: ''
          },
          // 选中部分区域
          brush: {
            brushType: 'lineY',
            throttleType: 'debounce',
            throttleDelay: 200
          },
          grid: {
            // 网格组件距离容器右边的距离
            right: 51,
            height: 'auto',
            width: 'auto',
            left: 83
          },
          // 滚动条
          dataZoom: [
            {
              zoomLock: true,
              startValue: 0,
              endValue: 23,
              bottom: 20,
              // 组件高度
              height: 10,
              dataBackground: {
                areaStyle: {
                  color: '#fafafa'
                },
                lineStyle: {
                  color: '#fafafa'
                }
              },
              textStyle: {
                color: ' #ffffff'
              },
              borderColor: '#ffffff',
              fillerColor: '#e5e5e5',
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#e5e5e5',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
          // 悬浮提示框
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: ''
            },
            backgroundColor: '#fff',
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            shadowBlur: 5,
            shadowColor: 'rgba(255,0,0,0.15)',
            formatter: '点击查看详情',
            textStyle: {
              color: '#555',
              lineHeight: 33,
              fontSize: 12
            }
          },
          xAxis: {
            // 坐标轴
            data: [],
            axisLine: {
              show: false
            },
            // 坐标轴刻度
            axisTick: {
              show: false
            },
            // 网格分隔线
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#555',
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: 'value',
            interval: 20,
            position: 'left',
            offset: 51,
            boundaryGap: [0, 0],
            axisLabel: {
         //     interval: 57,
              textStyle: {
                color: '#555',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false

            },
            // 网格分隔线
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f7f7f7',
                type: 'solid'
              }
            },
            splitArea: {
              interval: 21
            }
          },
          series: [
            {
              type: 'bar',
              data: [],
              barWidth: 8,
              animationDuration: function (idx) {
                // 越往后的数据延迟越大
                return idx * 100
              },
              // 图形上的文本标签
              label: {
                emphasis: {
                  show: true,
                  position: 'top',
                  distance: 6,
                  textStyle: {
                    fontSize: 12,
                    color: '#cb75ff'
                  }
                }
              },
              // 图形样式
              itemStyle: {
                normal: {
                  // 阴影的大小
                  shadowBlur: 30,
                  // 阴影水平方向上的偏移
                  shadowOffsetX: 0,
                  // 阴影垂直方向上的偏移
                  shadowOffsetY: 0,
                  // 阴影颜色
                  shadowColor: 'rgba(159,110,255,0.3)',
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#cc75ff'
                  }, {
                    offset: 1,
                    color: '#7b69ff'
                  }])
                }
              }
            }
          ]
        }
      }
    },
    mounted: function () {
      $('.chartContainer button').mouseenter(function () {
        $(this).css({'color': '#b266ff', 'border-color': '#c6b9ff #debaff'})
      })
      $('.chartContainer button').mouseleave(function () {
        $(this).css({'color': '#ccc', 'border-color': '#ccc'})
      })
      this.myChart = echarts.init(document.getElementById('myChart'))
      this.$http.get('./../../../../static/device/times.json').then(function (res) {
        this.option.xAxis.data = res.body.day.xAxis
        this.option.series[0].data = res.body.day.yAxis
        this.myChart.setOption(this.option)
        $('.selectedTime').eq(1).addClass('times')
      })
      let _this = this
      this.myChart.on('click', function (param) {
        _this.$router.push({path: '/data/overview'})
      })
      // 当选中部分区域的时候，计算选中区域的数值和
      this.myChart.on('brushselected',function (params) {
        // 统计选中项的数据值的和
        let brushComponent = params.batch[0]
        console.log(params)
        let sum = 0
        for (let sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          let dataIndices = brushComponent.selected[sIdx].dataIndex
          for (let i = 0; i < dataIndices.length; i++) {
            let dataIndex = dataIndices[i]
            sum += _this.option.series[0].data[dataIndex]
          }
        }
        this.sum = sum
        _this.$emit('getFromChild', this.sum)
      })
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize: function () {
        this.myChart.resize()
      },
      // 点击时间按钮切换柱状图数据
      switchData: function (event) {
        $(event.currentTarget).addClass('times')
        $(event.currentTarget).siblings('.selectedTime').removeClass('times')
        let btnValue = $(event.currentTarget).attr('name')
        this.$http.get('./../../../../static/device/times.json').then(function (res) {
          if (btnValue === 'hour') {
            this.option.xAxis.data = res.body.hour.xAxis
            this.option.series[0].data = res.body.hour.yAxis
            this.option.brush = {'brush': 'lineY'}
            this.myChart.setOption(this.option)
          } else if (btnValue === 'day') {
            this.option.xAxis.data = res.body.day.xAxis
            this.option.series[0].data = res.body.day.yAxis
            this.option.brush = {'brush': 'lineY'}
            this.myChart.setOption(this.option)
          } else if (btnValue === 'week') {
            this.option.xAxis.data = res.body.week.xAxis
            this.option.series[0].data = res.body.week.yAxis
            this.option.brush = {'brush': 'lineY'}
            this.myChart.setOption(this.option)
          } else if (btnValue === 'month') {
            this.option.xAxis.data = res.body.month.xAxis
            this.option.series[0].data = res.body.month.yAxis
            this.option.brush = {'brush': 'lineY'}
            this.myChart.setOption(this.option)
          }
        })
      },
      // 点击+时间逐渐增加
      creaseTime: function (event) {
        $(event.currentTarget).removeAttr('disabled')
        this.index++
        console.log(this.index)
        console.log($(event.currentTarget))
        if (this.index < $('.selectedTime').length) {
          this.$http.get('./../../../../static/device/times.json').then(function(data){
            this.$http.get('./../../../../static/device/index.json').then(function (res) {
              this.option.xAxis.data = data.body[(res.body.timeIndex)[this.index]].xAxis
              this.option.series[0].data = data.body[(res.body.timeIndex)[this.index]].yAxis
              this.myChart.setOption(this.option)
              $('.selectedTime').eq(this.index).addClass('times')
              $('.selectedTime').eq(this.index).siblings('.selectedTime').removeClass('times')
            })
          })
        } else {
          this.index = 3
        }
      },
      // 点击—时间逐渐减小
      decreaseTime: function (event) {
        $(event.currentTarget).removeAttr('disabled')
        this.index--
        console.log($(event.currentTarget))
        if (this.index < 0) {
          this.index = 0
        } else {
          this.$http.get('./../../../../static/device/times.json').then(function(data){
            this.$http.get('./../../../../static/device/index.json').then(function (res) {
              this.option.xAxis.data = data.body[(res.body.timeIndex)[this.index]].xAxis
              this.option.series[0].data = data.body[(res.body.timeIndex)[this.index]].yAxis
              this.myChart.setOption(this.option)
              $('.selectedTime').eq(this.index).addClass('times')
              $('.selectedTime').eq(this.index).siblings('.selectedTime').removeClass('times')
            })
          })
        }
      }
    },
    watch: {
      setOption: {
        handler: function (newValue, oldValue) {
          if (this.myChart) {
            if (newValue) {
              this.myChart.setOption(newValue)
            } else {
              this.myChart.setOption(oldValue)
            }
            this.myChart.resize()
          }
        }
      }
    }
  }
</script>
<style>
  @media  (min-width:1441px){
    /*-------图表容器------*/
    .chartContainer{
      text-align: left;
      margin:0 39px;
    }
    /*--------图表---------*/
    .chartContainer .chart{
      height: 420px;
    }
    /*-------时间增加按钮-----*/
    .chartContainer div .crease{
      margin-left: 150px;
    }
    /*-------时间减小按钮-----*/
    .chartContainer div .decrease{
      margin-right: 150px;
    }
    /*-------图表下按钮-------*/
    .chartContainer button{
      height: 48px;
      width: 48px;
      border-radius: 24px;
      line-height: 48px;
      border: 1px solid #ccc;
      font-size: 16px;
      color: #ccc;
      display: inline-block;
      background: #ffffff;
      margin: 0 75px;
      margin-top: 27px;
    }
  }
  @media  (min-width:1025px) and (max-width:1440px){
    /*--------图表容器------*/
    .chartContainer{
      text-align: left;
      margin:0 29.25px;
    }
    /*--------图表---------*/
    .chartContainer .chart{
      height: 340px;
    }
    /*--------时间增加按钮-----*/
    .chartContainer div .crease{
      margin-left: 112px;
    }
    /*-------时间减小按钮------*/
    .chartContainer div .decrease{
      margin-right: 112px;
    }
    /*--------图标下按钮------*/
    .chartContainer button{
      height: 36px;
      width: 36px;
      border-radius: 18px;
      line-height: 36px;
      border: 1px solid #ccc;
      font-size: 12px;
      color: #ccc;
      display: inline-block;
      background: #ffffff;
      margin: 0 50px;
      margin-top: 20px;
    }
  }
  @media (max-width:1024px){
    /*-------图表容器-------*/
    .chartContainer{
      text-align: left;
      margin:0 20.67px;
    }
    /*---------图表-------*/
    .chartContainer .chart{
      height: 260px;
    }
    /*-------时间增加按钮------*/
    .chartContainer div .crease{
      margin-left: 95px;
    }
    /*-------时间减小按钮-----*/
    .chartContainer div .decrease{
      margin-right: 95px;
    }
    /*--------图表下按钮-----*/
    .chartContainer button{
      height: 26px;
      width: 26px;
      border-radius: 13px;
      line-height: 26px;
      border: 1px solid #ccc;
      font-size: 10px;
      color: #ccc;
      display: inline-block;
      background: #ffffff;
      margin: 0 35px;
      margin-top: 14px;
    }
  }
  .times{
    color: #b266ff !important;
    border-color: #7c69ff #c474ff !important;
  }
</style>

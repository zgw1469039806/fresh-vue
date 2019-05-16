<template>
<div id="gjh">
        <div id="myChart"></div>
        <div id="zlyg"></div>
</div>


</template>

<script>
    export default {
        name: "water",
        mounted() {
            this.drawLine();

        },
        methods:
            {
                drawLine() {
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = this.$echarts.init(document.getElementById('myChart'));
                    myChart.setOption({
                        title: {text: '店铺营业额一览'},
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: 'red'
                                }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']

                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '国伟店铺',
                                type: 'line',
                                stack: '总量',
                                data: [820, 932, 901, 934, 1290, 1330, 1320,123,1233,2313,432,432]
                            },
                            {
                                name: '家恒店铺',
                                type: 'line',
                                stack: '总量',
                                data: [820, 932, 901, 934, 1290, 1330, 1320,123,1233,2313,432,432]
                            },
                            {
                                name: '铁飞店铺',
                                type: 'line',
                                stack: '总量',
                               data: [820, 932, 901, 934, 1290, 1330, 1320,123,1233,2313,432,432]
                            },
                            {
                                name: '乾航店铺',
                                type: 'line',
                                stack: '总量',
                                 data: [820, 932, 901, 934, 1290, 1330, 1320,123,1233,2313,432,432]
                            },
                            {
                                name: '多劳店铺',
                                type: 'line',
                                stack: '总量',
                                data: [820, 932, 901, 934, 1290, 1330, 1320,123,1233,2313,432,432]
                            }
                        ]
                    });
                }

            }
    }
</script>

<style scoped>


   #gjh{
           width: 100%;
           height: 100%;
   }

    #myChart {
        width: 80%;
        height: 80%;
    }


</style>

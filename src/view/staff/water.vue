<template>
    <div id="gjh">
        <template>
            <div class="block">
                <span class="demonstration">请选择报表日期</span>
                <el-date-picker
                        v-model="Form.selyear"
                        type="date"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" @click="Query">查询</el-button>
            </div>
        </template>
        <div id="myChart"></div>
        <div id="zlyg"></div>
    </div>


</template>

<script>
    export default {
        name: "water",
        data() {
            return {
                lirun: [],
                Form: {
                    selyear: new Date(),
                    storeid: 0
                },
                mendian: []
            }
        },
        created() {
            this.axios.post("/GdStoreQueryAll", {}).then((response) => {
                let data = response.data;
                if (data.msg == '处理成功') {
                    this.mendian = data.data;
                    this.Query();
                }
            }).catch((error) => {
                this.$message.error("Error:" + error)
            })
        },
        mounted() {
            this.drawLine();
        },
        methods: {
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
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: this.lirun
                });
            },
            Query: function () {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.lirun = []
                for (let i = 0; i < this.mendian.length; i++) {
                    var data = {
                        "selyear": this.Form.selyear,//要查询的年份
                        "storeid": this.mendian[i].storeid//门店id
                        // "storeid": 3//门店id

                    }
                    this.axios.post('QueryDeportForm', data).then((response) => {
                        var data = response.data;
                        loading.close();
                        if (data.msg == "处理成功") {
                            var lirun = {
                                name: this.mendian[i].storename,
                                type: 'line',
                                stack: '总量',
                                data: data.data
                            }
                        }
                        this.lirun.push(lirun);
                        this.drawLine();
                    }).catch((error) => {
                        loading.close();
                        this.$message.error("Error:" + error)
                    })
                }
            },
        }
    }
</script>

<style scoped>


    #gjh {
        margin: 0px auto;
        width: 100%;
        height: 100%;
    }

    #myChart {
        width: 80%;
        height: 80%;
    }


</style>

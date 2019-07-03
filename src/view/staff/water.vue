<template>
    <div id="gjh">
        <template>
            <div>
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
        <div class="xiaoshou">今日销售额: <span style="margin-left: 10px;display: inline-block;color: #409EFF">{{xiaoshou}}</span> 元</div>
        <div id="myChart"></div>
        <div id="zlyg"></div>
    </div>


</template>

<script>

    import Constant from "../../Constant.js";

    export default {
        name: "water",
        data() {
            return {
                lirun: [],
                Form: {
                    selyear: new Date(),
                    storeid: 0
                },
                mendian: [],
                xiaoshou:0
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
            });
            // const h = this.$createElement;

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
                        this.$notify({
                            title: '畅销排行榜:',
                            message: '<div style="color: #67C23A;">宁夏甜王西瓜 <br/> 福缘笨鸡蛋 <br/> 百事可乐300ml装 <br/> 乐怡水蜜桃</div>',
                            duration: 30000,
                            dangerouslyUseHTMLString: true
                        });
                        setTimeout(() => {
                            this.$notify({
                                title: '滞销排行榜:',
                                message: '<div style="color: #F56C6C;">宁夏甜王西瓜 <br/> 福缘笨鸡蛋 <br/> 百事可乐300ml装 <br/> 乐怡水蜜桃</div>',
                                duration: 30000,
                                dangerouslyUseHTMLString: true
                            });
                        }, 100)
                        this.lirun.push(lirun);
                        this.drawLine();
                        this.xiaoshou = Constant.xiaoshou;
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
        height: 50vw;
    }

    #gjh:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
    }

    #myChart {
        position: absolute;
        bottom: 2vw;
        width: 70%;
        height: 70%;
    }

    .xiaoshou {
        position: absolute;
        right: 30vw;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 20px;
    }
</style>

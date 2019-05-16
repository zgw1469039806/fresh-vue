<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="订单号：">
                    <el-input v-model="Form.orderId"></el-input>
                </el-form-item>

                <el-form-item label="会员号：">
                    <el-input v-model="Form.vipPhone"></el-input>
                </el-form-item>

                <el-form-item label="日期：">
                    <el-date-picker
                            v-model="Form.startTime"
                            type="date"
                            placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker
                            v-model="Form.endTime"
                            type="date"
                            placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态：">
                    <el-select v-model="Form.orderStat" placeholder="全部">
                        <el-option
                                v-for="item in orderStart"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-button style="margin-left: 5px" type="primary" @click="chaxun1()">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData.list"
                        style="width: 100%"
                        @row-click="selOrder"
                >
                    <el-table-column
                            label="序号"
                            type="index">
                    </el-table-column>

                    <el-table-column
                            label="订单编号"
                            prop="orderid"
                            width="200px">
                    </el-table-column>

                    <el-table-column
                            label="会员手机号"
                            prop="vipId">
                    </el-table-column>

                    <el-table-column
                            label="交易方式"
                            prop="ordermeans"> <!--现金、支付宝、微信-->
                    </el-table-column>

                    <el-table-column
                            label="交易类型"
                            prop="ordertype"> <!--消费、退款-->
                    </el-table-column>


                    <el-table-column
                            sortable
                            label="交易金额"
                            prop="ordermoney">
                    </el-table-column>

                    <el-table-column
                            sortable
                            label="交易时间"
                            prop="orderTime">
                    </el-table-column>

                    <el-table-column
                            label="订单状态"
                            prop="orderStat"> <!--消费、退款-->
                    </el-table-column>

                    <!--<el-table-column
                            label="描述"
                            prop="desc">
                    </el-table-column>-->
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="Form.pageNo"
                            :page-size="Form.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="tableData.totalCount"><!--  -->
                    </el-pagination>
                </div>
            </template>
            <el-dialog
                    title="订单详情"
                    :visible.sync="dialogVisible"
                    :close-on-click-modal="false">
                <div slot="footer" >

                    <template>
                        <el-table
                                :data="tableData1"
                                style="width: 100%;margin-top: -80px;">
                            <el-table-column
                                    label="序号"
                                    type="index">
                            </el-table-column>

                            <el-table-column
                                    label="商品编号"
                                    prop="orderId">
                            </el-table-column>

                            <el-table-column
                                    label="商品名称"
                                    prop="goodsName">
                            </el-table-column>

                            <el-table-column
                                    label="商品规格"
                                    prop="goodsGuige">
                            </el-table-column>

                            <el-table-column
                                    label="商品数量"
                                    prop="goodsNum">
                            </el-table-column>

                            <el-table-column
                                    label="商品单价"
                                    prop="goodsPrice">
                            </el-table-column>

                        </el-table>
                    </template>

                    <div >
                        <h5 class="flot_left">收货地址：</h5>
                        <p class="close_left flot_left ">{{ordAddress}}</p>
                        <h5 class="close_left flot_left">修改订单状态：</h5>
                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '待发货'"
                                @click="fahuo()"
                        >立即发货</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已发货'"
                        >已发货</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '未支付'"
                        >未支付</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已完成'"
                        >已完成</el-button>


                    </div>

                    <div style="clear: left;">
                        <el-button @click.native="dialogVisible = false">取消</el-button>
                        <el-button type="primary" >确定</el-button>
                    </div>

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderrepost",
        data(){
            return{

                //TODO：线上分页
                tableData: null,
                tableData1:null,
                Form: {
                    orderId: '',
                    startTime: null,
                    endTime: null,
                    orderStat: -1,
                    storeId: 0,
                    vipPhone: '',
                    orderScene: 0, //交易场景 0-线上
                    pageNo: 1,
                    pageSize: 10,
                },
                dialogVisible:false,     //模态框是否显示
                //addLoading: false,      //是否显示loading
                orderStart: [
                {
                    value: -1,
                    label: '全部'
                },{
                    value: 0,
                    label: '待付款'
                },{
                    value: 1,
                    label: '待发货'
                }, {
                    value: 2,
                    label: '已取消'
                }, {
                    value: 3,
                    label: '已发货'
                }, {
                    value: 4,
                    label: '已完成'
                }, {
                    value: 6,
                    label: '挂单中'
                }],

                updordstart:null ,//订单详情 -- 订单状态 -- 修改
                ordAddress:null ,//订单详情 -- 订单地址
                updOrderId: null
            }

        }, methods: {
            chaxun1(){
                if (this.Form.startTime != null) {
                    this.Form.startTime = (this.Form.startTime).format("yyyy-MM-dd");
                }
                if (this.Form.endTime != null) {
                    this.Form.endTime = (this.Form.endTime).format("yyyy-MM-dd");
                }
                window.console.log(this.Form.startTime+","+this.Form.endTime);
                this.onOrderPage();
            },
            selOrder(row, event, column){
                alert("订单编号："+row.orderId);
                this.dialogVisible = true;
                this.updordstart = row.orderState
                this.updOrderId = row.updOrderId
                this.ordAddress = row.orderAddress
                row,event, column
            },

            fahuo(){
              alert("点击待发货，订单状态改为已发货");
              //重新调用查询方法 ，刷新数据
            },

            //一页多少条改变
            handleSizeChange(index) {
                index
            },
            handleCurrentChange(index) {
                index
            },
            onOrderPage(){
                this.axios.post("/selOrderPage", {
                    "data": this.Form,
                })
                    .then((response) => {
                        if (response.data.code == 0) {
                            this.tableData = response.data.data;
                        } else {
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            }

        },created() {
            this.Form.storeId = this.$route.params.md;
            this.onOrderPage();
        }
    }

    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "H+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .flot_left{
        float: left;
    }
    .close_left{
        clear: left;
    }

</style>

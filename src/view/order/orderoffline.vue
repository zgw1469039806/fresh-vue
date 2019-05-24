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
                    <el-select v-model="Form.orderStat" placeholder="请选择">
                        <el-option
                                v-for="item in orderState"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-button style="margin-left: 5px" type="success" @click="chaxun()">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData.list"
                        style="width: 100%"
                        @row-click="selOrder">

                    <el-table-column
                            label="序号"
                            type="index">
                    </el-table-column>

                    <el-table-column
                            label="订单编号"
                            width="200px"
                            prop="orderid">
                    </el-table-column>

                    <el-table-column
                            label="会员手机号"
                            prop="vipId">
                        <template slot-scope="scope">
                            <span v-if="scope.row.vipId == null || scope.row.vipId == ''">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="交易方式"
                            prop="ordermeans"> <!--(1-会员余额，2-支付宝，3-微信，4-现金-->
                        <template slot-scope="scope">
                            <span v-if="scope.row.ordermeans == 1">会员余额</span>
                            <span v-if="scope.row.ordermeans == 2">支付宝</span>
                            <span v-if="scope.row.ordermeans == 3">微信</span>
                            <span v-if="scope.row.ordermeans == 4">现金</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="交易类型"
                            prop="ordertype"> <!--0消费、1退款-->
                        <template slot-scope="scope">
                            <span v-if="scope.row.ordertype == 0">消费</span>
                            <span v-if="scope.row.ordertype == 1">退款</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            sortable
                            label="应付金额"
                            prop="ordermoney">
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="实付金额"
                        prop="comditytrueprice">
                    </el-table-column>

                    <el-table-column
                        sortable
                        label="抹零金额"
                        prop="gchange">
                    </el-table-column>

                    <el-table-column
                            label="交易状态"
                            prop="orderStat">
                        <template slot-scope="scope">
                            <!--  0:待付款   1:已付款/待发货   2:已取消  3:已发货/待确认  4:已完成 ，5：申请退款,6:挂单中 7：已退款-->
                            <span v-if="scope.row.orderStat == 0">待付款</span>
                            <span v-if="scope.row.orderStat == 1">已付款</span>
                            <span v-if="scope.row.orderStat == 2">已取消</span>
                            <span v-if="scope.row.orderStat == 3">已发货</span>
                            <span v-if="scope.row.orderStat == 4">已完成</span>
                            <span v-if="scope.row.orderStat == 5">申请退款</span>
                            <span v-if="scope.row.orderStat == 6">挂单中</span>
                            <span v-if="scope.row.orderStat == 7">已退款</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            sortable
                            label="交易时间"
                            prop="orderTime">
                    </el-table-column>


                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="Form.pageNo"
                            :page-size="Form.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="tableData.totalCount">
                    </el-pagination>
                </div>
            </template>
            <el-dialog
                    title="订单详情"
                    :visible.sync="dialogVisible"
                    :close-on-click-modal="false">
                <div slot="footer">

                    <template>
                        <el-table
                                :data="tableData1"
                                style="width: 100%;margin-top: -80px;"
                        >
                            <el-table-column
                                    label="序号"
                                    type="index">
                            </el-table-column>

                            <el-table-column
                                    label="商品编号"
                                    prop="comdityId">
                            </el-table-column>

                            <el-table-column
                                    label="商品名称"
                                    prop="comdityname">
                            </el-table-column>

                            <el-table-column
                                    label="商品规格"
                                    prop="comditydw">
                            </el-table-column>

                            <el-table-column
                                    label="商品数量"
                                    prop="num">
                            </el-table-column>

                            <el-table-column
                                    label="优惠方式"
                                    prop="preferentialway">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.preferentialway == 0">原价</span>
                                    <span v-if="scope.row.preferentialway == 1">会员价</span>
                                    <span v-if="scope.row.preferentialway == 2">活动价</span>
                                </template>
                            </el-table-column>

                        </el-table>
                    </template>

                    <div>
                        <h5 class="close_left flot_left">修改订单状态：</h5>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '挂单中' || updordstart == 6"
                                @click="goPay()"
                        >确认付款
                        </el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已完成' || updordstart == 4 "
                        >已完成
                        </el-button>

                    </div>

                    <div style="clear: left;">
                        <!--<el-button @click.native="dialogVisible = false">取消</el-button>
                        <el-button type="primary" >确定</el-button>-->
                    </div>

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderoffline",
        data() {
            return {
                tableData: null, //订单
                tableData1: [],//订单详情
                Form: {
                    orderId: '',
                    startTime: null,
                    endTime: null,
                    orderStat: -1,
                    storeId: 0,
                    vipPhone: '',
                    orderScene: 1, //交易场景 1-线下
                    pageNo: 1,
                    pageSize: 10,
                },
                /*page: {
                    total: 20,
                    current: 1,
                },*/
                dialogVisible: false,     //模态框是否显示
                //addLoading: false,      //是否显示loading
                orderState: [
                    {
                        value: -1,
                        label: '全部'
                    },
                    {
                        value: 4,
                        label: '已完成'
                    }, {
                        value: 6,
                        label: '挂单中'
                    }],
                updordstart: null,//订单详情 -- 订单状态 -- 修改
                updOrderId: null
            }

        }, methods: {
            chaxun() {

                this.orderPage();

            },
            selOrder(row, event, column) {
                row, event, column
                this.dialogVisible = true;
                this.updordstart = row.orderStat
                this.updOrderId = row.orderid

                this.axios.post("/selOrderShopById", {
                    "data": row.orderid,
                })
                    .then((response) => {
                        if (response.data.code == 0) {
                            // 动态赋值
                            let data = response.data.data;
                            let comList = data["comList"];
                            let ordList = data["ordList"];
                            for (let i = 0; i < ordList.length; i++) {
                                for (let j = 0; j < comList.length; j++) {
                                    if (ordList[i].comdityId == comList[j].comdityId) {
                                        ordList[i].comditydw = comList[j].comditydw;
                                        ordList[i].comdityname = comList[j].comdityname;
                                    }
                                }
                            }
                            this.tableData1 = ordList;

                        } else {
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            },

            goPay() {
                //根据订单编号修改订单状态 已完成
                this.axios.post("/updOrderStartById", {
                    "data": {
                        "ordStart": 4,
                        "orderId": this.updOrderId
                    },
                })
                    .then((response) => {
                        if (response.data.code == 0) {
                            window.location.reload();
                        } else {
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })

            },
            //一页多少条改变
            handleSizeChange(index) {
                index
            },
            handleCurrentChange(index) {
                index
            },
            orderPage() {
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

        }, created() {
            this.Form.storeId = this.$route.params.md;
            this.orderPage();
        }
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

    .flot_left {
        float: left;
    }

    .close_left {
        clear: left;
    }
</style>
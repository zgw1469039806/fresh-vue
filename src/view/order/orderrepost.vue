<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="订单号：">
                    <el-input v-model="upForm.orderId"></el-input>
                </el-form-item>

                <el-form-item label="会员号：">
                    <el-input v-model="upForm.vipPhone"></el-input>
                </el-form-item>

                <el-form-item label="日期：">
                    <el-date-picker
                            v-model="upForm.startTime"
                            type="date"
                            placeholder="开始时间">
                    </el-date-picker>
                    <el-date-picker
                            v-model="upForm.endTime"
                            type="date"
                            placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态：">
                    <el-select v-model="upForm.orderStat" placeholder="全部">
                        <el-option
                                v-for="item in orderStart"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-button style="margin-left: 5px" type="success" @click="chaxun1()">查询</el-button>
            </el-form>
            <template >
                <el-table
                        :data="tableData.list"
                        style="width: 100%"
                        @row-click="upSelOrder"
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
                        <template slot-scope="scope">
                            <span v-if="scope.row.vipId == null || scope.row.vipId == ''">无</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="交易方式"
                            prop="ordermeans"> <!--现金、支付宝、微信-->
                        <template slot-scope="scope">
                            <span v-if="scope.row.ordermeans == 1">会员余额</span>
                            <span v-if="scope.row.ordermeans == 2">支付宝</span>
                            <span v-if="scope.row.ordermeans == 3">微信</span>
                            <span v-if="scope.row.ordermeans == 4">现金</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="交易类型"
                            prop="ordertype"> <!--消费、退款-->
                        <template slot-scope="scope">
                            <span v-if="scope.row.ordertype == 0">消费</span>
                            <span v-if="scope.row.ordertype == 1">退款</span>
                        </template>
                    </el-table-column>


                    <el-table-column
                            sortable
                            label="总价"
                            prop="ordermoney">
                    </el-table-column>

                    <el-table-column
                            sortable
                            label="交易时间"
                            prop="orderTime">
                    </el-table-column>

                    <el-table-column
                            label="订单状态"
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

                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="upForm.pageNo"
                            :page-size="upForm.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="tableData.totalCount">
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

                            <!--<el-table-column
                                    label="商品单价"
                                    prop="comPrice">
                            </el-table-column>-->

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
                    <!--订单状态  0:待付款   1:已付款/待发货   2:已取消  3:已发货/待确认  4:已完成 ,6:挂单中-->
                    <div >
                        <h5 class="flot_left">收货地址：</h5>
                        <p class="close_left flot_left ">{{ordAddress}}</p>
                        <h5 class="close_left flot_left"><br/>联系人：</h5>
                        <p class="close_left flot_left ">{{ordPhone}}</p>
                        <h5 class="close_left flot_left">修改订单状态：</h5>
                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '待发货' || updordstart == 1"
                                @click="fahuo()"
                        >立即发货</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已发货' || updordstart == 3"
                        >已发货</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '待付款' || updordstart == 0"
                        >未支付</el-button>

                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已完成' || updordstart == 4"
                        >已完成</el-button>
                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '申请退款' || updordstart == 5"
                                @click="tuikuan()"
                        >同意退款</el-button>
                        <el-button
                                class="close_left flot_left"
                                v-if="updordstart == '已退款' || updordstart == 7"
                        >已退款</el-button>


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
        name: "orderrepost",
        data(){
            return{

                //TODO：线上分页
                tableData: null,
                tableData1:null,
                upForm: {
                    orderId: '',
                    startTime: null,
                    endTime: null,
                    orderStat: -1,
                    storeId: 0,
                    vipPhone: '',
                    orderScene: 2, //交易场景 0-线上
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
                },{
                    value: 5,
                    label: '申请退款'
                }, {
                    value: 6,
                    label: '挂单中'
                }, {
                    value: 7,
                    label: '已退款'
                }],

                updordstart:null ,//订单详情 -- 订单状态 -- 修改
                ordAddress:null ,//订单详情 -- 订单地址
                updOrderId: null,
                ordPhone:null
            }

        }, methods: {
            chaxun1(){
                this.onOrderPage();
            },
            upSelOrder(row, event, column){
                this.dialogVisible = true;
                this.updordstart = row.orderStat;
                this.updOrderId = row.orderid;
                this.ordAddress = row.address;
                this.ordPhone = row.phone;
                row,event, column
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

            fahuo(){
                this.updOrderStart(this.updOrderId , 3);
            },
            tuikuan(){
                this.updOrderStart(this.updOrderId , 7);
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
                    "data": this.upForm,
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
            },
            updOrderStart(orderId , orderStart){
                this.axios.post("/updOrderStartById", {
                    "data": {
                        "ordStart": orderStart,
                        "orderId": orderId
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

            }

        },created() {
            this.upForm.storeId = this.$route.params.md;
            this.onOrderPage();
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
    .flot_left{
        float: left;
    }
    .flot_right{
        float:right;
    }
    .close_left{
        clear: left;
    }
    .close_none{
        clear:none;
    }

</style>

<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="订单号：">
                    <el-input v-model="Form.orderId"></el-input>
                </el-form-item>

                <el-form-item label="日期：">
                    <el-date-picker
                            v-model="Form.statictime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="店铺：">
                    <el-select v-model="Form.orStoreValue" placeholder="请选择">
                        <el-option
                                v-for="item in orStore"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="会员号：">
                    <el-input v-model="Form.vipId"></el-input>
                </el-form-item>


                <el-button style="margin-left: 5px" type="primary" >查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        @row-click="selOrder"
                >

                    <el-table-column
                            label="序号"
                            type="index">
                    </el-table-column>

                    <el-table-column
                            label="订单编号"
                            prop="orderId">
                    </el-table-column>

                    <el-table-column
                            label="会员编号"
                            prop="vipId">
                    </el-table-column>

                    <el-table-column
                            label="交易方式"
                            prop="dealWay"> <!--现金、支付宝、微信-->
                    </el-table-column>

                    <el-table-column
                            label="交易类型"
                            prop="dealType"> <!--消费、退款-->
                    </el-table-column>


                    <el-table-column
                            sortable
                            label="交易金额"
                            prop="orderMoney">
                    </el-table-column>

                    <el-table-column
                            sortable
                            label="交易时间"
                            prop="orderDate">
                    </el-table-column>


                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5, 10]"
                            :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.total">
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
                        <h5 class="close_left flot_left">修改订单状态：</h5>

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
        name: "orderoffline",
        data(){
            return{

                tableData: [
                    {
                        orderId: '1a23123',
                        vipId: '00001',
                        dealWay: '支付宝',
                        dealType: '消费',
                        orderDate: '2019-12-12',
                        orderMoney:'567.00',
                        orderState:'未支付',

                    },
                    {
                        orderId: '9876543',
                        vipId: '',
                        dealWay: '微信',
                        dealType: '消费',
                        orderMoney:'789.00',
                        orderDate: '2019-12-11',
                        orderState:'已完成',
                    }
                ],
                tableData1:[{
                    orderId:'232301',
                    goodsName:'可口可乐',
                    goodsGuige:'瓶',
                    goodsNum:4,
                    goodsPrice:2.98

                },{
                    orderId:'232302',
                    goodsName:'芒果干',
                    goodsGuige:'袋',
                    goodsNum:2,
                    goodsPrice:9.98
                }],
                Form: {
                    name: '',
                    statictime:'',
                    endtime:'',
                    orStoreValue:'', //订单所属店铺
                    vipId:''
                },
                page: {
                    total: 20,
                    current: 1,

                },
                dialogVisible:false,     //模态框是否显示
                //addLoading: false,      //是否显示loading
                orStore: [
                    {
                        value: '1',
                        label: '店铺1'
                    },{
                        value: '2',
                        label: '店铺2'
                    }],
                updordstart:null ,//订单详情 -- 订单状态 -- 修改
            }

        }, methods: {

            selOrder(row, event, column){
                alert("订单编号："+row.orderId);
                this.dialogVisible = true;
                this.updordstart = row.orderState
                row,event, column
            },

            //单机编辑
            updateRow(index, rows) {
                index,rows
                this.$router.push({name: 'staffinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                index
                // console.log("index:"+index)
            }
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
    .close_left{
        clear: left;
    }
</style>
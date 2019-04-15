<template>
    <div id="app">
        <div>
            <div class="froms">
                <el-form :inline="true" class="danhao" ref="Form" label-width="80px">
                    <el-form-item label="单号:">
                        <el-input v-model="Form.replenishId"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <el-select v-model="Form.zt" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-date-picker
                            v-model="Form.statictime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button style="margin-left: 5px" type="success">查询</el-button>
                    <el-button type="success">新增</el-button>
                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="进货单号:">
                                    <span>{{ props.row.replenishId }}</span>
                                </el-form-item>
                                <el-form-item label="所属门店:">
                                    <span>{{ props.row.storeid}}</span>
                                </el-form-item>
                                <el-form-item label="供应商编号:">
                                    <span>{{ props.row.gongyingid }}</span>
                                </el-form-item>
                                <el-form-item label="供应商名称:">
                                    <span>{{ props.row.gongying }}</span>
                                </el-form-item>
                                <el-form-item label="制单人员:">
                                    <span>{{ props.row.userId }}</span>
                                </el-form-item>
                                <el-form-item label="制单时间:">
                                    <span>{{ props.row.replenishTime}}</span>
                                </el-form-item>
                                <el-form-item label="入库时间:">
                                    <span>{{ props.row.storageTime }}</span>
                                </el-form-item>
                                <el-form-item label="入库人员:">
                                    <span>{{ props.row.storageuserid }}</span>
                                </el-form-item>
                                <el-form-item label="备注:">
                                    <span>{{ props.row.beizhu }}</span>
                                </el-form-item>
                                <el-form-item label="单据金额:">
                                    <span>{{ props.row.money }}</span>
                                </el-form-item>
                                <el-form-item label="状态:">
                                    <span>{{ props.row.zhuangtai }}</span>
                                </el-form-item>
                                <el-form-item label="商品详细:">
                                    <span>{{ props.row.commodity }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="进货单号"
                            prop="replenishId">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="所属门店"
                            prop="storeid">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="供应商名称"
                            prop="gongying">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="制单人员"
                            prop="zhidan">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="制单时间"
                            prop="replenishTime">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="送达时间"
                            prop="storageTime">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchasereport",
        data() {
            return {
                tableData: [
                    {
                        replenishId: 'SWA544884',//进货单号
                        storeid: '1',//所属店铺ID
                        gongyingid: 'DDAWS554',//供应商编号
                        gongying: '双汇肉类批发',//供应商
                        zhidan: '1',//制单人员
                        replenishTime: '2019-10-10',//制单时间
                        storageTime: '2019-10-15',//入库时间
                        storageuserid: '1',//入库人员
                        beizhu: '双汇王中王，火腿肠中的战斗肠',//备注
                        zhuangtai: '未收货',//收获状态
                        money: '44885',//单据金额
                        commodity: '1'//商品详细
                    },
                    {
                        replenishId: 'FGW8585',
                        storeid: '2',
                        gongyingid: 'FGWA5422',
                        gongying: '阿强哥鱼类批发',
                        zhidan: '2',
                        replenishTime: '2019-11-13',
                        storageTime: '2019-6-25',
                        storageuserid: '3',
                        beizhu: '阿强鱼类批发，鱼类批发中的战斗批发',
                        zhuangtai: '已收货',
                        money: '66489',
                        commodity: '2'
                    }
                ],
                Form: {
                    replenishId: '',//单号
                    statictime: '',//日期范围
                    zt: '-1'//状态
                },
                page: {
                    total: 20,
                    current: 1,
                },
                options: [
                    {
                        value: '-1',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '未入库'
                    },
                    {
                        value: '1',
                        label: '已入库'
                    }
                ]
            }
        }, methods: {

            //单机编辑
            updateRow(index, rows) {
                index + "";
                rows + ''
                this.$router.push({name: 'staffinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index + 0
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                index + 0
                // console.log("index:"+index)
            }
        }, created: function () {
            var commodity = [
                {
                    comdityname: '双汇王中王',//商品名称
                    num: 12,//进货数量
                    comditydw: '箱',//商品单位
                },
                {
                    comdityname: '阿里巴巴深海鲍鱼',
                    num: 24,
                    comditydw: '箱',
                }
            ]
            for (let i = 0; i < commodity.length; i++) {
                this.tableData[i].commodity = '商品名:' + commodity[i].comdityname + "\t购入数量:" + commodity[i].num + commodity[i].comditydw
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

    #app {
        border: 1px solid #67c23a;
        width: 75vw;
        border-radius: 5px;
        margin: 0px auto;
        display: flex;
        justify-content: center;
    }

    #app:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .froms {
        width: 75vw;
        border-bottom: 1px solid #67c23a;
    }
    .danhao{
        margin-top: 10px;
    }
</style>
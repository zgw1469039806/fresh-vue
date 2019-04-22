<template>
    <div id="app">
        <div>
            <div class="froms">
                <el-form :inline="true" class="danhao" ref="Form" label-width="80px">
                    <el-form-item label="商品名:">
                        <el-input v-model="Form.goodsName"></el-input>
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

                    <el-form-item label="店铺:">
                        <el-select v-model="Form.shopping" placeholder="请选择">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-button style="margin-left: 5px" type="success">查询</el-button>

                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="商品编号"
                            prop="goodsId">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="goodsName">
                    </el-table-column>
                    <el-table-column
                            label="商品规格"
                            prop="goodsGuiGe">
                    </el-table-column>

                    <el-table-column
                            label="商品售价"
                            prop="goodsPrice">
                    </el-table-column>

                    <el-table-column
                            label="商品库存"
                            prop="goodsStock">
                    </el-table-column>

                    <el-table-column
                            label="所属店铺"
                            prop="goodsShopping">
                    </el-table-column>

                    <el-table-column
                            label="商品状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.goodsState == '1'">上架中</span>
                            <span v-if="scope.row.goodsState == '2'">下架中</span>
                        </template>

                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    v-if="scope.row.goodsState == '1'"
                                    @click="upGoods(scope.row)">下架
                            </el-button>
                            <el-button v-if="scope.row.goodsState == '2'" @click="downGoods(scope.row)">上架</el-button>
                        </template>

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
        name: "commodityUpDown",
        data() {
            return {
                tableData: [
                    {
                        goodsId: '12345678',//进货单号
                        goodsName: '苹果',//商品名称
                        goodsGuiGe: '箱',//商品规格
                        goodsPrice: '23',//售价
                        goodsStock: '99',//库存
                        goodsState: '1',//商品状态
                        goodsShopping:'九都路分店'
                    },
                    {
                        goodsId: '8765432',//进货单号
                        goodsName: '鱼',//商品名称
                        goodsGuiGe: 'kg',//商品规格
                        goodsPrice: '45',//售价
                        goodsStock: '99',//库存
                        goodsState: '2',//商品状态
                        goodsShopping:'天津路分店'
                    }
                ],
                Form: {
                    goodsName: '',//单号
                    zt: '1',//状态
                    shopping:'1'
                },
                page: {
                    total: 20,
                    current: 1,
                },
                options: [
                    {
                        value: '1',
                        label: '上架中'
                    },
                    {
                        value: '2',
                        label: '下架中'
                    }
                ],
                options1:[
                    {
                        value: '1',
                        label: '门店1'
                    },
                    {
                        value: '2',
                        label: '门店2'
                    }
                ]
            }
        }, methods: {

            upGoods(row){
                alert(row.goodsId)
            },
            downGoods(row){
                alert(row.goodsId)
            },

            //单机编辑
            updateRow(index, rows) {
                index + "";
                rows + ''

            },
            //一页多少条改变
            handleSizeChange(index) {
                index + 0
            },
            handleCurrentChange(index) {
                index + 0
            }
        }, created: function () {

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
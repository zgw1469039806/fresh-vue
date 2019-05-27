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
                            <el-option label="全部" value=""></el-option>
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
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                    v-for="item in options1"
                                    :key="item.storeid"
                                    :label="item.storename"
                                    :value="item.storeid">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-button style="margin-left: 5px" type="success" @click="Query">查询</el-button>

                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">

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
                            label="商品售价"
                            prop="comdityprice">
                    </el-table-column>

                    <el-table-column
                            label="商品库存"
                            prop="stock">
                    </el-table-column>

                    <el-table-column
                            label="所属店铺"
                            prop="ssmdName">
                    </el-table-column>

                    <el-table-column
                            label="商品状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.comstate == '1'">上架中</span>
                            <span v-if="scope.row.comstate == '0'">下架中</span>
                        </template>

                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    v-if="scope.row.comstate == '1'"
                                    @click="upGoods(scope.row)">下架
                            </el-button>
                            <el-button v-if="scope.row.comstate == '0'" @click="downGoods(scope.row)">上架</el-button>
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
                        comdityId: '1',//商品ID
                        isnodiscount: '0',//是否打折
                        stock: '13',//库存数量
                        corresponding: '63',
                        ssmdName: '25',//所属店铺
                        comditytypeId: '1',
                        typename: "干果",//分类名称
                        comdityname: "核桃",//商品名称
                        comditydw: '斤',//单位
                        comditydescribe: '格调干果，吃了以后，比刘翔快，比姚明高',//商品描述
                        comdityprice: '1500'//商品单价
                    }
                ],
                Form: {
                    goodsName: '',//单号
                    zt: '1',//状态
                    shopping: '1'
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
                        value: '0',
                        label: '下架中'
                    }
                ],
                options1: [
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
            upGoods(row) {
                var data = {
                    "data": {
                        "comdityId": row.comdityId,
                        "comstateId": 0,
                        "storeId": row.storeid
                    }
                }
                const $loadinged = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios.post('/StartAndDwon', data).then((response) => {
                    $loadinged.close();
                    if (response.data.msg == "修改状态成功") {
                        this.$message.success("处理成功!")
                    } else {
                        this.$message.warning("处理失败!")
                    }
                }).catch((error)=>{
                    $loadinged.close();
                    this.$message.error("Error:"+error)
                })
            },
            downGoods(row) {
                var data = {
                    "data": {
                        "comdityId": row.comdityId,
                        "comstateId": 1,
                        "storeId": row.storeid
                    }
                }
                const $loadinged = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios.post('/StartAndDwon', data).then((response) => {
                    $loadinged.close();
                    if (response.data.msg == "修改状态成功") {
                        this.$message.success("处理成功!")
                    } else {
                        this.$message.warning("处理失败!")
                    }
                }).catch((error)=>{
                    $loadinged.close();
                    this.$message.error("Error:"+error)
                })
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
            },
            Query: function () {
                var data = {
                    "data": {
                        "comdityname": this.Form.goodsName,
                        "storeid": this.Form.shopping,
                        "comstate": this.Form.zt

                    },
                }
                this.axios.post('/QueryShopByWh', data).then((response) => {
                    if (response.data.msg == "处理成功") {
                        var data = response.data.data;
                        this.tableData = data;
                    }
                }).catch((error) => {
                    if (error != null) {
                        this.$message.error("Error:" + error)
                    }
                })
            },
        }, created: function () {
            const $loadinged = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.Query();
            this.axios.post('/GdStoreQueryAll', {})
                .then((response) => {
                    $loadinged.close();
                    var data = response.data.data;
                    if (response.data.msg == "处理成功") {
                        this.options1 = data;
                    }
                })
                .catch((error) => {
                    $loadinged.close();
                    if (error != null) {
                        this.$message.error("Error:" + error)
                    }
                })
        }
    }
</script>

<style scoped>

</style>
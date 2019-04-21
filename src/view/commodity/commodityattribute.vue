<template>
    <div>
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-select v-model="Form.md">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="万达店" value="wdd"></el-option>
                    <el-option label="老城店" value="lcd"></el-option>
                </el-select>
                <el-button style="margin-left: 5px" type="primary">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :border="true"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="center" inline class="demo-table-expand">
                                <el-form-item label="商品ID:">
                                    <span>{{ props.row.comdityId }}</span>
                                </el-form-item>
                                <el-form-item label="商品名称:">
                                    <span>{{ props.row.comdityname }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺:">
                                    <span>{{ props.row.ssdp }}</span>
                                </el-form-item>
                                <el-form-item label="库存数量:">
                                    <span>{{ props.row.stock }}</span>
                                </el-form-item>
                                <el-form-item label="所属分类:">
                                    <span>{{ props.row.typename }}</span>
                                </el-form-item>
                                <el-form-item label="商品单位:">
                                    <span>{{ props.row.comditydw }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述:">
                                    <el-input v-model="props.row.comditydescribe"></el-input>
                                </el-form-item>
                                <el-form-item label="商品单价:">
                                    <el-input v-model="props.row.comdityprice"></el-input>
                                </el-form-item>
                                <el-form-item label="会员是否可享折扣:">
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==0"><el-button type="text">否</el-button></span>
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==1"><el-button type="text">是</el-button></span>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text"> 保存修改 </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="商品ID"
                            prop="comdityId">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="商品名称"
                            prop="comdityname">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="是否打折"
                            prop="isnodiscount">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="库存数量"
                            prop="stock">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="所属店铺"
                            prop="ssdp">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="操作">
                        <el-button type="success" size="mini">删除商品</el-button>
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
        name: "commodityattribute",
        data() {
            return {
                tableData: [
                    {
                        comdityId: '1',//商品ID
                        isnodiscount: '0',//是否打折
                        stock: '13',//库存数量
                        corresponding: '63',
                        ssdp: '25',//所属店铺
                        comditytypeId: '1',
                        typename: "干果",//分类名称
                        comdityname: "核桃",//商品名称
                        comditydw: '斤',//单位
                        comditydescribe: '格调干果，吃了以后，比刘翔快，比姚明高',//商品描述
                        comdityprice: '1500'//商品单价
                    },
                    {
                        comdityId: '1',//商品ID
                        isnodiscount: '0',//是否打折
                        stock: '13',//库存数量
                        corresponding: '63',
                        ssdp: '25',//所属店铺
                        comditytypeId: '1',
                        typename: "干果",//分类名称
                        comdityname: "核桃",//商品名称
                        comditydw: '斤',//单位
                        comditydescribe: '格调干果，吃了以后，比刘翔快，比姚明高',//商品描述
                        comdityprice: '1500'//商品单价
                    }
                ],
                Form: {
                    name: '',
                    md: ''
                },
                page: {
                    total: 20,
                    current: 1,

                },
            }
        }, methods: {

            //单机编辑
            updateRow(index, rows) {
                index, rows
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
            },
            vipchang: function (row) {//vip是否可享折扣
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].comdityId == row.comdityId) {
                        if (this.tableData[i].isnodiscount == 0) {
                            this.tableData[i].isnodiscount = 1;
                        } else {
                            this.tableData[i].isnodiscount = 0;
                        }
                        break;
                    }
                }
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
</style>
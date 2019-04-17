<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="Form.name"></el-input>
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
                <el-button style="margin-left: 5px" type="primary">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品ID:">
                                    <span>{{ props.row.comdityId }}</span>
                                </el-form-item>
                                <el-form-item label="操作日期:">
                                    <span>{{ props.row.date }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺:">
                                    <span>{{ props.row.store }}</span>
                                </el-form-item>
                                <el-form-item label="员工职务:">
                                    <span>{{ props.row.zhiwu }}</span>
                                </el-form-item>
                                <el-form-item label="描述:">
                                    <span>{{ props.row.caozuo }}</span>
                                </el-form-item>
                                <el-form-item label="操作记录:">
                                    <span>{{ props.row.desc }}</span>
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
                            label="是否打折"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="所属店铺"
                            prop="desc">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="库存数量"
                            prop="desc">
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
                        comdityId: '1',
                        isnodiscount: '0',
                        stock: '13',
                        corresponding: '63',
                        ssdp: '25',
                        comditytypeId:'1',
                        typename:"干果",
                        comdityname:"核桃",
                        comditydw:'斤',
                        comditydescribe:'格调干果，吃了以后，比刘翔快，比姚明高',
                        comdityprice:'1500'
                    }
                ],
                Form: {
                    name: ''
                },
                page: {
                    total: 20,
                    current: 1,

                },
            }
        }, methods: {

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
</style>
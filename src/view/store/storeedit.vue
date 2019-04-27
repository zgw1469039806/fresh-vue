<template>
    <!--门店信息管理-->
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form"  label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-button type="success">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        max-height="250">
                    <el-table-column
                            fixed
                            prop="date"
                            label="日期"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="province"
                            label="省份"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="city"
                            label="市区"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="zip"
                            label="邮编"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="updateRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5, 10]"
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
        name: 'storeinsert',
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    },
                ],
                page: {
                    total: 20,
                    current: 1,

                },
                Form:{
                    name:''
                }
            }
        },
        methods: {
            //单击删除事件
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            },
            //单机编辑
            updateRow(index, rows) {
                index,rows
                this.$router.push({name: 'storeinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                // console.log("index:"+index)
                index
                this.$router.push({name: 'storeinsert',params:{type:"update",sid:"12"}})
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
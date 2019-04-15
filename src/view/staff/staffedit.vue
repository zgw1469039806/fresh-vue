<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="员工名称">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        max-height="250">
                    <el-table-column
                            fixed
                            prop="date"
                            label="进店日期"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="store"
                            label="所属店铺"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="联系方式"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="address"
                            label="店铺地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="zhiwu"
                            sortable
                            label="当前职务"
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
        name: "staffedit",
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        store: '老城店',
                        address: '河南省洛阳市老城区丽景门大街 1518号',
                        phone: '18238817862',
                        zhiwu: "采购员"
                    },
                    {
                        date: '2019-04-10',
                        name: '王老虎',
                        store: '万达店',
                        address: '河南省洛阳市涧西区万达三楼 王老虎生鲜店',
                        phone: '13083658064',
                        zhiwu: "收银员"
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
                var a = index + "" + rows;
                this.$router.push({name: 'staffinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
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
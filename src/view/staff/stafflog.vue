<template>
    <div>
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="员工名称">
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
                                <el-form-item label="员工姓名:">
                                    <span>{{ props.row.name }}</span>
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
                            label="记录日期"
                            prop="date">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="员工姓名"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="描述"
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
        name: "postlog",
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-07',
                        name: '王小虎',
                        store: '老城店',
                        address: '河南省洛阳市老城区丽景门大街 1518号',
                        phone: '18238817862',
                        zhiwu: "采购员",
                        caozuo:'卖出商品',
                        desc:'出售商品'
                    },
                    {
                        date: '2019-04-10',
                        name: '王老虎',
                        store: '万达店',
                        address: '河南省洛阳市涧西区万达三楼 王老虎生鲜店',
                        phone: '13083658064',
                        zhiwu: "收银员",
                        caozuo:'卖出商品',
                        desc:'出售商品'
                    }
                ],
                Form: {
                    name: '',
                    statictime:'',
                    endtime:''
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
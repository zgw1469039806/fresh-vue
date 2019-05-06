<template>
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="员工名称">
                    <el-input v-model="Form.useraccount"></el-input>
                </el-form-item>
                <el-button type="success" @click="selByYg()">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        max-height="250">
                    <!--<el-table-column-->
                            <!--fixed-->
                            <!--prop="date"-->
                            <!--label="进店日期"-->
                            <!--sortable-->
                            <!--width="150">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="useraccount"
                            label="姓名"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="gdStoreName"
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
                            prop="storeaddress"
                            label="店铺地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="username"
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
                        useraccount: '',
                        gdStoreName: '',
                        storeaddress: '',
                        phone: '',
                        username: ""
                    }
                ],
                Form: {
                    useraccount: ''
                },
                page: {
                    total: 20,
                    current: 1,

                },
            }
        }, methods: {
            /**
             * 查询员工信息
             */
            selByYg() {
                var data = {"useraccount": this.Form.useraccount}
                this.axios.post("/selAllAndByUsername", {data}).then((response) => {
                    this.tableData=response.data.data;


                });
            },

            //单机编辑
            updateRow(index, rows) {
                var a = index + "" + rows;
                a
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

        }, created() {

            this.selByYg();

        }
    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
    }
</style>

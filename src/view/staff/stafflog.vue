<template>
    <div>
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="员工名称">
                    <el-input v-model="Form.username"></el-input>
                </el-form-item>
                <el-date-picker
                        v-model="Form.startTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button style="margin-left: 5px" @click="selAll()" type="primary">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="员工姓名:">
                                    <span>{{ props.row.username }}</span>
                                </el-form-item>
                                <el-form-item label="操作日期:">
                                    <span>{{ props.row.createDate }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺:">
                                    <span>{{ props.row.storename }}</span>
                                </el-form-item>
                                <el-form-item label="操作记录:">
                                    <span>{{ props.row.operation }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="记录日期"
                            prop="createDate">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="员工姓名"
                            prop="username">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="操作"
                            prop="operation">
                    </el-table-column>
                </el-table>
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
                        createDate: '',
                        username: '',
                        storename: '',
                        address: '',
                        phone: '',
                        operation: '',
                    }
                ],
                Form: {
                    username: '',
                    startTime: ''
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
            selAll() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var startTime = "";
                var endTime = "";
                if (this.startTime != null) {
                    var date = new Date();
                    startTime = this.Form.startTime[0];
                    endTime = this.Form.startTime[1];
                    if (startTime != undefined && startTime != null && startTime != '') {
                        date = new Date(startTime);
                        startTime = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)) + '-' + ("0" + date.getDate());
                    }
                    if (endTime != undefined && endTime != null && endTime != '') {
                        date = new Date(endTime);
                        endTime = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)) + '-' + ("0" + date.getDate());
                    }
                }

                var data = {
                    "username": this.Form.username,
                    "startTime": startTime,
                    "endTime": endTime

                };
                this.axios.post("/gdLogs", {data}).then((response) => {
                    this.tableData = response.data;
                    loading.close();
                }).catch((error) => {
                    loading.close();
                    this.$message.error("ERROR：" + error)
                });
            }

        },
        created() {
            this.selAll();
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
        color: #409EFF;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

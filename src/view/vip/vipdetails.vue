<template>
    <div id="app">
        <div>
            <div class="froms">
                <el-form :inline="true" class="danhao" ref="Form" label-width="80px">
                    <el-form-item label="姓名:">
                        <el-input v-model="Form.vipName"></el-input>
                    </el-form-item>
                    <el-form-item label="会员等级:">
                        <el-select v-model="Form.viplv" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button style="margin-left: 5px" type="success" @click="selMyVip()">查询</el-button>
                    <el-button type="success">新增</el-button>
                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData.list"
                        style="width: 100%">

                    <el-table-column
                            label="会员姓名"
                            prop="vipName">
                    </el-table-column>
                    <el-table-column
                            label="会员手机号"
                            prop="vipphone">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="会员积分"
                            prop="vipintegral">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="会员余额"
                            prop="vipbalance">
                    </el-table-column>
                    <el-table-column
                            label="会员等级"
                            prop="viplv"
                            width="90px">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="开卡时间"
                            prop="vipStartTime"
                            width="160px"
                    >
                    </el-table-column>
                    <el-table-column
                            label="是否挂失"
                            prop="vipreport"
                            width="90px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.vipreport == 0">否</span>
                            <span v-if="scope.row.vipreport == 1">是</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="挂失时间"
                            prop="vipeportTime"
                            width="160px">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150px"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-size="page.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="tableData.totalCount">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vipdetails",
        data() {
            return {
                tableData: null,
                Form: {
                    vipName: '',//姓名
                    viplv: '0'//会员等级
                },
                page: {
                    current: 1, //当前页
                    pageSize: 10 ,//每页显示多少条
                },
                options: [
                    {
                        value: '0',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '1级'
                    },
                    {
                        value: '2',
                        label: '2级'
                    },
                    {
                        value: '3',
                        label: '3级'
                    },
                    {
                        value: '4',
                        label: '4级'
                    },
                    {
                        value: '5',
                        label: '5级'
                    }
                ]
            }
        }, methods: {
            //一页多少条改变
            handleSizeChange(index) {
                index + 0
            },
            //页码变换事件
            handleCurrentChange(index) {
                this.page.current = index;
                this.vipPage();
            },
            handleEdit(index, row) { //index是行号  row 是行的对象
                index+0
                this.$router.push({name:'vipedit',params:{vipId:row.vipId}})

            },
            handleDelete(index, row) {
                index,row
                this.axios.post("/delVipById", {
                    "data": row.vipId,
                })
                    .then((response) => {
                        if (response.data.code == 0) {
                            this.$alert(response.data.msg ,'提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    action
                                    window.location.reload();
                                }
                            });
                        } else {
                            this.$message.error(response.data.msg);
                        }

                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            },
            vipPage(){
                this.axios.post("/selPageListVip", {
                    "data": {
                        "pageNo": this.page.current,
                        "pageSize": this.page.pageSize,
                        "vipName": this.Form.vipName,
                        "viplv": this.Form.viplv
                    },
                })
                    .then((response) => {
                        if (response.data.code == 0) {
                            this.tableData = response.data.data;
                        } else {
                            this.$message.error(response.data.msg);
                        }

                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            },
            selMyVip(){
                this.vipPage();
            }
        }, created: function () {

            this.vipPage();


        }
    }
</script>

<style scoped>
    .div_01{
        width: 500px;
        height: 500px;
        margin: 0 auto;
    }

    .bor{
        border: 1px solid red;
    }

    .block {
        display: flex;
        justify-content: center;
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
<template>
    <div class="box">

        <el-button style="margin:0 0 30px 325px;" type="info" @click="$router.push({path:'/add_viplevel'})">新增会员等级
        </el-button>

        <div class=" forms">
            <!--<h4>会员等级的增删改查</h4><br/>-->
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="会员等级"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 20px">{{ scope.row.viplv }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="会员折扣"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 15px">{{ scope.row.vipdiscount }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="会员升级所需积分"
                            width="140">
                        <template slot-scope="scope">
                            <span style="margin-left: 30px">{{ scope.row.vipintegration }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <!--<el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viplevel",
        data() {
            return {
                tableData: null,
            }
        }, methods: {

            handleEdit(index, row) { //index是行号  row 是行的对象
                index
                this.$router.push({name: 'upd_viplevel', params: {vipleaveid: row.viplv}})
            },
            handleDelete(index, row) {
                index, row
                this.axios.post("/delVipLv", {
                    "data": row.viplv,
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
            }
        }, created() {
            const $loadinged = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.get("/selAllVipLv")
                .then((response) => {
                    $loadinged.close();
                    this.tableData = response.data.data
                })
                .catch((error) => {
                    $loadinged.close();
                    this.$message.error("Error:" + error);
                })
        }
    }
</script>

<style scoped>
    .box {
        width: border-box;
        /*display: flex;
        margin-top: 5vw;*/
        margin-top: 50px;
    }

    .bor {
        border: 1px solid red;
    }

    .subform {
        width: 200px;
    }

    .forms {
        width: 35vw;
        display: flex;
        justify-content: center;
        border: 1px solid #d8d8d8;
        margin: 0px auto;
        background: #fff;
    }
</style>
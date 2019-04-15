<template>
    <div class="box">

        <el-button style="margin:0 0 30px 325px;" type="primary" @click="$router.push({path:'/add_viplevel'})">新增会员等级</el-button>

        <div class="bor forms">
            <!--<h4>会员等级的增删改查</h4><br/>-->
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="会员等级"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 20px">{{ scope.row.vip_leave }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="会员折扣"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 15px">{{ scope.row.vip_discount }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="会员升级所需积分"
                            width="140">
                        <template slot-scope="scope">
                            <span style="margin-left: 30px">{{ scope.row.vip_integral }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
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
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viplevel",
        data(){
            return{
                tableData: [{
                    vip_leave: '1',
                    vip_discount: '0.9',
                    vip_integral: '1000'
                },{
                    vip_leave: '2',
                    vip_discount: '0.9',
                    vip_integral: '2000'
                },{
                    vip_leave: '3',
                    vip_discount: '0.9',
                    vip_integral: '3000'
                },{
                    vip_leave: '4',
                    vip_discount: '0.9',
                    vip_integral: '4000'
                },{
                    vip_leave: '5',
                    vip_discount: '0.9',
                    vip_integral: '5000'
                }],
            }
        }, methods: {
            /*submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.vip_leave.value == null){
                            return false;
                        }
                        alert('submit!'+this.ruleForm.vip_leave.value);
                    } else {
                        return false;
                    }
                });
            },*/
            add_vipleave(){
                alert("新增会员等级！");
            },
            handleEdit(index, row) { //index是行号  row 是行的对象
                index
                alert("编辑:等级为 "+row.vip_leave);

                this.$router.push({name:'upd_viplevel',params:{vipleaveid:row.vip_leave}})
            },
            handleDelete(index, row) {
                index,row
                alert("删除"+index+","+row);
            }
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

    .bor{
        border: 1px solid red;
    }

    .subform{
        width: 200px;
    }

    .forms {
        width: 35vw;
        display: flex;
        justify-content: center;
        border: 1px solid red;
        margin: 0px auto;
        background: #fff;
    }
</style>
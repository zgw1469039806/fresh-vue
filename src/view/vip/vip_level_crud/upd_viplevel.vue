<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->
                <el-form-item>
                    <h3>设定会员等级</h3>
                </el-form-item>

                <el-form-item label="会员等级:" prop="vip_leave">
                    <el-input v-model="ruleForm.viplv" disabled></el-input>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vipdiscount">
                    <el-input-number v-model="ruleForm.vipdiscount" :precision="2" :step="0.01" :min="0.00"
                                     :max="1"></el-input-number>
                </el-form-item>

                <el-form-item label="会员升级所需积分:" prop="vipintegration">
                    <el-input-number v-model="ruleForm.vipintegration" :step="1" :min="0" :max="5000"></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改等级信息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "upd_viplevel",
        data() {
            return {
                vipid: this.$route.params.vipleaveid,
                ruleForm: {
                    viplv: 0,
                    vipdiscount: 0,
                    vipintegration: 0
                },
                rules: {
                    vipdiscount: [
                        {required: true, message: '请输入折扣', trigger: 'blur'}
                    ],
                    vipintegration: [
                        {required: true, message: '请输入积分', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("vipLvController/updVipLv", {
                            "data": this.ruleForm,
                        })
                            .then((response) => {
                                if (response.data.code == 0) {
                                    this.$alert(response.data.msg ,'提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            action
                                            this.$router.push({path: '/viplevel'})
                                        }
                                    });
                                } else {
                                    this.$message.error(response.data.msg);
                                }

                            })
                            .catch((error) => {
                                this.$message.error("Error:" + error);
                            })

                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
            this.axios.post("vipLvController/selVipLvById", {
                "data": this.vipid,
            })
                .then((response) => {
                    this.ruleForm = response.data.data;
                })
                .catch((error) => {
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
        margin: 0px auto;
        background: #fff;
    }
</style>
<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->
                <el-form-item>
                    <h3>新增会员等级</h3>
                </el-form-item>

                <el-form-item label="会员等级:" prop="vip_leave">

                    <el-input-number v-model="ruleForm.vip_leave" :step="1" :min="1" :max="10"></el-input-number>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vip_discount">
                    <el-input-number v-model="ruleForm.vip_discount" :precision="2" :step="0.01" :min="0.00"
                                     :max="1"></el-input-number>
                </el-form-item>

                <el-form-item label="会员升级所需积分:" prop="vip_integral">
                    <el-input-number v-model="ruleForm.vip_integral" :step="1" :min="0" :max="5000"></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">新增等级</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add_viplevel",
        data() {
            return {
                ruleForm: {
                    vip_leave: '',
                    vip_discount: '0.10',
                    vip_integral: '0'
                },
                rules: {
                    vip_leave: [
                        {required: true, message: '请输入等级', trigger: 'blur'}
                    ],
                    vip_discount: [
                        {required: true, message: '请输入折扣', trigger: 'blur'}
                    ],
                    vip_integral: [
                        {required: true, message: '请输入积分', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("vipLvController/addVipLv", {
                            "data": {
                                "viplv": this.ruleForm.vip_leave,
                                "vipdiscount": this.ruleForm.vip_discount,
                                "vipintegration": this.ruleForm.vip_integral
                            },
                        })
                            .then((response) => {
                                if (response.data.code == 0) {
                                    this.$message({
                                        message: response.data.msg,
                                        type: 'success',
                                        duration: 1000
                                    })
                                    this.$router.push({path: '/viplevel'})
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
        /*border: 1px solid red;*/
        margin: 0px auto;
        background: #fff;
    }
</style>
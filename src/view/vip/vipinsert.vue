<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->
                <el-form-item >
                    <h3>新增会员</h3>
                </el-form-item>
                <el-form-item label="用户手机号:" prop="userPhone" >
                    <el-input  v-model="ruleForm.vipphone"></el-input>
                </el-form-item>

                <el-form-item label="会员名称:" prop="vipName" >
                    <el-input  v-model="ruleForm.vipName"></el-input>
                </el-form-item>

                <el-form-item label="会员初始等级:" prop="vipLeave" >
                    <el-select v-model="ruleForm.viplv" placeholder="请选择">
                        <el-option
                                v-for="item in vipLeave"
                                :key="item.viplv"
                                :label="item.viplv"
                                :value="item.viplv">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="会员初始积分:" prop="vipIntegral" >
                    <el-input-number v-model="ruleForm.vipintegral" :min="0" :max="999"></el-input-number>
                </el-form-item>

                <el-form-item label="会员初始余额:" prop="vipMoney" >
                    <el-input-number v-model="ruleForm.vipbalance" :precision="2" :step="0.1" :min="0.00" ></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vipinsert",
        data(){
            return{
                vipLeave:null,
                ruleForm: {
                    vipphone: '',
                    vipintegral:'0', //积分
                    vipbalance:'0.00',
                    vipName:'',
                    viplv: '',
                },
                rules: {
                    vipphone: [
                        {required: true, message: '请输入用户手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur'}
                    ],
                    vipName: [
                        {required: true, message: '请输入会员名称', trigger: 'blur'},
                    ]
                    ,viplv: [
                        {required: true, message: '请输入会员初始等级', trigger: 'blur'}
                    ]
                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("/addVip", {
                            "data": this.ruleForm,
                        })
                            .then((response) => {
                                if (response.data.code == 0) {
                                    this.$alert(response.data.msg ,'提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            action
                                            this.$router.push({path: '/vipdetails'})
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
            }
        },created(){
            this.axios.get("/selAllVipLv")
                .then((response) => {
                    this.vipLeave = response.data.data
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
        display: flex;
        margin-top: 5vw;
        height: 500px;
    }

    .bor{
        border: 1px solid red;
    }

    .subform{
        width: 200px;
    }

    .forms {
        width: 50vw;
        display: flex;
        justify-content: center;
        margin: 0px auto;
        height: 500px;
        background: #fff;
    }
</style>
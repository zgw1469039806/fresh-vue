<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->
                <el-form-item >
                    <h3>新增会员</h3>
                </el-form-item>
                <el-form-item label="用户手机号:" prop="userPhone" >
                    <el-input  v-model="ruleForm.userPhone"></el-input>
                </el-form-item>

                <el-form-item label="会员初始等级:" prop="vipLeave" >
                    <el-select v-model="ruleForm.vipLeave.value" placeholder="请选择">
                    <el-option
                            v-for="item in ruleForm.vipLeave"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>

                <el-form-item label="会员初始积分:" prop="vipIntegral" >
                    <el-input-number v-model="ruleForm.vipIntegral" :min="0" :max="5000"></el-input-number>
                </el-form-item>

                <el-form-item label="会员初始余额:" prop="vipMoney" >
                    <el-input-number v-model="ruleForm.vipMoney" :precision="2" :step="0.1" :min="0.00" ></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                ruleForm: {
                    userPhone: '',
                    vipIntegral:'0', //积分
                    vipMoney:'0.00',
                    vipLeave: [{ //等级
                        value: '1',
                        label: '1级'
                    }, {
                        value: '2',
                        label: '2级'
                    }, {
                        value: '3',
                        label: '3级'
                    }, {
                        value: '4',
                        label: '4级'
                    },{
                        value: '5',
                        label: '5级'
                    }],

                },
                rules: {
                    userPhone: [
                        {required: true, message: '请输入用户手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur'}
                    ]
                    ,vipLeave: [
                        {required: true, message: '请输入会员初始等级', trigger: 'blur'}
                    ]
                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!'+this.ruleForm.userPhone+","+this.ruleForm.vipLeave.value);
                    } else {
                        return false;
                    }
                });
            }
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
        border: 1px solid red;
        margin: 0px auto;
        height: 500px;
        background: #fff;
    }
</style>
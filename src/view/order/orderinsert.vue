<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item >
                    <h3>销售单</h3>
                </el-form-item>

                <el-form-item label="会员手机号:" prop="vipPhone" >
                    <el-input  v-model="ruleForm.vipPhone" style="width:230px;" ></el-input>
                    <el-button type="primary" @click="selVip()">查询</el-button>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vipDiscount" >
                    <el-input  v-model="ruleForm.vipDiscount"></el-input>
                </el-form-item>

                <el-form-item label="选择商品:" prop="goods" >

                </el-form-item>

                <el-form-item label="选择付款方式:" prop="payWay" >
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">会员余额</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                        <el-radio :label="3">微信</el-radio>
                    </el-radio-group>
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
        name: "orderinsert",
        data(){
            return{
                ifshow:false,
                ruleForm: {
                    vipPhone:"",
                    vipMsg:'',
                    vipMsgs:{
                      na:'小明',
                      jifen:'1000',
                      yue:'200',
                      zhekou:'90%'
                    },
                    vipDiscount:'100%',
                    radio:'1',

                },
                rules: {
                    userPhone: [
                        {required: true, message: '请输入用户手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur'}
                    ]

                },

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            selVip(){

                //1、先根据手机号查询会员信息
                this.ruleForm.vipMsg = null;
                //2、把查询到的信息赋值给vipMsg
                this.ruleForm.vipMsg = this.ruleForm.vipMsgs; //vipMsgs 查询数据库获取

                this.ruleForm.vipDiscount = this.ruleForm.vipMsgs.zhekou; //折扣
                if(this.ruleForm.vipPhone == null || this.ruleForm.vipPhone == "" || this.ruleForm.vipPhone.trim() == "" || this.ruleForm.vipMsg == null){
                    this.ruleForm.vipPhone = "查无此会员";
                    this.ruleForm.vipDiscount = "100%";
                    this.ifshow = false;
                    return false;
                }
                //3、显示vipMsg
                this.ifshow = true;
            }
        }
    }
</script>

<style scoped>
    .box {
        width: border-box;
        display: flex;
        margin-top: 5vw;
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
        background: #fff;
    }
</style>
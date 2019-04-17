<template>
    <div class="div_01 bor">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item >
                    <h3>编辑会员信息</h3>
                </el-form-item>
                <el-form-item label="会员姓名:" prop="vipName" >
                    <el-input  v-model="ruleForm.vipName" disabled></el-input>
                </el-form-item>

                <el-form-item label="会员手机号:" prop="vipPhone">
                    <el-input  v-model="ruleForm.vipPhone" disabled></el-input>
                </el-form-item>

                <el-form-item label="会员积分:" prop="vipIntegral" >
                    <el-input-number v-model="ruleForm.vipIntegral" :min="0" :max="5000"></el-input-number>
                </el-form-item>

                <el-form-item label="会员余额:" prop="vipMoney" >
                    <el-input-number v-model="ruleForm.vipMoney" :precision="2" :step="0.1" :min="0.00" ></el-input-number>
                </el-form-item>

                <el-form-item label="会员等级:" prop="vipLeave" >
                    <el-select v-model="ruleForm.vipLeave" placeholder="请选择">
                        <el-option
                                v-for="item in vipLeave"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开卡时间:" prop="vipStartTime" >
                    <el-input  v-model="ruleForm.vipStartTime" disabled></el-input>
                </el-form-item>

                <el-form-item label="是否挂失:" prop="isPeport" >
                    <el-select v-model="ruleForm.isPeport" placeholder="请选择">
                        <el-option
                                v-for="item in isPeport"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vipedit",
        data(){
            return{
                vipId : this.$route.params.vipId,
                ruleForm: {
                    vipName: '1',
                    vipPhone: '2',
                    vipIntegral:'0', //积分
                    vipMoney:'0.00',
                    vipStartTime:'1234t',
                    vipLeave:'1',
                    isPeport:'0'
                },
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
                isPeport:[{
                    value: '0',
                    label: '否'
                },{
                    value: '1',
                    label: '是'
                }],
                rules: {
                    vipName: [
                        {required: true, message: '请输入会员名称', trigger: 'blur'},
                    ]
                    ,vipLeave: [
                        {required: true, message: '请输入会员初始等级', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            }
        },
        created() {
             alert(this.$route.params.vipId)
        }
    }
</script>

<style scoped>
    .div_01{
       /* width: 500px;
        height: 500px;*/
        margin: 0 auto;
    }

    .bor{
        border: 1px solid red;
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
<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->
                <el-form-item>
                    <h3>设定会员等级</h3>
                </el-form-item>

                <el-form-item label="会员等级:" prop="vip_leave" >
                    <el-select v-model="ruleForm.vip_leave.value" placeholder="请选择">
                        <el-option
                                v-for="item in ruleForm.vip_leave"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vip_discount" >
                    <el-input-number v-model="ruleForm.vip_discount" :precision="2" :step="0.01" :min="0.00" :max="1"></el-input-number>
                </el-form-item>

                <el-form-item label="会员升级所需积分:" prop="vip_integral" >
                    <el-input-number v-model="ruleForm.vip_integral" :step="1" :min="0" :max="5000"></el-input-number>
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
        data(){
            return{
                vipid:''
                ,
                ruleForm: {
                    vip_leave: [{ //等级
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
                    vip_discount:'0.10',
                    vip_integral:'0'
                },
                rules: {

                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert(this.vipid)
                        if(this.ruleForm.vip_leave.value == null){
                            return false;
                        }
                        alert('submit!'+this.ruleForm.vip_leave.value);
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
             this.vipid = this.$route.params.vipleaveid;
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
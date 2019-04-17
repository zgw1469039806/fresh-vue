<template>
    <div class="div_01">
        <h4>按客户消费:</h4>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="客户每消费:" prop="vipIntegral" >
                <el-input-number v-model="ruleForm.expenditure" :min="1" :max="5000"></el-input-number>元
            </el-form-item>

            <el-form-item label="可获得积分:" prop="vipMoney" >
                <el-input-number v-model="ruleForm.vipIntegral" :min="0" :max="5000"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "vipintegral",
        data(){
            return{
                ruleForm:{
                    expenditure:'100',
                    vipIntegral:'10'
                },
                rules: {

                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!'+this.ruleForm.expenditure+","+this.ruleForm.vipIntegral);
                    } else {
                        return false;
                    }
                });
            }
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
</style>
<template>
    <div class="div_01">
        <h4>按客户消费:</h4>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

            <el-form-item label="规则所属店铺:">
                <el-select v-model="ruleForm.storeid"
                           @change="changeSelect"
                           placeholder="请选择">
                    <el-option
                            v-for="item in storeid"
                            :key="item.storeid"
                            :label="item.storename"
                            :value="item.storeid">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="客户每消费:" prop="vipIntegral">
                <el-input-number v-model="ruleForm.vipinsetmoney" :min="1" :max="5000"></el-input-number>
                元
            </el-form-item>

            <el-form-item label="可获得积分:" prop="vipMoney">
                <el-input-number v-model="ruleForm.vipinsetgetin" :min="0" :max="5000"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "vipintegral",
        data() {
            return {
                ruleForm: {
                    vipinsetmoney: '101',
                    vipinsetgetin: '10',
                    storeid: ''
                },
                storeid: [
                    {
                        value: '1',
                        label: '店铺1'
                    },
                    {
                        value: '2',
                        label: '店铺2'
                    }
                ],
                rules: {
                    storeid: [
                        {required: true, message: '请选择店铺', trigger: 'blur'},
                    ],
                    vipinsetgetin: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    vipinsetmoney: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],

                }
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("VipInSetController/updVipInSet", {
                            "data": this.ruleForm,
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

                    } else {
                        return false;
                    }
                });
            },
            changeSelect() {
                //查询积分规则
                this.axios.post("VipInSetController/selVipInSetById", {
                    "data": this.ruleForm.storeid
                })
                    .then((response) => {
                        this.ruleForm.vipinsetmoney = response.data.data.vipinsetmoney;
                        this.ruleForm.vipinsetgetin = response.data.data.vipinsetgetin;
                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            }
        },
        created() {
            this.axios.post("/GdStoreQueryAll")
                .then((response) => {
                    this.storeid = response.data.data
                })
                .catch((error) => {
                    this.$message.error("Error:" + error);
                })
        }
    }
</script>

<style scoped>
    .div_01 {
        width: 500px;
        height: 500px;
        margin: 0 auto;
    }

    .bor {
        border: 1px solid red;
    }
</style>
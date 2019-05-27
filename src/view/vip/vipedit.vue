<template>
    <div class="div_01 ">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item>
                    <h3>编辑会员信息</h3>
                </el-form-item>
                <el-form-item label="会员姓名:" prop="vipName" >
                    <el-input  v-model="ruleForm.vipName" disabled></el-input>
                </el-form-item>

                <el-form-item label="会员手机号:" prop="vipphone">
                    <el-input  v-model="ruleForm.vipphone" disabled></el-input>
                </el-form-item>

                <el-form-item label="会员积分:" prop="vipintegral" >
                    <el-input-number v-model="ruleForm.vipintegral" :min="0" :max="5000"></el-input-number>
                </el-form-item>

                <el-form-item label="会员余额:" prop="vipbalance" >
                    <el-input-number v-model="ruleForm.vipbalance" :precision="2" :step="0.1" :min="0.00" ></el-input-number>
                </el-form-item>

                <el-form-item label="会员等级:" prop="viplv" >
                    <el-select v-model="ruleForm.viplv" placeholder="请选择">
                        <el-option
                                v-for="item in vipLeave"
                                :key="item.viplv"
                                :label="item.viplv"
                                :value="item.viplv">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开卡时间:" prop="vipStartTime" >
                    <el-input  v-model="ruleForm.vipStartTime" disabled></el-input>
                </el-form-item>

                <el-form-item label="是否挂失:" prop="vipreport" >
                    <el-select v-model="ruleForm.vipreport" placeholder="请选择">
                        <el-option
                                v-for="item in isPeport"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="submitForm('ruleForm')">修改</el-button>
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
                vipId: this.$route.params.vipId,
                ruleForm: null,
                vipLeave: null,
                isPeport:[{
                    value: 0,
                    label: '否'
                },{
                    value: 1,
                    label: '是'
                }],
                rules: {
                    vipName: [
                        {required: true, message: '请输入会员名称', trigger: 'blur'},
                    ]
                    ,viplv: [
                        {required: true, message: '请输入会员初始等级', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const $loadinged = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.axios.post("/updOneVip", {
                            "data": this.ruleForm,
                        })
                            .then((response) => {
                                $loadinged.close();
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
                                $loadinged.close();
                                this.$message.error("Error:" + error);
                            })
                    } else {
                        return false;
                    }
                });
            },

        },
        created() {
            const $loadinged = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.get("/selAllVipLv")
                .then((response) => {
                    $loadinged.close();
                    this.vipLeave = response.data.data
                })
                .catch((error) => {
                    $loadinged.close();
                    this.$message.error("Error:" + error);
                })

            this.axios.post("/selOneVipById", {
                "data": this.$route.params.vipId,
            })
                .then((response) => {
                    $loadinged.close();
                    if (response.data.code == 0) {
                        this.ruleForm = response.data.data;
                    } else {
                        this.$message.error(response.data.msg);
                    }

                })
                .catch((error) => {
                    $loadinged.close();
                    this.$message.error("Error:" + error);
                })
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
        margin: 0px auto;
        background: #fff;
    }
</style>
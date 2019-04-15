<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <!--<p>新增会员</p><br/>-->

                <el-form-item label="用户手机号:" prop="userPhone">
                    <el-input v-model="ruleForm.userPhone"></el-input>
                </el-form-item>
                <!--<el-form-item label="会员等级" prop="vipleave">
                    <el-select v-model="addSalePar.id" placeholder="请选择">
                        <el-option
                                v-for="p in product"
                                :key="p.id"
                                :label="p.productname"
                                :value="p.id"
                        ></el-option>
                    </el-select>
                </el-form-item>-->

                <el-form-item label="会员等级" prop="vipleave">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
                    vipLeave: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],

                },
                rules: {
                    userPhone: [
                        {required: true, message: '请输入用户手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur'}
                    ]
                    ,
                }
            }
        }, methods: {
            submitForm(formName) {
                alert(this.ruleForm.userPhone);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            /*resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.region = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }*/
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
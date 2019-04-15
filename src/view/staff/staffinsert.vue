<template>
    <div class="box">
        <div class="forms">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h1 style="font-size: 20px" v-text="Local.title">添加员工</h1>
                <el-form-item  label="员工姓名:" prop="name">
                    <el-input style="width: 500px" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系方式:" prop="phone">
                    <el-input  v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="postion">
                    <el-select v-model="ruleForm.postion" placeholder="请选择员工职位">
                        <el-option label="采购员" value="shanghai"></el-option>
                        <el-option label="收银员" value="beijing"></el-option>
                        <el-option label="会计" value="kuaiji"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="薪资:" prop="money">
                    <el-input style="width: 500px" v-model="ruleForm.money"></el-input>
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
        name: "staffinsert",
        props: {
            type: String,
            sid: String
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    phone:'',
                    postion:'',
                    money:''
                },   rules: {
                    name: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '请输入联系方式', trigger: 'blur' },
                        { min: 11, message: '至少 11 位', trigger: 'blur' }
                    ],
                    postion: [
                        { required: true, message: '请选择员工职位', trigger: 'change' },
                    ],
                    money:[
                        { required: true, message: '请输入员工薪资', trigger: 'blur' },
                    ]
                },
                Local: {
                    title: '添加员工',
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // var multipartFile = new FormData();//将文件转成二进制形式
                        // multipartFile.append("file", this.ruleForm.logomodel);
                        // this.$axios.post('', multipartFile).then((response) => {
                        //     if (response.code==200){
                        //         this.$message.success("添加成功!")
                        //     }
                        // })
                    } else {
                        return false;
                    }
                });
            },
            isAdd: function () {
                this.type = this.$route.params.type;
                if (this.type == 'insert') {
                    this.Local.title = "添加员工"
                } else if (this.type == 'update') {
                    this.Local.title = "编辑员工"
                    this.sid = this.$route.params.sid;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.logo = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                this.ruleForm.logomodel = file
                alert(this.ruleForm.logomodel)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                vm.isAdd();
            });
        }
    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
    }
    .box {
        width: border-box;
        display: flex;
        height: 500px;
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
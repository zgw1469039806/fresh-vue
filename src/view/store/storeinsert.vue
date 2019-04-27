<template>
    <div class="box">
        <div class="forms">
            Type:{{type}}
            Sid:{{sid}}
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h1 style="font-size: 20px" v-text="Local.title">添加店铺</h1>
                <el-form-item label="店铺名称" prop="name">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="ruleForm.storename" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="ruleForm.phone" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>
                <el-form-item label="店铺logo">
                    <el-upload
                            :auto-upload="false"
                            :model="ruleForm.logomodel"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="门店介绍" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.storeaddress"></el-input>
                </el-form-item>
                <el-form-item label="门店照片">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="ruleForm.fileList"
                            list-type="picture">
                        <el-button size="small" type="success">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "storeinsert",
        props: {
            type: String,
            sid: String
        },
        data() {
            return {
                ruleForm: {
                    logomodel: '',
                    storename: '',
                    phone: '',
                    logo: '',
                    storeaddress: '',
                    fileList: []
                }, rules: {
                    storename: [
                        {required: true, message: '请输入门店名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    storeaddress: [
                        {required: true, message: '请输入门店介绍', trigger: 'blur'},
                    ]
                },
                Local: {
                    title: '添加店铺',
                }
            }
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert(this.ruleForm.storename)
                        this.axios.post("/manAdd",this.ruleForm).then((response)=>{
                            alert(response.data)
                        })

                        // var multipartFile = new FormData();//将文件转成二进制形式
                        // multipartFile.append("file", this.ruleForm.logomodel);
                        // this.$axios.post('', multipartFile).then((response) => {
                        //     alert(response.code)
                        // })
                    } else {
                        return false;
                    }
                });
            },
            isAdd: function () {
                this.type = this.$route.params.type;
                this.sid = this.$route.params.sid;
                if (this.type == 'insert') {
                    this.Local.title = "添加店铺"
                } else if (this.type == 'update') {
                    this.Local.title = "修改店铺"
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.logo = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                this.ruleForm.logomodel = file;
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
        },
        addStore:function () {

        }
    }
</script>

<style scoped>
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

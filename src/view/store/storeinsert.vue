<template>
    <div class="box">
        <div class="forms">
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
                            :model="ruleForm.logomodel"
                            action="http://localhost:8777/unification/imageAdd/imageAdd"
                            :show-file-list="false"
                            :with-credentials=true
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" style="width: 150px">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="门店介绍" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.storeaddress"></el-input>
                </el-form-item>
                <el-form-item label="门店照片">
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:8777/unification/imageAdd/imageAdd"
                            :on-preview="handlePreview"
                            :with-credentials=true
                            :on-remove="handleRemove"
                            :on-success="handlePreview"
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
                    fileList: [],
                    logourl: '',
                    filelisturl: new Array()
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
                        // this.ruleForm.logourl
                        // this.ruleForm.filelisturl
                        let list = new Array();
                        for (let i = 0; i < this.ruleForm.filelisturl.length; i++) {
                            list.push({
                                "storeImages": this.ruleForm.filelisturl[i],
                                "storeid": 0
                            })
                        }
                        let data = {
                            "manageStoreDTOList": list,
                            "storeImagesUri": "string",
                            "storeaLogo": this.ruleForm.logourl,
                            "storeaddress": this.ruleForm.storeaddress,
                            "storename": this.ruleForm.storename
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.axios.post("http://localhost:8777/unification/saveMana", data).then((response) => {
                            if (response.data.msg == "处理成功") {
                                this.$message.success("添加成功!")
                            } else if (response.data.msg == '门店名称不能重复') {
                                this.$message.error("门店名称不能重复")
                            } else {
                                this.$message.warning("添加失败!请检查参数或联系管理员!")
                            }
                            loading.close();
                        }).catch((error) => {
                            loading.close();
                            this.$message.error(error)
                        })
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
                this.ruleForm.logourl = file.response.data;
            },
            handlePreview(file) {//文件列表上传成功的沟子
                this.ruleForm.filelisturl.push(file.data)
            },
            handleRemove(file, fileList) {//删除文件的沟子
                file
                fileList
            },
            beforeAvatarUpload(file) {
                this.ruleForm.logomodel = file;
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                this.ruleForm.logo = file;
                return isJPG && isLt2M;
            }
        },
        beforeRouteEnter: function (to, from, next) {
            next(vm => {
                vm.isAdd();
            });
        },
        addStore: function () {

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

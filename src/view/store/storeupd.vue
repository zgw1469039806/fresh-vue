<template>
    <div class="box">
        <div class="forms">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h1 style="font-size: 20px" v-text="Local.title">修改店铺</h1>
                <el-form-item label="店铺名称" prop="name">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="ruleForm.storename" placeholder="门店名"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>
                <el-form-item label="店铺logo">
                    <el-upload
                            :model="ruleForm.logomodel"
                            action="http://localhost:8777/unification/imageAdd"
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
                            action="http://localhost:8777/unification/imageAdd"
                            :on-preview="handlePreview"
                            :with-credentials=true
                            :on-remove="handleRemove"
                            :on-success="handlePreview"
                            :file-list="ruleForm.fileList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
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
        name: "storeinsert",
        data() {
            return {
                row: Object,//传递过来的数据
                ruleForm: {
                    storeid: '',
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
                                "storeid": this.ruleForm.storeid
                            })
                        }
                        ;
                        let data = {
                            "manageStoreDTOList": list,
                            "storeid": this.ruleForm.storeid,
                            "storeaLogo": this.ruleForm.logourl,
                            "storeaddress": this.ruleForm.storeaddress,
                            "storename": this.ruleForm.storename
                        };
                        const $loadinged = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.axios.post("/updMana", {data}).then((response) => {
                            if (response.data.msg == "处理成功") {
                                this.$message.success("添加成功!")
                            } else if (response.data.msg == '门店名称不能重复') {
                                this.$message.error("门店名称不能重复")
                            } else {
                                this.$message.warning("添加失败!请检查参数或联系管理员!")
                            }
                            $loadinged.close();
                        }).catch((error) => {
                            $loadinged.close();
                            this.$message.error("" + error)
                        })
                    } else {
                        return false;
                    }
                });
            },
            isAdd: function () {
                let row = this.$route.params.md;
                this.ruleForm.storename = row.storename;
                this.ruleForm.storeaddress = row.storeaddress;
                this.ruleForm.storeid = row.storeid;
                this.ruleForm.logo = row.storeaLogo;
                this.ruleForm.logourl = row.storeaLogo;
                if (row.manageStoreDTOList != null) {
                    for (let i = 0; i < row.manageStoreDTOList.length; i++) {
                        //this.ruleForm.fileList.push(row.manageStoreDTOList[i].storeImages);
                        this.ruleForm.fileList.push({name: 'store.jpg', url: row.manageStoreDTOList[i].storeImages});
                        this.ruleForm.filelisturl.push(row.manageStoreDTOList[i].storeImages)
                    }
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
                fileList
                for (let i = 0; i < this.ruleForm.filelisturl.length; i++) {
                    if (this.ruleForm.filelisturl[i] == file.url) {
                        this.ruleForm.filelisturl.splice(i);
                    }
                }
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
    .box:hover{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
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

<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item >
                    <h3>销售单</h3>
                </el-form-item>

                <el-form-item label="会员手机号:" prop="vipPhone" >
                    <el-input  v-model="ruleForm.vipPhone" style="width:230px;" ></el-input>
                    <el-button type="primary" @click="selVip()">查询</el-button>
                </el-form-item>

                <el-form-item label="会员信息:" prop="vipDiscount" v-show="ifshow">
                    <p>名称：{{ruleForm.vipMsg.na}},积分：{{ruleForm.vipMsg.jifen}},余额：{{ruleForm.vipMsg.yue}}</p>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vipDiscount" >
                    <el-input  v-model="ruleForm.vipDiscount"></el-input>
                </el-form-item>

                <el-form-item label="选择商品:" prop="goods" >
                    <el-button type="success" @click="showDialog()">选择商品</el-button>

                    <template>
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%;">

                            <el-table-column
                                    prop="comdityname"
                                    label="品名"
                                    width="120">
                            </el-table-column>

                            <el-table-column
                                    prop="comdityprice"
                                    label="单价"
                                    width="100">
                            </el-table-column>

                            <el-table-column
                                    prop="comditydw"
                                    label="单位"
                                    width="100">
                            </el-table-column>

                            <el-table-column
                                    label="数量"
                                    width="160">
                                <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.comdnum" :precision="2" :step="0.01" :min="0.00" ></el-input-number>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="comdtotal"
                                    label="总价"
                                    width="160">
                                <template slot-scope="scope">
                                    <span>{{ parseFloat(scope.row.comdnum * scope.row.comdityprice).toFixed(2) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini"
                                               @click.native.prevent="deleteRow(scope.$index, tableData)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>

                <el-form-item label="选择付款方式:" prop="payWay" >
                    <el-radio-group v-model="ruleForm.radio">
                        <el-radio :label="1">会员余额</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                        <el-radio :label="3">微信</el-radio>
                    </el-radio-group>
                    <p>总价：<span style="color: red;">{{sumMoney.toFixed(2)}}</span> 元</p>
                    <p>打折后总价：<span style="color: red;">{{}}</span> 元</p>
                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <puchase-choice :dialog-form-visible="dialogFormVisible" @isOkclick="addtable"></puchase-choice>
    </div>
</template>

<script>

    import PuchaseChoice from "../../components/puchaseChoice";

    export default {
        name: "orderinsert",
        components: {PuchaseChoice},
        data(){
            return{
                ifshow:false,
                ruleForm: {
                    vipPhone:"",
                    vipMsg:'',
                    vipMsgs:{
                      na:'小明',
                      jifen:'1000',
                      yue:'200',
                      zhekou:'90%'
                    },
                    vipDiscount:'100%',
                    radio:'',

                },
                rules: {
                    userPhone: [
                        {required: true, message: '请输入用户手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur'}
                    ]

                },

                tableData: [],
                dialogFormVisible: false,//控制dialog是否打开

            }
        },

        computed: {
            sumMoney(){
                /*return this.tableData.map(row=>row.comdnum*row.comdityprice).reduce(
                    (acc, cur) => (parseFloat(cur) + acc), 0)*/


            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            selVip(){ //查询会员方法

                //1、先根据手机号查询会员信息
                this.ruleForm.vipMsg = null;
                //2、把查询到的信息赋值给vipMsg
                this.ruleForm.vipMsg = this.ruleForm.vipMsgs; //vipMsgs 查询数据库获取

                this.ruleForm.vipDiscount = this.ruleForm.vipMsgs.zhekou; //折扣
                if(this.ruleForm.vipPhone == null || this.ruleForm.vipPhone == "" || this.ruleForm.vipPhone.trim() == "" || this.ruleForm.vipMsg == null){
                    alert("此会员不存在！");
                    this.ruleForm.vipPhone = "";
                    this.ruleForm.vipDiscount = "100%";
                    this.ifshow = false;
                    return false;
                }
                //3、显示vipMsg
                this.ifshow = true;
            },
            showDialog() {
                this.dialogFormVisible = true
            },
            addtable: function (multipleSelection) {
                var rows = multipleSelection;
                for (let i = 0; i < rows.length; i++) {
                    var gobj = {
                        comdid:rows[i].id,
                        comdityname: rows[i].comdityname,
                        comditydw:rows[i].comditydw,
                        comdityprice: rows[i].comdityprice,
                        comdnum:1
                    }

                    this.tableData.push(gobj);
                }

                this.dialogFormVisible = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            }
        }
    }
</script>

<style scoped>
    .box {
        width: border-box;
        display: flex;
        margin-top: 5vw;
    }

    .bor{
        border: 1px solid red;
    }

    .subform{
        width: 200px;
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
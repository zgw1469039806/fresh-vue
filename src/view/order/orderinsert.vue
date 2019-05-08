<template>
    <div class="box">
        <div class="forms">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-form-item >
                    <h3>销售单</h3>
                </el-form-item>

                <el-form-item label="会员手机号:" prop="vipPhone" >
                    <el-input  v-model="ruleForm.vipPhone" style="width:230px;" ></el-input>
                    <el-button type="success" @click="selVip()">查询</el-button>
                </el-form-item>

                <el-form-item label="会员信息:" prop="vipDiscount" v-show="ifshow">
                    <p>名称：{{ruleForm.vipMsg.vipName}},积分：{{ruleForm.vipMsg.vipintegral}},余额：{{ruleForm.vipMsg.vipbalance}}</p>
                </el-form-item>

                <el-form-item label="会员折扣:" prop="vipDiscount" v-show="ifshow">
                    <el-input  v-model="ruleForm.zheKou" disabled style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="选择商品:" prop="goods" >
                    <el-button type="success" @click="showDialog()">选择商品</el-button>

                    <template>
                        <el-table
                                :data="ruleForm.tableData"
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
                                    <el-input-number v-model="scope.row.comdnum" :precision="2" :step="0.01" :min="0.00" style="width: 140px;"></el-input-number>
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
                                               @click.native.prevent="deleteRow(scope.$index, ruleForm.tableData)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>

                <el-form-item label="选择付款方式:" prop="payWay" >
                    <el-radio-group v-model="ruleForm.radio">
                        <el-radio :label="1" v-show="ifshow">会员余额</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                        <el-radio :label="3">微信</el-radio>
                        <el-radio :label="4">现金</el-radio>
                    </el-radio-group>
                    <p>总价：<span style="color: red;">{{sumMoney.toFixed(2)}}</span> 元</p>
                    <p v-show="ifshow">打折后总价：<span style="color: red;">{{(sumMoney.toFixed(2) * ruleForm.zheKou).toFixed(2)}}</span> 元</p>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button type="success" @click="guaForm('ruleForm')">挂单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <puchase-choice :dialog-form-visible="dialogFormVisible" @isOkclick="addtable"  @isClose="isClose"></puchase-choice>
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
                    tableData: [],
                    // vipDiscount:'100',
                    radio:'',
                    zheKou: 0.1

                },
                dialogFormVisible: false,//控制dialog是否打开
                rules: {
                    tableData: [
                        {required: true, message: '请选择商品', trigger: 'blur'}
                    ]

                },
            }
        },

        computed: {
            sumMoney(){
                return this.ruleForm.tableData.map(row=>row.comdnum*row.comdityprice).reduce(
                    (acc, cur) => (parseFloat(cur) + acc), 0)
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ifshow){ //如果ifshow为true 表示拥有会员 传入打折后价格
                            alert("商品为："+this.ruleForm.tableData)
                            alert("会员,价格为:"+(this.sumMoney.toFixed(2) * this.ruleForm.zheKou).toFixed(2))
                        }else{      //为false 表示没有会员 传入真实价格
                            alert("商品为："+this.ruleForm.tableData)
                            alert("不是会员,价格为："+this.sumMoney.toFixed(2))
                        }
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            guaForm(formName){ //挂单方法
                formName
            },
            selVip(){ //查询会员方法
                if(this.ruleForm.vipPhone == null || this.ruleForm.vipPhone == "" || this.ruleForm.vipPhone.trim() == ""){
                    this.ifshow = false;
                    return false;
                }
                //1、先根据手机号查询会员信息
                this.axios.post("VipController/selOneVipByPhone", {
                    "data": this.ruleForm.vipPhone,
                })
                    .then((response) => {
                        if(response.data.data == null){
                            alert("此会员不存在！");
                            this.ruleForm.vipPhone = "";
                            this.ruleForm.vipDiscount = "100%";
                        }else{
                            //2、把查询到的信息赋值给vipMsg
                            this.ruleForm.vipMsg = response.data.data;
                            //3、显示vipMsg
                            this.ifshow = true;

                            //根据查到的会员等级获取会员折扣

                            this.axios.post("vipLvController/selVipLvByViplv", {
                                "data": response.data.data.viplv,
                            })
                                .then((response) => {
                                    if(response.data.data == null){
                                        this.ruleForm.zheKou = 1;
                                    }else{
                                        this.ruleForm.zheKou = response.data.data.vipdiscount;
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error("Error:" + error);
                                })
                        }
                    })
                    .catch((error) => {
                        this.$message.error("Error:" + error);
                    })
            },
            showDialog() {
                this.dialogFormVisible = true
            },
            addtable: function (multipleSelection) {
                var rows = multipleSelection;
                if (rows.length != 0) {
                    var map = new Map();

                    for (let j = 0; j < rows.length; j++) {
                        var gobj = {
                            comdid:rows[j].comdid,
                            comdityname: rows[j].comdityname,
                            comditydw:rows[j].comditydw,
                            comdityprice: rows[j].comdityprice,
                            comdnum:1
                        }
                        map.set(gobj.comdid,gobj);
                    }
                    for (let i = 0; i < this.ruleForm.tableData.length; i++) {
                        map.set(this.ruleForm.tableData[i].comdid,this.ruleForm.tableData[i]);
                    }

                    this.ruleForm.tableData = new Array();
                    for (var [key,value] of map) {
                        key+"1";
                        this.ruleForm.tableData.push(value);
                    }
                }
                this.dialogFormVisible = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            },
            isClose: function () { //关闭模态框
                this.dialogFormVisible = false;
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
        margin: 0px auto;
        background: #fff;
    }
</style>
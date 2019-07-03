<template>
    <div class="box">
        <div class="forms">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm"
                     v-loading="loading">
                <el-form-item label="会员手机号:" style="float: left" prop="vipId ">
                    <el-input v-model="ruleForm.vipId " style="width:230px;"></el-input>
                    <el-button type="primary" @click="selVip()">查询</el-button>
                </el-form-item>

<!--                <el-form-item label="会员信息:" prop="vipDiscount" v-show="ifshow">-->
<!--                    <p>-->
<!--                        名称：{{ruleForm.vipMsg.vipName}},积分：{{ruleForm.vipMsg.vipintegral}},余额：{{ruleForm.vipMsg.vipbalance}}</p>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="会员折扣:" prop="vipDiscount" v-show="ifshow">-->
<!--                    <el-input v-model="ruleForm.zheKou" disabled style="width: 200px;"></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="选择商品:" prop="goods">
                    <el-button type="primary" @click="showDialog()">选择商品</el-button>
                    <el-input placeholder="请录入商品编码" style="width: 300px;margin-left: 20px" v-model="ruleForm.comdityBM"
                              @keydown.enter.native="inoutshop"></el-input>
                    <div style="margin-top: 15px"></div>
                    <template>
                        <el-table
                                :data="ruleForm.tableData"
                                border
                                style="width: 100%;">

                            <el-table-column
                                    prop="comdityname"
                                    label="品名">
                            </el-table-column>

                            <el-table-column
                                    prop="ordermoney"
                                    label="单价(元)">
                            </el-table-column>

                            <el-table-column
                                    prop="discount"
                                    label="活动价(元)">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.discount == '' || scope.row.discount == null">无</span>
                                    <span v-else>{{scope.row.discount}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="comditydw"
                                    label="单位">
                            </el-table-column>

                            <el-table-column
                                    label="数量">
                                <template slot-scope="scope">
                                    <el-input-number @change="numchang" v-model="scope.row.num" :precision="2"
                                                     :step="0.01" :min="0.00"
                                                     style="width: 140px;"></el-input-number>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="comdtotal"
                                    label="总价(元)">
                                <template slot-scope="scope">
                                    <span v-if="ifshow == true"> <!--是否会员-->
                                        <span v-if="scope.row.discount == '' || scope.row.discount == null">
                                            {{parseFloat(ruleForm.zheKou*parseFloat(scope.row.num * scope.row.ordermoney).toFixed(2)).toFixed(2)}}
                                        </span>
                                        <span
                                                v-else-if="(ruleForm.zheKou*parseFloat(scope.row.num * scope.row.ordermoney).toFixed(2))<parseFloat(scope.row.num * scope.row.discount).toFixed(2)">
                                            {{parseFloat(ruleForm.zheKou*parseFloat(scope.row.num * scope.row.ordermoney).toFixed(2)).toFixed(2)}}
                                        </span>
                                        <span v-else>
                                            {{parseFloat(scope.row.num * scope.row.discount).toFixed(2)}}
                                        </span>
                                    </span>
                                    <span v-else-if="scope.row.discount != '' && scope.row.discount != null  && scope.row.isnodiscount != 0">
                                        <!--{{}}-->
                                        {{parseFloat(scope.row.num * scope.row.discount).toFixed(2) }}
                                    </span>
                                    <span
                                            v-else>{{parseFloat(scope.row.num * scope.row.ordermoney).toFixed(2) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="preferentialway"
                                    label="优惠方式">

                                <template slot-scope="scope">
                                    <span v-if="scope.row.preferentialway == 0">无</span>
                                    <span v-if="scope.row.preferentialway == 1">会员价</span>
                                    <span v-if="scope.row.preferentialway == 2">活动价</span>
                                </template>

                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini"
                                               @click.native.prevent="deleteRow(scope.$index, ruleForm.tableData)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>

                <el-form-item label="选择付款方式:" prop="payWay">
                    <el-radio-group @change="zhifuchang" v-model="ruleForm.ordermeans ">
                        <el-radio :label="1" v-show="ifshow">会员余额</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                        <el-radio :label="3">微信</el-radio>
                        <el-radio :label="4">现金</el-radio>
                    </el-radio-group>
                    <el-input v-if="ruleForm.ordermeans == 2" id="inputsfouces" v-model="ruleForm.fukuanma"
                              @keydown.enter.native="zhifu"/>
                    <p>总价：<span style="color: red;">{{ruleForm.ordermoney}}</span> 元</p>
                </el-form-item>
                <el-form-item label="应付金额:" style="float: left">
                    <el-input style="width: 300px;" v-model="ruleForm.ordermoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="实付金额:" style="display: inline">
                    <el-input @change="changprice" style="width: 300px;" v-model="ruleForm.comditytrueprice"></el-input>
                </el-form-item>
                <el-form-item label="抹零:">
                    <el-checkbox @change="mlchang" v-model="ruleForm.ispriceml"></el-checkbox>
                </el-form-item>
                <el-form-item label="找零:">
                    <el-input disabled style="width: 300px" v-model="ruleForm.gchange"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button type="primary" @click="guaForm('ruleForm')">挂单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <puchase-choice :stoicid="ruleForm.storeid" :dialog-form-visible="dialogFormVisible" @isOkclick="addtable"
                        @isClose="isClose"></puchase-choice>
    </div>
</template>

<script>
    import PuchaseChoice from "../../components/puchaseChoice";
    import mendianC from "../../Constant.js";

    export default {
        name: "orderinsert",
        components: {PuchaseChoice},
        data() {
            return {
                loading: false,
                ifshow: false,
                ruleForm: {
                    vipId: "",
                    fukuanma: '',
                    comdityBM: '',
                    vipMsg: '',
                    tableData: [],
                    ordermeans: 4, // 交易手段 ,
                    zheKou: 1,
                    storeid: mendianC.id, //店铺编号
                    ordertype: 0,//交易类型 (0-消费 1-退款)
                    orderscene: 1,//交易场景
                    ordermoney: 0, //总价(应付金额)
                    comditytrueprice: 0,//实付金额
                    ispriceml: false,//是否抹零
                    priceml: 0,//抹零
                    gchange: 0,//找零
                    rfmoney: 0//成本
                    //orderStat: 挂单中  已完成
                },
                pricels: 0,//临时应付金额
                dialogFormVisible: false,//控制dialog是否打开
                mlprice: 0,//抹零价格
                rules: {
                    tableData: [
                        {required: true, message: '请选择商品', trigger: 'blur'}
                    ],
                    ordermeans:
                        [
                            {required: true, message: '请选择付款方式', trigger: 'blur'}
                        ]
                },
                zhifuloading: '',
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.ordermeans == 2) {
                            const $loadinged = this.$loading({
                                lock: true,
                                text: '请扫描用户付款码',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            this.zhifuloading = $loadinged;
                            document.getElementById("inputsfouces").focus();
                        } else {
                            this.zhifu();
                        }
                    } else {
                        return false;
                    }
                });
            },
            zhifu: function () {
                this.zhifuloading.close();
                // alert(this.ruleForm.fukuanma);
                this.ruleForm.ordermoney = this.pricels;
                if (this.ruleForm.tableData == null || this.ruleForm.tableData == '') {
                    this.$message.error('商品不能为空!');
                    return false;
                }
                if (this.ifshow) { //如果ifshow为true 表示拥有会员 传入打折后价格
                    //18376645457
                    this.loading = true;
                    this.axios.post("/insertOrder", {
                        "data": this.ruleForm,
                    }).then((response) => {
                        if (response.data.code == 0) {
                            this.loading = false;
                            mendianC.xiaoshou += this.ordermoney;
                        } else {
                            this.loading = false;
                            this.$message.error(response.data.msg);
                        }
                    }).catch((error) => {
                        this.loading = false;
                        this.$message.error("Error:" + error);
                    })
                } else {      //为false 表示没有会员 传入真实价格
                    this.ruleForm.vipId = "";
                    this.loading = true;
                    this.axios.post("/insertOrder", {
                        "data": this.ruleForm,
                    }).then((response) => {
                        if (response.data.code == 0) {
                            this.loading = false;
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    action
                                    window.location.reload();
                                }
                            });
                        } else {
                            this.loading = false;
                            this.zhifuloading.close();
                            this.$message.error(response.data.msg);
                        }
                    }).catch((error) => {
                        this.loading = false;
                        this.$message.error("Error:" + error);
                    })
                }
            },
            guaForm(formName) { //挂单方法
                formName
            },
            selVip() { //查询会员方法
                if (this.ruleForm.vipId == null || this.ruleForm.vipId == "" || this.ruleForm.vipId.trim() == "") {
                    this.ifshow = false;
                    return false;
                }
                //1、先根据手机号查询会员信息
                this.axios.post("/selOneVipByPhone", {
                    "data": this.ruleForm.vipId,
                }).then((response) => {
                    if (response.data.data == null || response.data.code != 0) {
                        this.$message.error('此会员不存在或已挂失!');
                        this.ruleForm.vipId = "";
                        this.ruleForm.vipDiscount = "100%";
                        this.ifshow = false;
                        this.jisuan();
                    } else {
                        //2、把查询到的信息赋值给vipMsg
                        this.ruleForm.vipMsg = response.data.data;
                        //3、显示vipMsg
                        this.ifshow = true;
                        //根据查到的会员等级获取会员折扣
                        this.axios.post("/selVipLvByViplv", {
                            "data": response.data.data.viplv,
                        }).then((response) => {
                            if (response.data.data == null) {
                                this.ruleForm.zheKou = 1;
                            } else {
                                this.ruleForm.zheKou = response.data.data.vipdiscount;
                            }
                            this.$notify({
                                title: '会员信息',
                                message: ('i', {style: 'color: teal'}, '会员名称:'+this.ruleForm.vipMsg.vipName+"会员积分:"+this.ruleForm.vipMsg.vipintegral+"会员余额:"+this.ruleForm.vipMsg.vipbalance+"会员折扣:"+this.ruleForm.zheKou),
                                duration: 0
                            });
                            this.jisuan();
                        }).catch((error) => {
                            this.$message.error("Error:" + error);
                            this.jisuan();
                        })
                    }
                }).catch((error) => {
                    this.$message.error("Error:" + error);
                })
            },
            numchang: function () {
                this.jisuan();
            },
            showDialog() {
                this.dialogFormVisible = true
            },
            addtable: function (multipleSelection) {
                var rows = multipleSelection;
                window.console.log("ROWS:--------------------");
                window.console.log(rows);
                //todo: belongStoreNam从父级拿到
                if (rows.length != 0) {
                    var map = new Map();
                    for (let j = 0; j < rows.length; j++) {
                        var gobj = {
                            comdityId: rows[j].comdityId,
                            comdityname: rows[j].comdityname,
                            comditydw: rows[j].comditydw,
                            discount: rows[j].discount, //活动价格
                            preferentialway: 0,//优惠类型 0-无 1-会员价 2-活动价 动态拼接
                            num: rows[j].comdnum,
                            belongStoreNam: '123',
                            ordermoney: rows[j].comdityprice,
                            isnodiscount: rows[j].isnodiscount,
                            puprice: rows[j].puprice
                        };
                        window.console.log(rows[j].comdnum);
                        if (gobj.num == 0 || gobj.num == '' || gobj.num == undefined) {
                            gobj.num = rows[j].num;
                        }
                        if (gobj.ordermoney == 0 || gobj.ordermoney == '' || gobj.ordermoney == undefined) {
                            gobj.ordermoney = rows[j].ordermoney;
                        }
                        window.console.log("GOBJ:------------------------------");
                        window.console.log(gobj);
                        if (this.ifshow) { //如果是会员
                            if (gobj.isnodiscount == 1) {
                                if (parseFloat(this.ruleForm.zheKou * gobj.ordermoney) < gobj.discount) {
                                    gobj.preferentialway = 1;
                                    this.ruleForm.ordermoney += parseFloat((this.ruleForm.zheKou * gobj.ordermoney) * gobj["num"]);
                                } else {
                                    gobj.preferentialway = 2;
                                    this.ruleForm.ordermoney += parseFloat(gobj["discount"] * gobj["num"]);
                                }
                            } else {
                                this.ruleForm.ordermoney = parseFloat(this.ruleForm.ordermoney * gobj["num"]);
                                this.ruleForm.ordermoney += parseFloat((this.ruleForm.zheKou * gobj.ordermoney));
                                gobj.preferentialway = 1;
                            }
                        } else if (gobj.isnodiscount == 1) { //若是活动商品
                            this.ruleForm.ordermoney += parseFloat(gobj["discount"] * gobj["num"]);
                            gobj.preferentialway = 2;
                        } else { //若是普通商品
                            let money = parseFloat(gobj["comdityprice"]);
                            window.console.log("comdityprice" + gobj["comdityprice"])
                            if (money == '' || money == null || money == undefined || money != Number) {
                                money = parseFloat(gobj["ordermoney"]);
                                window.console.log("ordermoney" + gobj["ordermoney"])
                            }
                            window.console.log("money" + money + "num" + gobj["num"]);
                            this.ruleForm.ordermoney += parseFloat(money * gobj["num"]);
                            window.console.log(this.ruleForm.ordermoney);
                        }
                        this.pricels = parseFloat(this.ruleForm.ordermoney);
                        if (this.ruleForm.ispriceml) {
                            this.mlchang();
                        }
                        this.ruleForm.rfmoney += parseFloat(gobj.puprice * gobj["num"]);
                        this.changprice();
                        map.set(gobj.comdityId, gobj);
                    }
                    for (let i = 0; i < this.ruleForm.tableData.length; i++) {
                        map.set(this.ruleForm.tableData[i].comdityId, this.ruleForm.tableData[i]);
                    }
                    this.ruleForm.tableData = new Array();
                    for (var [key, value] of map) {
                        key + "1";
                        this.ruleForm.tableData.push(value);
                    }
                }
                this.dialogFormVisible = false;
                if (this.ruleForm.ispriceml) {
                    this.mlchang();
                }
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.jisuan();
                this.$message.success("删除成功!")
            },
            jisuan: function () {
                let copayshuzu = [];
                copayshuzu = this.ruleForm.tableData;
                this.ruleForm.ordermoney = 0;
                this.addtable(copayshuzu);
            },
            isClose: function () { //关闭模态框
                this.dialogFormVisible = false;
            },
            mlchang: function () {
                //如果抹零的按钮为勾选
                if (this.ruleForm.ispriceml) {
                    //抹零操作
                    this.ruleForm.ordermoney = parseInt(this.ruleForm.ordermoney);
                    //计算抹零抹了多少
                    this.ruleForm.priceml = this.pricels - this.ruleForm.ordermoney;
                    this.ruleForm.priceml = parseFloat(this.ruleForm.priceml).toFixed(2);
                } else {//如果没有勾选
                    //吧抹掉的值重新加上
                    this.ruleForm.ordermoney += parseFloat(this.ruleForm.priceml);
                }
                this.changprice();
            },
            changprice: function () {//实付金额值改变事件
                this.ruleForm.gchange = this.ruleForm.comditytrueprice - this.ruleForm.ordermoney;
            },
            inoutshop: function () {
                // alert(this.ruleForm.comdityBM)
                let data = {
                    "data": {
                        "comditybm": this.ruleForm.comdityBM,
                        "storeid": 1
                    },
                };
                this.axios.post('/QueryShopByWh', data).then((response) => {
                    this.this.ruleForm.comdityBM = '';
                    let com = response.data.data;
                    if (response.data.msg == "处理成功") {
                        com[0].comdnum = 1;
                        this.addtable(com);
                    }
                }).catch(() => {
                   this.this.ruleForm.comdityBM = ''
                })
            },
            zhifuchang: function () {
                if (this.ruleForm.ordermeans == 2) {
                    this.ruleForm.comditytrueprice = this.ruleForm.ordermoney;
                    this.changprice();
                }
            }
        }, created() {
            // this.ruleForm.storeid = this.$route.params.md;
        }
    }
</script>

<style scoped>
    .box {
        width: 80vw;
        display: flex;
    }

    .forms {
        display: flex;
        justify-content: center;
        background: #fff;
        margin-top: 15px;
    }

    .demo-ruleForm {
        justify-content: center;
        width: 80vw;
        margin: 0px auto;
    }
</style>
<!--18376645457-->
<template>
    <div>
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="商品名称/编码">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-select v-model="Form.md">
                    <el-option value="0" label="全部"></el-option>
                    <el-option v-for="(md,index) in mendians" :key="index" :label="md.storename"
                               :value="md.storeid"></el-option>
                </el-select>
                <el-button style="margin-left: 5px" @click="Query" type="primary">查询</el-button>
                <el-button type="success" @click="dialogVisible = true">新增商品</el-button>
            </el-form>
            <template>
                <el-table
                        :border="true"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="center" inline class="demo-table-expand">
                                <el-form-item label="商品ID:">
                                    <span>{{ props.row.comdityId }}</span>
                                </el-form-item>
                                <el-form-item label="商品名称:">
                                    <el-input v-model="props.row.comdityname"></el-input>
                                </el-form-item>
                                <el-form-item label="所属店铺:">
                                    <spant>{{ props.row.ssmdName }}</spant>
                                </el-form-item>
                                <el-form-item label="库存数量:">
                                    <span>{{ props.row.stock }}</span>
                                </el-form-item>
                                <el-form-item label="所属分类:">
                                    <span>{{ props.row.typename }}</span>
                                </el-form-item>
                                <el-form-item label="商品单位:">
                                    <el-input v-model="props.row.comditydw"></el-input>
                                </el-form-item>
                                <el-form-item label="商品描述:">
                                    <el-input v-model="props.row.comditydescribe"></el-input>
                                </el-form-item>
                                <el-form-item label="零售价格:">
                                    <el-input v-model="props.row.comdityprice"></el-input>
                                </el-form-item>

                                <el-form-item label="进货价格:">
                                    <el-input v-model="props.row.puprice"></el-input>
                                </el-form-item>
                                <el-form-item label="换取积分:">
                                    <el-input v-model="props.row.corresponding"></el-input>
                                </el-form-item>
                                <el-form-item label="会员是否可享折扣:">
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==0"><el-button
                                            type="text">否</el-button></span>
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==1"><el-button
                                            type="text">是</el-button></span>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text" @click="update(props.row)">保存修改</el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="商品ID"
                            prop="comdityId">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="商品名称"
                            prop="comdityname">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="是否打折"
                            prop="isnodiscount">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="库存数量"
                            prop="stock">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="所属店铺"
                            prop="ssmdName">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="操作">
                        <el-button type="success" size="mini">删除商品</el-button>
                    </el-table-column>
                </el-table>

            </template>
        </div>
        <div>
            <el-dialog width="80vw" :before-close="close" class="box1" title="商品添加" :visible.sync="dialogVisible">
                <el-form :model="ruleForm" inline :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <div class="spxx">
                        <div class="b1title">
                            <span>商品基本信息</span>
                        </div>
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="type">
                            <el-select v-model="ruleForm.type" filterable multiple placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位" prop="dw">
                            <el-input v-model="ruleForm.dw"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="jj">
                            <el-input v-model="ruleForm.jj"></el-input>
                        </el-form-item>
                    </div>
                    <div class="jgxx">
                        <div class="b1title"><span>商品价格信息</span></div>
                        <el-form-item label="进货价" prop="jhj">
                            <el-input v-model="ruleForm.jhj"></el-input>
                        </el-form-item>
                        <el-form-item label="零售价" prop="lsj">
                            <el-input v-model="ruleForm.lsj"></el-input>
                        </el-form-item>
                        <el-form-item label="批发价" prop="pfj">
                            <el-input v-model="ruleForm.pfj"></el-input>
                        </el-form-item>
                        <el-form-item label="折扣价" prop="psj">
                            <el-input v-model="ruleForm.psj"></el-input>
                        </el-form-item>
                        <el-form-item label="最低价" prop="zdj">
                            <el-input v-model="ruleForm.zdj"></el-input>
                        </el-form-item>
                        <el-form-item label="商品对应积分">
                            <el-input v-model="ruleForm.corresponding"></el-input>
                        </el-form-item>
                        <el-form-item label="商品同步至">
                            <el-select v-model="ruleForm.storeids" filterable multiple placeholder="请选择">
                                <el-option
                                        v-for="item in mendians"
                                        :key="item.storeid"
                                        :label="item.storename"
                                        :value="item.storeid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="float: right;">
                        <el-button>取消</el-button>
                        <el-button type="success" @click="submitForm('ruleForm')">添加</el-button>
                    </div>
                </el-form>
                <div style="clear: both;"></div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commodityattribute",
        data() {
            return {
                tableData: [
                    {
                        comdityId: '1',//商品ID
                        isnodiscount: '0',//是否打折
                        stock: '13',//库存数量
                        corresponding: '63',
                        ssmdName: '25',//所属店铺
                        comditytypeId: '1',
                        typename: "干果",//分类名称
                        comdityname: "核桃",//商品名称
                        comditydw: '斤',//单位
                        comditydescribe: '格调干果，吃了以后，比刘翔快，比姚明高',//商品描述
                        comdityprice: '1500'//商品单价
                    },
                    {
                        comdityId: '1',//商品ID
                        isnodiscount: '0',//是否打折
                        stock: '13',//库存数量
                        corresponding: '63',
                        ssmdName: '25',//所属店铺
                        comditytypeId: '1',
                        typename: "干果",//分类名称
                        comdityname: "核桃",//商品名称
                        comditydw: '斤',//单位
                        comditydescribe: '格调干果，吃了以后，比刘翔快，比姚明高',//商品描述
                        comdityprice: '1500'//商品单价
                    }
                ],
                ruleForm: {
                    name: '',//商品名称
                    type: [],//商品分类
                    dw: '',//商品单位
                    jj: '',//商品简介
                    jhj: '',//进货价
                    lsj: '',//零售价
                    pfj: '0',//批发价
                    psj: '0',//折扣价
                    zdj: '0',//最低价
                    isnodiscount: 0,//是否为打折商品
                    corresponding: 0,//对应积分
                    storeids: [],//对应店铺
                    vipishige: 0,//会员是否可享折扣
                },
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请选择商品类型', trigger: 'change'}
                    ],
                    dw: [
                        {required: true, message: '请输入商品单位', trigger: 'blur'}
                    ],
                    jj: [
                        {required: true, message: '请输入商品简介', trigger: 'blur'}
                    ],
                    jhj: [
                        {required: true, message: '请输入商品进货价', trigger: 'blur'}
                    ],
                    lsj: [
                        {required: true, message: '请输入商品零售价', trigger: 'blur'}
                    ],
                    pfj: [
                        {required: true, message: '请输入商品批发价', trigger: 'blur'}
                    ],
                    psj: [
                        {required: true, message: '请输入商品折扣价', trigger: 'blur'}
                    ],
                    zdj: [
                        {required: true, message: '请输入商品最低价', trigger: 'blur'}
                    ]
                },
                Form: {
                    name: '',
                    md: '',
                    type: []
                },
                page: {
                    total: 20,
                    current: 1,

                },
                dialogVisible: false,
                mendians: [
                    {}
                ],
                options: [{
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
                }]
            }
        }, methods: {
            //单机编辑
            updateRow(index, rows) {
                index, rows
                this.$router.push({name: 'staffinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                index
                // console.log("index:"+index)
            },
            vipchang: function (row) {//vip是否可享折扣
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].comdityId == row.comdityId) {
                        if (this.tableData[i].isnodiscount == 0) {
                            this.tableData[i].isnodiscount = 1;
                        } else {
                            this.tableData[i].isnodiscount = 0;
                        }
                        break;
                    }
                }
            },
            close: function () {
                this.dialogVisible = false;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /**
                         *
                         *  name: '',//商品名称
                         type: [],//商品分类
                         dw: '',//商品单位
                         jj: '',//商品简介
                         jhj: '',//进货价
                         lsj: '',//零售价
                         pfj: '0',//批发价
                         psj: '0',//配送价
                         zdj: '0',//最低价
                         isnodiscount: 0,//是否为打折商品
                         corresponding: 0,//对应积分
                         storeids: [],//对应店铺
                         vipishige: 0,//会员是否可享折扣
                         * */
                        var data = {
                            "data": {
                                "comditydescribe": this.ruleForm.jj,//商品简介
                                "comditydw": this.ruleForm.dw,//商品单位
                                "comdityname": this.ruleForm.name,//商品名称
                                "comdityprice": this.ruleForm.lsj,//零售价
                                "comditytypeId": this.ruleForm.type[0],//商品分类
                                "comstate": 1,
                                "corresponding": this.ruleForm.corresponding,
                                "discount": this.ruleForm.psj,//折扣价
                                "isnodiscount": 0,//是否为打折商品
                                "puprice": this.ruleForm.jhj,//进货价
                                "storeidlist": this.ruleForm.storeids,
                                "vipishige": 0
                            }
                        }
                        this.axios.post('/addShop',data).then((response)=>{
                            if (response.data.msg == "处理成功!"){
                                this.$message.success("添加成功!")
                            } else{
                                this.$message.warning("添加失败!")
                            }
                        }).catch((error)=>{
                            this.$message.error("Error:"+error)
                        })
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            Query: function () {
                var data = {
                    "data": {
                        "comdityname": this.Form.name,
                        "storeid": this.Form.md
                    },
                }
                this.axios.post('/QueryShopByWh', data).then((response) => {
                    if (response.data.msg == "处理成功") {
                        var data = response.data.data;
                        this.tableData = data;
                    }
                }).catch((error) => {
                    if (error != null) {
                        this.$message.error("Error:" + error)
                    }
                })
            },
            update: function (rows) {
                this.$alert(rows)
                const $loadinged = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var data = {
                    "data": {
                        "comdityId": rows.comdityId,//商品id
                        "comditydescribe": rows.comditydescribe,//商品描述
                        "comditydw": rows.comditydw,//商品单位
                        "comdityname": rows.comdityname,//商品名称
                        "comdityprice": rows.comdityprice,//商品价格
                        "corresponding": rows.corresponding,//对应积分
                        "discount": rows.discount,//折扣价
                        "isnodiscount": rows.isnodiscount,//是否打折
                        "puprice": rows.puprice,//进货价
                        "vipishige": rows.vipishige,//会员是否可享折扣
                        // "comditytypeId": 0,//商品分类id
                    },
                }
                this.axios.post('/updShop', data).then((response) => {
                    $loadinged.close();
                    if (response.data.msg == "处理成功") {
                        this.$message.success("修改成功!");
                    } else {
                        this.$message.warning("修改失败!");
                    }
                }).catch((error) => {
                    $loadinged.close();
                    this.$message.error("Error:" + error)
                })
            }
        }, created() {
            this.Query();
            this.axios.post('/GdStoreQueryAll', {}).then((response) => {
                var data = response.data.data;
                if (response.data.msg == "处理成功") {
                    this.mendians = data;
                }
            })
            //查询所有分类
            this.axios.get('/selTypeAll', {}).then((response) => {
                if (response.data.msg == "处理成功") {
                    this.options = [];
                    var data = response.data.data;
                    for (let i = 0; i < data.length; i++) {
                        let opt = {
                            value: data[i].comditytypeId,
                            label: data[i].typename
                        }
                        this.options.push(opt)
                    }
                }
            }).catch((error) => {
                this.$message.error("Error:" + error)
            })
        }

    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .spxx {
        border: 1px solid #c4c6cc;
        margin: 10px;
        border-radius: 5px;
    }

    .spxx:hover, .jgxx:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .jgxx {
        border-radius: 5px;
        border: 1px solid #c4c6cc;
        margin: 10px;
    }

    .b1title {
        border-bottom: 1px solid #c4c6cc;
        height: 50px;
        line-height: 50px;
        margin-bottom: 15px;
    }

    .b1title span {
        margin-left: 15px;
    }
</style>

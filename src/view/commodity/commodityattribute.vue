<template>
    <div>
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-select v-model="Form.md">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="万达店" value="wdd"></el-option>
                    <el-option label="老城店" value="lcd"></el-option>
                </el-select>
                <el-button style="margin-left: 5px" type="primary">查询</el-button>
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
                                    <span>{{ props.row.comdityname }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺:">
                                    <span>{{ props.row.ssdp }}</span>
                                </el-form-item>
                                <el-form-item label="库存数量:">
                                    <span>{{ props.row.stock }}</span>
                                </el-form-item>
                                <el-form-item label="所属分类:">
                                    <span>{{ props.row.typename }}</span>
                                </el-form-item>
                                <el-form-item label="商品单位:">
                                    <span>{{ props.row.comditydw }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述:">
                                    <el-input v-model="props.row.comditydescribe"></el-input>
                                </el-form-item>
                                <el-form-item label="商品单价:">
                                    <el-input v-model="props.row.comdityprice"></el-input>
                                </el-form-item>
                                <el-form-item label="会员是否可享折扣:">
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==0"><el-button
                                            type="text">否</el-button></span>
                                    <span @click="vipchang(props.row)" v-if="props.row.isnodiscount==1"><el-button
                                            type="text">是</el-button></span>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="text"> 保存修改</el-button>
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
                            prop="ssdp">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="操作">
                        <el-button type="success" size="mini">删除商品</el-button>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5, 10]"
                            :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.total">
                    </el-pagination>
                </div>
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
                        <el-form-item label="配送价" prop="psj">
                            <el-input v-model="ruleForm.psj"></el-input>
                        </el-form-item>
                        <el-form-item label="最低价" prop="zdj">
                            <el-input v-model="ruleForm.zdj"></el-input>
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
                        ssdp: '25',//所属店铺
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
                        ssdp: '25',//所属店铺
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
                    psj: '0',//配送价,
                    zdj: '0'//最低价
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
                    jj:[
                        {required: true, message: '请输入商品简介', trigger: 'blur'}
                    ],
                    jhj:[
                        {required: true, message: '请输入商品进货价', trigger: 'blur'}
                    ],
                    lsj:[
                        {required: true, message: '请输入商品零售价', trigger: 'blur'}
                    ],
                    pfj:[
                        {required: true, message: '请输入商品批发价', trigger: 'blur'}
                    ],
                    psj:[
                        {required: true, message: '请输入商品配送价', trigger: 'blur'}
                    ],
                    zdj:[
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
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            }
        },

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
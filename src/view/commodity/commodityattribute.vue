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
                        <el-form-item label="活动名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-select v-model="ruleForm.type" filterable multiple placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input></el-input>
                        </el-form-item>
                    </div>
                    <div class="jgxx">
                        <el-form-item label="活动时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                                    style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="活动性质" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </div>
                </el-form>
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
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
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
            }
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
        border: 1px solid red;
        margin: 10px;
    }

    .jgxx {
        margin: 10px;
        border: 1px solid red;
    }
</style>
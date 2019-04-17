<template>
    <div id="app">
        <div class="anniu">
            <div class="anniubox">
                <el-button type="success" @click="submitForm('ruleFrom')">保存</el-button>
                <el-button type="success">返回</el-button>
            </div>
        </div>
        <div class="xiahua">
            <div class="inputbox">
                <el-form inline="true" :model="Form" :rules="rules" ref="ruleFrom">
                    <el-form-item label="供应商" prop="gy">
                        <el-select v-model="Form.gy" placeholder="请选择供应商">
                            <el-option label="双汇肉类批发" value="shanghai"></el-option>
                            <el-option label="阿强哥鱼类批发" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门店" prop="md">
                        <el-select v-model="Form.md" placeholder="请选择门店">
                            <el-option label="万达店" value="shanghai"></el-option>
                            <el-option label="老城店" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addDomain">选择商品</el-button>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="备注">
                        <el-input style="width: 40vw" v-model="Form.bz"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                width="120"
                                :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                                prop="comdityname"
                                label="品名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="comditydw"
                                label="规格"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="comdityprice"
                                label="零售价"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="num"
                                label="采购数量"
                                width="120">
                                <el-input  width="110px"></el-input>
                        </el-table-column>
                        <el-table-column
                                prop="song"
                                label="赠送数量"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="caigprice"
                                label="采购价"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="小计金额"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="120">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini"
                                           @click.native.prevent="deleteRow(scope.$index, tableData)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchaseinsert",
        data() {
            return {
                Form: {
                    gongying: '',
                    mendian: '',
                    bz: ''
                },
                optionsFrogy: [
                    {
                        value: '1',
                        label: '双汇肉类批发'
                    }, {
                        value: '2',
                        label: '阿强哥鱼类批发'
                    }
                ],
                optionsFromd: [
                    {
                        value: '1',
                        label: '老城店'
                    },
                    {
                        value: '2',
                        label: '万达店'
                    }
                ],
                rules: {
                    md: [
                        {required: true, message: '请选择门店', trigger: 'change'}
                    ],
                    gy: [
                        {required: true, message: '请选择供应商', trigger: 'change'}
                    ]
                },
                tableData: [{
                    comdityname: '双汇王中王',//品名
                    comditydw: '箱',//规格
                    comdityprice: '1554',//零售价
                    num: 15,//采购数量
                    song: '3',//赠送数量
                    caigprice: 55,//采购价
                    money: '',
                }
                ]
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            },
            addDomain() {
                this.tableData.push({
                    comdityname: '双汇王中王',//品名
                    comditydw: '箱',//规格
                    comdityprice: '1554',//零售价
                    num: 15,//采购数量
                    song: '3',//赠送数量
                    caigprice: 55,//采购价
                    money: '',
                });
                this.moneyadd();
            },
            indexMethod(index) {
                return index + 1;
            },
            moneyadd() {
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].money = this.tableData[i].num * this.tableData[i].caigprice
                }
            }
        }, created: function () {
            this.moneyadd();
        }
    }
</script>

<style scoped>
    #app {
        width: 75vw;
        border: 1px solid #67c23a;
        margin: 0px auto;
        height: 500px;
        border-radius: 5px;
    }

    .anniu {
        width: 75vw;
        margin: 0px auto;
        height: 77px;
        border-bottom: 1px solid #67c23a;
    }

    .anniubox {
        line-height: 77px;
        margin-left: 15px;
    }

    .inputbox {
        margin-top: 15px;
        margin-left: 15px;
    }

    .xiahua {
        width: 75vw;
    }
</style>
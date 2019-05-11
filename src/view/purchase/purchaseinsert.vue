<template>
    <div id="app">
        <div class="anniu">
            <div class="anniubox">
                <el-button type="success" @click="submitForm('ruleFrom')">保存</el-button>
                <el-button type="success" @click="$router.push({path:'/purchasereport'})">返回</el-button>
            </div>
        </div>
        <div class="xiahua">
            <div class="inputbox">
                <el-form :inline=true :model="Form" :rules="rules" ref="ruleFrom">
                    <el-form-item label="供应商" prop="gongying">
                        <el-select v-model="Form.gongying" placeholder="请选择供应商">
                            <el-option v-for="(g,index) in gongyingopt" :key="index" :label="g.supplierName"
                                       :value="g.supplierId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门店" prop="mendian">
                        <el-select v-model="Form.mendian" placeholder="请选择门店">
                            <el-option v-for="(m,index) in mendianopt" :key="index" :label="m.storename"
                                       :value="m.storeid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="showDialog()">选择商品</el-button>
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
                                label="采购数量"
                                width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="赠送数量"
                                width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.song"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="采购价"
                                width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.caigprice"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="小计金额"
                                width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.caigprice * scope.row.num }}</span>
                            </template>
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
        <puchase-choice :dialog-form-visible="dialogFormVisible" @isOkclick="addtable"
                        @isClose="isClose"></puchase-choice>
    </div>
</template>

<script>

    import PuchaseChoice from "../../components/puchaseChoice";

    export default {
        name: "purchaseinsert",
        components: {PuchaseChoice},
        data() {
            return {
                Form: {
                    gongying: '',
                    mendian: '',
                    bz: ''
                },
                gongyingopt: [
                    {
                        supplierId: 'DDWAS',//供应商编号
                        supplierName: '牛逼供货'//供应商名称
                    }
                ],//供应商
                mendianopt: [
                    {
                        storeid: '1',//门店ID
                        storename: '老沉淀',//门店名称
                        storeaddress: '门店地址'
                    }
                ],//门店
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
                    mendian: [
                        {required: true, message: '请选择门店', trigger: 'change'}
                    ],
                    gongying: [
                        {required: true, message: '请选择供应商', trigger: 'change'}
                    ]
                },
                tableData: [],
                dialogFormVisible: false,//控制dialog是否打开
            }
        }, methods: {
            submitForm(formName) {//DB操作
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let list = [];
                        for (let i = 0; i < this.tableData.length; i++) {
                            list.push(
                                {
                                    "comdityname": this.tableData[i].comdityname,//商品名称
                                    "giveNumber": this.tableData[i].song,//赠送数量
                                    "purchase": this.tableData[i].caigprice,//采购数量
                                    "purchasingPrice": this.tableData[i].num,//采购价格
                                    "replenishId": 0,//进货ID
                                    "shopId": this.tableData[i].comdityId,//商品ID
                                    "shopNumber": parseInt(this.tableData[i].song) + parseInt(this.tableData[i].caigprice),//商品数量
                                    "subtotal": parseInt(this.tableData[i].caigprice) * parseInt(this.tableData[i].caigprice)
                                }
                            )
                        }
                        var data = {
                            "data": {
                                "isnostorage": 0,//是否入库
                                "list": list,//购买的商品
                                "receiptNo": "string",//单号
                                "remarks": this.Form.bz,//备注
                                "replenishId": 0,//进货ID
                                "replenishTime": "string",//进货时间
                                "storeid": this.Form.mendian,//店铺ID
                                "supplierID": this.Form.gongying,//提供商ID
                                "username": "28"//采购人员ID
                            },
                        }
                        this.axios.post('http://localhost:8777/unification/savegdReplen', data).then((response) => {
                            if (response.data.msg == "处理成功") {
                                this.$message.success("添加成功!")
                            } else {
                                this.$message.warning("似乎出现了一点问题~")
                            }
                        }).catch((error) => {
                            this.$message.error("Error:" + error)
                        })
                    } else {
                        return false;
                    }
                });
            }
            ,
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            },
            indexMethod(index) {//下标
                return index + 1;
            },
            showDialog() {
                this.$refs['ruleFrom'].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = true
                    } else {
                        this.dialogFormVisible = false;
                        return false;
                    }
                });
            },
            addtable: function (multipleSelection) {
                var rows = multipleSelection;
                if (rows.length != 0) {
                    var map = new Map();
                    for (let j = 0; j < rows.length; j++) {
                        var row = rows[j];
                        var gobj = {
                            comdityId: row.comdityId,
                            comdityname: row.comdityname,
                            comditydw: row.comditydw,
                            comdityprice: row.comdityprice,
                            num: 1,
                            caigprice: 0,
                            song: 0
                        }
                        map.set(gobj.comdityId, gobj)
                    }

                    for (let i = 0; i < this.tableData.length; i++) {
                        map.set(this.tableData[i].comdityId, this.tableData[i])
                    }
                    this.tableData = new Array();
                    for (var [key, value] of map) {
                        key + "1";
                        this.tableData.push(value)
                    }
                }
                this.dialogFormVisible = false;
            },
            isClose: function () {
                this.dialogFormVisible = false;
            }
        },
        created: function () {
            //查询所有供应商
            this.axios.post('http://localhost:8777/unification/QueryAll', {}).then((response) => {
                var supplier = response.data.data;
                if (response.data.msg == "处理成功") {
                    this.gongyingopt = supplier;
                }
            }).catch((error) => {
                this.$message.error("Error:" + error)
            })

            //查询所有门店
            this.axios.post('http://localhost:8777/unification/GdStoreQueryAll', {}).then((respose) => {
                var Storea = respose.data.data;
                if (respose.data.msg == "处理成功") {
                    this.mendianopt = Storea;
                }
            }).catch((error) => {
                this.$message.error("Error:" + error)
            })
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
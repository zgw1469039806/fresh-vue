<template>
    <div id="app">
        <div class="anniu">
            <div class="anniubox">
                <el-button type="primary" @click="submitForm('ruleFrom')">保存</el-button>
                <el-button type="primary" @click="$router.push({path:'/purchasereport'})">返回</el-button>
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
                        <el-button type="primary" @click="showDialog()">选择商品</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input @keydown.enter.native="tiaoma" id="tiaoxing" v-model="Form.txm" placeholder="请录入商品条码"></el-input>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="备注">
                        <el-input style="width: 40vw" v-model="Form.bz"></el-input>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="进货单号(不录入将自动生成)">
                        <el-input style="width: 40vw" v-model="Form.code"></el-input>
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
                                :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                                prop="comdityname"
                                label="品名">
                        </el-table-column>
                        <el-table-column
                                prop="comditydw"
                                label="规格">
                        </el-table-column>
                        <el-table-column
                                prop="comdityprice"
                                label="零售价">
                        </el-table-column>
                        <el-table-column
                                label="采购数量">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="赠送数量">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.song"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="采购价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.caigprice"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="小计金额">
                            <template slot-scope="scope">
                                <span>{{scope.row.caigprice * scope.row.num }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
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
                    bz: '',
                    code:'',
                    txm:''
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
                        this.$alert(this.Form.code);
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
                                "username": "28",//采购人员ID
                                "purcode":this.Form.code//进货单号
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
            },
            tiaoma:function () {
                let data = {
                    "data": {
                        "comditybm": this.Form.txm,
                        "storeid": 1
                    },
                };
                this.axios.post('/QueryShopByWh', data).then((response) => {
                    let com = response.data.data;
                    if (response.data.msg == "处理成功") {
                        com[0].comdnum = 1;
                        this.addtable(com);
                        this.Form.txm = '';
                        document.getElementById("tiaoxing").focus();
                    }
                }).catch((error) => {
                    this.$message.error(error)
                })
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
        width: 80vw;
        border: 1px solid #409EFF;
        margin: 0px auto;
        height: 50vw;
        border-radius: 5px;
    }

    .anniu {
        width: 80vw;
        margin: 0px auto;
        height: 77px;
        border-bottom: 1px solid #409EFF;
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
        width: 80vw;
    }
</style>
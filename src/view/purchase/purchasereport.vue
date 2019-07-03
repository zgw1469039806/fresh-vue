<template>
    <div id="app">
        <div>
            <div class="froms">
                <el-form :inline="true" class="danhao" ref="Form" label-width="80px">
                    <el-form-item label="单号:">
                        <el-input id="dh" @keydown.enter.native="smruku" v-model="Form.replenishId"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <el-select v-model="Form.zt" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-date-picker
                            v-model="Form.statictime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button style="margin-left: 5px" type="primary" @click="Query">查询</el-button>
                    <el-button type="primary" @click="$router.push({path:'/purchaseinsert'})">新增</el-button>
                    <el-button type="primary" @click="saoma">扫码入库</el-button>
                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="进货单号:">
                                    <span>{{ props.row.receiptNo }}</span>
                                </el-form-item>
                                <el-form-item label="所属门店:">
                                    <span>{{ props.row.storename}}</span>
                                </el-form-item>
                                <el-form-item label="供应商编号:">
                                    <span>{{ props.row.supplierBM }}</span>
                                </el-form-item>
                                <el-form-item label="供应商名称:">
                                    <span>{{ props.row.supplierName }}</span>
                                </el-form-item>
                                <el-form-item label="制单人员:">
                                    <span>{{ props.row.username }}</span>
                                </el-form-item>
                                <el-form-item label="制单时间:">
                                    <span>{{ props.row.replenishTime}}</span>
                                </el-form-item>
                                <el-form-item label="入库时间:">
                                    <span v-if="props.row.isnostorage==0">未入库</span>
                                    <span v-if="props.row.isnostorage==1">{{ props.row.storageTime }}</span>
                                </el-form-item>
                                <el-form-item label="备注:">
                                    <span>{{ props.row.remarks }}</span>
                                </el-form-item>
                                <el-form-item label="单据金额:">
                                    <span>{{ props.row.money }}</span>
                                </el-form-item>
                                <el-form-item label="状态:">
                                    <span v-if="props.row.isnostorage==0">未入库</span>
                                    <span v-if="props.row.isnostorage==1">已入库</span>
                                </el-form-item>
                                <el-form-item label="商品详细:">
                                    <span>{{ props.row.commodity}}</span>
                                </el-form-item>
                                <el-form-item label="操作:">
                                    <el-button type="text" v-if="props.row.isnostorage==0"
                                               @click="ruku(props.row.receiptNo,props.row.replenishId)">入库
                                    </el-button>
                                    <el-button type="text"
                                               @click="delPur(props.row.replenishId,props.row.isnostorage)">删除
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="进货单号"
                            prop="receiptNo">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="所属门店"
                            prop="storeid">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="供应商名称"
                            prop="supplierName">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="制单人员"
                            prop="username">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="制单时间"
                            prop="replenishTime">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[20,50]"
                            :page-size="1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.total">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchasereport",
        data() {
            return {
                tableData: [
                    // {
                    //     replenishId: '1',//进货ID
                    //     receiptNo: 'SWA544884',//进货单号
                    //     storeid: '1',//所属店铺ID
                    //     storename: '涧西店',//所属店铺名称
                    //     supplierBM: 'DDAWS554',//供应商编号
                    //     supplierName: '双汇肉类批发',//供应商
                    //     username: '1',//制单人员
                    //     replenishTime: '2019-10-10',//制单时间
                    //     remarks: '双汇王中王，火腿肠中的战斗肠',//备注
                    //     isnostorage: '1',//收获状态
                    //     money: '44885',//单据金额
                    //     commodity: '暂无数据'//商品详细
                    // }
                ],
                Form: {
                    replenishId: '',//单号
                    statictime: '',//日期范围
                    zt: ''//状态
                },
                page: {
                    total: 0,
                    current: 1,
                },
                options: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '未入库'
                    },
                    {
                        value: '1',
                        label: '已入库'
                    }
                ],
                loading:''
            }
        }, methods: {
            //单机编辑
            updateRow(index, rows) {
                index + "";
                rows + ''
                this.$router.push({name: 'staffinsert', params: {type: "update", sid: "12"}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index + 0
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                index + 0
                // console.log("index:"+index)
            },
            Query: function () {
                const $loadinged = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var stime = this.Form.statictime[0]
                var etime = this.Form.statictime[1]
                var date = new Date();
                if (stime != undefined && stime != null && stime != '') {
                    date = new Date(stime);
                    stime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                }
                if (etime != undefined && etime != null && etime != '') {
                    date = new Date(etime);
                    etime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                }
                this.axios.post("/selGdShopAll", {
                    "data": {
                        "endTime": etime,
                        "receiptNo": this.Form.replenishId,
                        "startTime": stime,
                        "isnostorage": this.Form.zt
                    }
                }).then((response) => {
                    var data = response.data.data;
                    this.tableData = data;
                    $loadinged.close();
                    if (response.data.msg == "处理成功") {
                        for (let i = 0; i < data.length; i++) {
                            this.tableData[i].commodity = '';
                            this.tableData[i].money = '';
                            for (let j = 0; j < data[i].list.length; j++) {
                                this.tableData[i].money += data[i].list[j].subtotal;
                                this.tableData[i].commodity += '商品名：' + data[i].list[j].comdityname + "数量：" + data[i].list[j].shopNumber + "小结：" + data[i].list[j].subtotal + "\t"
                            }
                        }
                    }
                }).catch((error) => {
                    $loadinged.close();
                    this.$message.error(error)
                })
            },
            ruku: function (receiptNo, replenishId) {
                var data = {
                    "receiptNo": receiptNo,
                    "replenishId": replenishId,
                    "storageuserid": 28,
                    "": this.Form.replenishId,
                }
                this.axios.post('http://localhost:8777/unification/saveStora', {
                    data
                }).then((response) => {
                    if (response.data.msg == '处理成功') {
                        this.$message.success("入库成功!")
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        this.$message.error("入库失败!")
                    }
                }).catch((error) => {
                    this.$message.error("Error:" + error)
                })
            },
            smruku: function () {
                var data = {
                    "storageuserid": 28,
                    "purcode": this.Form.replenishId,
                }
                this.loading.close();
                this.axios.post('http://localhost:8777/unification/saveStora', {
                    data
                }).then((response) => {
                    if (response.data.msg == '处理成功') {
                        this.$message.success("入库成功!")
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        this.$message.error("入库失败!")
                    }
                }).catch((error) => {
                    this.$message.error("Error:" + error)
                })
            },
            saoma: function () {
                const $loadinged = this.$loading({
                    lock: true,
                    text: '请扫描用户付款码',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.loading = $loadinged;
                document.getElementById("dh").focus();
            },
            delPur: function (rid, isnostorage) {//根据入库ID删除入库信息
                if (isnostorage == 0) {
                    this.$confirm('此条进货记录尚未入库, 该操作将永久删除这一记录。是否继续?', '不可逆操作警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.post('/delGdReplen', {
                            "data": rid
                        }).then((response) => {
                            let data = response.data;
                            if (data.msg == "处理成功") {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.Query();
                            } else {
                                this.$message.warning("删除失败!n")
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else if (isnostorage == 1) {
                    this.$confirm('此条进货记录已入库, 该操作将连带删除这条进货信息相对应的入库记录。是否继续?', '不可逆操作警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.post('/delGdReplen', {
                            "data": rid
                        }).then((response) => {
                            let data = response.data;
                            if (data.msg == "处理成功") {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message.warning("删除失败!n")
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        }, created: function () {
            this.Query();
        }, beforeRouteEnter: function (to, from, next) {
            next(vm => {
                vm.Query();
            });
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
        color: #409EFF;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    #app {
        /*border: 1px solid #409EFF;*/
        width: 80vw;
        border-radius: 5px;
        margin: 0px auto;
        display: flex;
        justify-content: center;
    }

    #app:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .froms {
        width: 80vw;
        /*border-bottom: 1px solid #409EFF;*/
    }

    .danhao {
        margin-top: 10px;
    }
</style>
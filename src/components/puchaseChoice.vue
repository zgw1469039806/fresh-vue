<template>
    <div>
        <el-dialog width="65vw" :before-close="close" class="box1" title="商品选择" :visible.sync="dialogFormVisible">
            <div class="b1">
                <el-tree :data="trees" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="b2box">
                <div class="b2">
                    <template>
                        <div class="input">
                            <div class="forms">
                                <span class="shpoinname">商品名称:</span>
                                <el-input style="width: 300px;padding-right: 15px"></el-input>
                                <el-button type="success">搜索</el-button>
                            </div>
                        </div>
                        <el-table
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                :border="true"
                                :data="tableData1"
                                tooltip-effect="dark"
                                style="width: 100%;"
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="货号"
                                    width="120">
                                <template slot-scope="scope">{{ scope.row.comdityname }}</template>
                            </el-table-column>
                            <el-table-column
                                    prop="comdityname"
                                    label="品名"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="comditydw"
                                    label="规格"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="comdityprice"
                                    label="零售价"
                                    show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top: 20px;float: right;margin-right: 15px;">
                            <el-button @click="close" type="success">取消</el-button>
                            <el-button @click="addtable" type="success">确认</el-button>
                        </div>
                    </template>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "purchaseinsert",
        props: {
            dialogFormVisible: Boolean,//控制dialog是否打开
            isOkclick: Function,
            isClose: Function
        },
        data() {
            return {
                tableData1: [//选择商品的数据
                    {
                        comdid: 1,
                        comdityname: '双汇王中王',//品名
                        comditydw: '箱',//规格
                        comdityprice: '1554'//零售价
                    },
                    {
                        comdid: 2,
                        comdityname: '阿强哥鱼类批发',//品名
                        comditydw: '箱',//规格
                        comdityprice: '500'//零售价
                    }
                ],
                trees: [
                    {
                        label: '新鲜水果',
                        title: '1',
                        children: [
                            {
                                label: '时令水果',
                                title: '2',
                                children: [{
                                    label: '西瓜',
                                    title: '3'
                                }, {
                                    label: '牛油果',
                                    title: '4'
                                }]
                            }
                        ]
                    },
                    {
                        label: '时令蔬菜',
                        title: '5',
                        children: [
                            {
                                label: '蔬菜',
                                title: '5',
                                children: [{
                                    label: '大白菜',
                                    title: '5'
                                }, {
                                    label: '油麦菜',
                                    title: '5'
                                }]
                            }
                        ]
                    }
                ],
                query: ''
            }
        },
        methods: {
            //单击树状菜单的回调函数
            handleNodeClick(data) {
                data + ''
                // console.log(data);
            },
            //确认添加
            addtable: function () {
                this.$emit('isOkclick', this.multipleSelection);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showDialog() {
                this.$refs['ruleFrom'].validate((valid) => {
                    if (valid) {
                    } else {
                        return false;
                    }
                });
            },
            close: function () {
                this.$emit('isClose', false);
            }
        }
    }
</script>

<style scoped>
    .box1 {
        display: flex;
    }

    .b1 {
        border: 1px solid #c4c6cc;
        float: left;
        width: 15vw;
        height: 30vw;
        margin-right: 10px;
    }

    .b1:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .b2box {

    }

    .b2 {
        border: 1px solid #67c23a;
        margin: 0px auto;
        width: 45vw;
        height: 30vw;
        float: left;
    }

    .input {
        line-height: 60px;
        height: 60px;
        width: 45vw;
        border-bottom: 1px solid #67c23a;
    }

    .forms {
        line-height: 60px;
        height: 60px;
        margin: 0px auto;
    }

    .shpoinname {
        margin-left: 15px;
        margin-right: 15px;
    }
</style>
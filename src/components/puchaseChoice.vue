<template>
    <div>
        <el-dialog width="65vw" class="box1" title="商品选择" :visible.sync="dialogFormVisible">
            <div class="b1">
                <el-tree :data="trees" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="b2">
                <template>
                    <el-form>
                        <el-form-item label="请输入商品名称">
                            <el-input style="width: 300px;padding-right: 15px"></el-input>
                            <el-button type="success">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                            :border="true"
                            :data="tableData1"
                            tooltip-effect="dark"
                            style="width: 100%;background: #646265"
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
                    <div style="margin-top: 20px">
                        <el-button @click="toggleSelection()">取消选择</el-button>
                        <el-button @click="addtable" type="success">确认</el-button>
                    </div>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "purchaseinsert",
        props:{
            dialogFormVisible: Boolean,//控制dialog是否打开
            isOkclick: Function
        },
        data() {
            return {
                tableData1: [//选择商品的数据
                    {
                        comdid:1,
                        comdityname: '双汇王中王',//品名
                        comditydw: '箱',//规格
                        comdityprice: '1554'//零售价
                    },
                    {
                        comdid:2,
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
        }, methods: {
            //单击树状菜单的回调函数
            handleNodeClick(data) {
                data + ''
                // console.log(data);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
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
                        this.dialogFormVisible = true
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .box1 {
        display: flex;
    }

    .b1 {
        float: left;
        width: 15vw;
        height: 30vw;
        margin: 0px auto;
    }

    .b2 {
        margin: 0px auto;
        width: 45vw;
        height: 30vw;
        float: left;
    }
</style>
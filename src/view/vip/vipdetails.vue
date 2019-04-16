<template>
    <div id="app">
        <div>
            <div class="froms">
                <el-form :inline="true" class="danhao" ref="Form" label-width="80px">
                    <el-form-item label="姓名:">
                        <el-input v-model="Form.vipName"></el-input>
                    </el-form-item>
                    <el-form-item label="会员等级:">
                        <el-select v-model="Form.vipLevel" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button style="margin-left: 5px" type="success">查询</el-button>
                    <el-button type="success">新增</el-button>
                </el-form>
            </div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="会员姓名"
                            prop="vipName">
                    </el-table-column>
                    <el-table-column
                            label="会员手机号"
                            prop="vipPhone">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="会员积分"
                            prop="vipIntegral">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="会员余额"
                            prop="vipMoney">
                    </el-table-column>
                    <el-table-column
                            label="会员等级"
                            prop="vipLeave"
                    >
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="开卡时间"
                            prop="vipStartTime">
                    </el-table-column>
                    <el-table-column
                            label="是否挂失"
                            prop="isPeport">
                    </el-table-column>
                    <el-table-column
                            sortable
                            label="挂失时间"
                            prop="vipPeportTime">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150px"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
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
    </div>
</template>

<script>
    export default {
        name: "vipdetails",
        data() {
            return {
                tableData: [
                    {
                        vipName :'1',
                        vipPhone :'1',
                        vipIntegral :'1',
                        vipMoney :'1',
                        vipLeave :'1',
                        vipStartTime :'2019-02-03',
                        isPeport :'1',
                        vipPeportTime :'1'
                    },
                    {
                        vipName :'2',
                        vipPhone :'2',
                        vipIntegral :'2',
                        vipMoney :'2',
                        vipLeave :'2',
                        vipStartTime :'2019-02-02',
                        isPeport :'2',
                        vipPeportTime :'2'
                    }
                ],
                Form: {
                    vipName: '',//单号
                    vipLevel: '-1'//会员等级
                },
                page: {
                    total: 20,
                    current: 1,
                },
                options: [
                    {
                        value: '-1',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '1级'
                    },
                    {
                        value: '2',
                        label: '2级'
                    },
                    {
                        value: '3',
                        label: '3级'
                    },
                    {
                        value: '4',
                        label: '4级'
                    },
                    {
                        value: '5',
                        label: '5级'
                    }
                ]
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
            },handleEdit(index, row) { //index是行号  row 是行的对象
                index
                alert("编辑:等级为 "+row.vipName);
                this.$router.push({name:'vipedit',params:{vipId:index}})

            },
            handleDelete(index, row) {
                index,row
                alert("删除"+index+","+row.vipName);
            }
        }, created: function () {

        }
    }
</script>

<style scoped>
    .div_01{
        width: 500px;
        height: 500px;
        margin: 0 auto;
    }

    .bor{
        border: 1px solid red;
    }

    .block {
        display: flex;
        justify-content: center;
    }


    #app {
        border: 1px solid #67c23a;
        width: 75vw;
        border-radius: 5px;
        margin: 0px auto;
        display: flex;
        justify-content: center;
    }

    #app:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .froms {
        width: 75vw;
        border-bottom: 1px solid #67c23a;
    }
    .danhao{
        margin-top: 10px;
    }
</style>
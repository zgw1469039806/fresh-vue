<template>
    <!--门店信息管理-->
    <div id="app">
        <div>
            <el-form :inline="true" ref="Form" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-button type="success" @click="Query">查询</el-button>
            </el-form>
            <template>
                <el-table
                        :border="true"
                        :data="tableData"
                        style="width: 100%"
                        max-height="500">
                    <el-table-column
                            fixed
                            prop="storeid"
                            label="门店编号" >
                    </el-table-column>
                    <el-table-column
                            prop="storename"
                            label="门店名称:" >
                    </el-table-column>
                    <el-table-column
                            prop="storeaddress"
                            label="门店地址" >
                    </el-table-column>
                    <el-table-column
                            label="门店Logo" >
                        <template slot-scope="scope">
                            <img :src=scope.row.storeaLogo width="150px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作" >
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="updateRow(scope.$index, scope)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, scope)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5, 10]"
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
        name: 'storeinsert',
        data() {
            return {
                tableData: [
                    {
                        storeid: '1',//门店ID
                        storename: '门店名称',//门店名称
                        storeaddress: '门店地址',//门店地址
                        storeImagesUri: 'http://zgwjava.oss-cn-beijing.aliyuncs.com/images/1557449754266.jpg',//门店Logo
                        manageStoreDTOList: [],//门店照片
                    },
                ],
                page: {
                    total: 20,
                    current: 1,

                },
                Form: {
                    name: ''
                }
            }
        },
        methods: {
            //单击删除事件
            deleteRow(index, rows) {
                rows.splice(index, 1);
                this.$message.success("删除成功!")
            },
            //单机编辑
            updateRow(index, rows) {
                this.$router.push({name: 'storeupd', params: {type: "update", md: rows.row,index:index}})
            },
            //一页多少条改变
            handleSizeChange(index) {
                index
                // this.console.log("index"+index)
            },
            handleCurrentChange(index) {
                // console.log("index:"+index)
                index
                this.$router.push({name: 'storeinsert', params: {type: "update", sid: "12"}})
            },
            Query:function () {
                this.axios.post('/GdStoreQueryAll',{
                    "data": this.Form.name
                }).then((response) => {
                    if (response.data.msg == "处理成功") {
                        let data = response.data.data;
                        this.tableData = data;
                    }
                }).catch((error) => {
                    this.$message.error(error);
                })
            }
        },
        created: function () {
           this.Query();
        }
    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
    }
</style>
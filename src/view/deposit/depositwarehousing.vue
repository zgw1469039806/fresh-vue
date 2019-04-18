<template>
    <div>
        <el-form :inline="true" class="block">
            <el-form-item>
                <el-input style="width: 200px"
                          placeholder="请输入商品编号"
                          v-model="input10"
                          clearable>
                </el-input>
            </el-form-item>
            <el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="ma">
            <el-table
                    :cell-style="cellStyle"
                    :header-cell-style="rowClass"
                    :data="tableData"
                    style="width: 100%;">
                <el-table-column
                        prop="date"
                        label="商品编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="入库单号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="商品详情">
                </el-table-column>
                <el-table-column
                        prop="Procurement"
                        label="采购人员">
                </el-table-column>

            </el-table>
            <el-form :inline="true" class="block2">
                <el-button type="primary">提交</el-button>
            </el-form>

            <button @click="doPost">发送请求</button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "depositwarehousing"
        , data() {
            return {
                input10: '',
                tableData: [{
                    date: '',
                    name: '',
                    address: '',
                    Procurement: ''
                }]
            }
        }, methods: {
            doPost: function () {

                this.axios.get("/userinfo2").then((response) => {
                    response
                });
            }
        }
    }
</script>

<style scoped>
    .block {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }

    .block2 {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    /*.ma{*/
    /*display: none;*/
    /*}*/

</style>

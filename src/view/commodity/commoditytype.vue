<template>
    <div id="app">
        <div class="input">
            <el-input
                    style="width: 80%;margin-top: 15px;"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            <div style="margin-top: 15px;margin-left: 10px">
                <el-button type="success" @click="dialogVisible=true">新增分类</el-button>
            </div>
        </div>
        <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                :default-expand-all=false
                :filter-node-method="filterNode"
                ref="tree2">
            <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="display: block;">
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除此分类
          </el-button>
             <el-button
                     type="text"
                     size="mini"
                     @click="() => edittype(node, data)">
            修改此分类
          </el-button>
        </span>
      </span>
        </el-tree>
        <div class="dialogs">
            <el-dialog
                    title="添加分类"
                    :visible.sync="dialogVisible"
                    width="80%"
                    :before-close="handleClose">
                <div class="neirong">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="分类名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="此分类父级" prop="fatherid">
                            <el-select filterable v-model="ruleForm.fatherid">
                                <el-option-group
                                        v-for="group in options"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option
                                            v-for="item in group.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commoditytype",
        data() {
            return {
                filterText: '',
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                dialogVisible: false,//控制dialog是否打开
                ruleForm: {
                    name: '',
                    fatherid: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                    fatherid: [
                        {required: true, message: '请选择父级分类', trigger: 'change'}
                    ]
                },
                options: [
                    {
                        label: '父级',
                        options: [{
                            value: '0',
                            label: '父级'
                        }]
                    },
                    {
                        label: '一级分类',
                        options: [
                            // {
                            //     value: 'Shanghai',
                            //     label: '上海'
                            // }, {
                            //     value: 'Beijing',
                            //     label: '北京'
                            // }
                        ]
                    }, {
                        label: '二级分类',
                        options: [
                            // {
                            //     value: 'Chengdu',
                            //     label: '成都'
                            // }, {
                            //     value: 'Shenzhen',
                            //     label: '深圳'
                            // }, {
                            //     value: 'Guangzhou',
                            //     label: '广州'
                            // }, {
                            //     value: 'Dalian',
                            //     label: '大连'
                            // }
                        ]
                    }
                ]
            };
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            remove(node, data) {//删除分类
                this.axios.post("unification/delType", {
                    "data": data.id
                }).then((response) => {
                    if (response.data.msg == "删除成功") {
                        this.$message.success("删除成功!")
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.id === data.id);
                        children.splice(index, 1);
                    } else if (response.data.msg == "分类下有商品") {
                        this.$message.error("删除失败！请先清空该分类下的商品!")
                    } else {
                        this.$message.error("删除失败!请检查网络或与管理员联系!")
                    }
                }).catch((error) => {
                    this.$message.error("Error:" + error)
                })
            },
            handleClose() {//关闭dialog
                this.dialogVisible = false;
            },
            submitForm(formName) {//增加表单提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var requestData = {
                            "data": {
                                "parent": this.ruleForm.fatherid,
                                "typename": this.ruleForm.name
                            }
                        }
                        // alert("name：" + this.ruleForm.name + "父级Id" + this.ruleForm.fatherid)
                        this.axios.post("http://localhost:8777/unification/sevaType", requestData).then((response) => {
                            if (response.data.msg == "处理成功") {
                                this.$message.success("添加成功")
                                this.dialogVisible = false;
                            } else {
                                this.$message.error("添加失败，请检查网络或与管理员联系")
                            }
                        }).catch((error) => {
                            alert(error)
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {//添加表单重置
                this.$refs[formName].resetFields();
            },
            edittype: function (node, data) {
                this.ruleForm.fatherid = data.id;
                this.ruleForm.name = data.label;
                this.dialogVisible = true;
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        created: function () {
            this.data = new Array();
            this.axios.get("http://localhost:8777/unification/selTypeAll", {}).then((response) => {
                var res = response.data.data;
                var opt = {
                    value: '',
                    label: ''
                }
                var content = {
                    id: 1,
                    label: '一级 1',
                    children: []
                }
                for (let i = 0; i < res.length; i++) {
                    if (res[i].parent == 0) {
                        content = {
                            id: res[i].comditytypeId,
                            label: res[i].typename,
                            children: []
                        }
                        opt = {
                            value: res[i].comditytypeId,
                            label: res[i].typename
                        }
                        this.options[1].options.push(opt)
                        this.data.push(content);
                    } else {
                        for (let j = 0; j < this.data.length; j++) {
                            if (res[i].parent == this.data[j].id) {
                                content = {
                                    id: res[i].comditytypeId,
                                    label: res[i].typename,
                                    children: []
                                }
                                opt = {
                                    value: res[i].comditytypeId,
                                    label: res[i].typename
                                }
                                this.options[2].options.push(opt)
                                this.data[j].children.push(content);
                            } else {
                                for (let k = 0; k < this.data[j].children.length; k++) {
                                    if (this.data[j].children[k].id == res[i].parent) {
                                        content = {
                                            id: res[i].comditytypeId,
                                            label: res[i].typename,
                                            children: []
                                        }
                                        opt = {
                                            value: res[i].comditytypeId,
                                            label: res[i].typename
                                        }
                                        this.data[j].children[k].children.push(content);
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch((error) => {
                this.$message.error(error)
            })
        }
    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

    #app {
        width: 75vw;
        margin: 0px auto;
        border: 1px solid #67c23a;
        border-radius: 5px;
        justify-content: center;
    }

    #app:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 4px;
    }

    .input {
        width: 75vw;
        height: 80px;
        border-bottom: 1px solid #67c23a;
        display: flex;
        justify-content: center;
    }
</style>
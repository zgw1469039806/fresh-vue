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
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree2">
            <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除当前分类
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
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    fatherid: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
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
                        options: [{
                            value: 'Shanghai',
                            label: '上海'
                        }, {
                            value: 'Beijing',
                            label: '北京'
                        }]
                    }, {
                        label: '二级分类',
                        options: [{
                            value: 'Chengdu',
                            label: '成都'
                        }, {
                            value: 'Shenzhen',
                            label: '深圳'
                        }, {
                            value: 'Guangzhou',
                            label: '广州'
                        }, {
                            value: 'Dalian',
                            label: '大连'
                        }]
                    }, {
                        label: '三级分类',
                        options: [{
                            value: 'Chengdu',
                            label: '成都'
                        }, {
                            value: 'Shenzhen',
                            label: '深圳'
                        }, {
                            value: 'Guangzhou',
                            label: '广州'
                        }, {
                            value: 'Dalian',
                            label: '大连'
                        }]
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
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleClose() {//关闭dialog
                this.dialogVisible = false;
            },
            submitForm(formName) {//增加表单提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {//添加表单重置
                this.$refs[formName].resetFields();
            },
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
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
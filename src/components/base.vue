<template>
    <div class="fatherbox">
        <div class="leftdiv">
            <el-container>
                <el-aside width="20vw" class="leftdiv">
                    <!--默认展开项 :default-openeds="['1', '3']"-->
                    <!--左侧导航开始-->
                    <el-menu class="list">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                门店管理
                            </template>
                            <el-submenu index="1-1">
                                <template slot="title">门店信息编辑</template>
                                <el-menu-item index="1-1-1" @click="$router.push({path:'/storeedit/1'})">添加门店</el-menu-item>
                                <el-menu-item index="1-1-2" @click="$router.push({path:'/storeedit/2'})">编辑门店
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-2">
                                <template slot="title">切换店铺</template>
                                <el-menu-item index="1-2-1">店铺01</el-menu-item>
                                <el-menu-item index="1-2-2">店铺02</el-menu-item>
                                <el-menu-item index="1-2-3">店铺03</el-menu-item>
                            </el-submenu>
                            <el-submenu index="1-3">
                                <template slot="title">小程序管理</template>
                                <el-menu-item index="1-3-1">Banner设置</el-menu-item>
                                <el-menu-item index="1-3-2">Banner设置</el-menu-item>
                                <el-menu-item index="1-3-3">Banner设置</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                员工管理
                            </template>
                            <el-submenu index="2-1">
                                <template slot="title">员工权限管理</template>
                                <el-menu-item index="2-1-1">设置员工职务</el-menu-item>
                                <el-menu-item index="2-1-2">查看操作日志</el-menu-item>
                                <el-menu-item index="2-1-3">员工流水报表</el-menu-item>
                            </el-submenu>
                            <el-submenu index="2-2">
                                <template slot="title">员工管理</template>
                                <el-menu-item index="2-2-1">新增员工</el-menu-item>
                                <el-menu-item index="2-2-2">员工详细信息</el-menu-item>
                                <el-menu-item index="2-2-3">编辑员工</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                进存管控
                            </template>
                            <el-submenu index="3-1">
                                <template slot="title">进货管控</template>
                                <el-menu-item index="3-1-1">新进货物</el-menu-item>
                                <el-menu-item index="3-1-2">进货流水</el-menu-item>
                            </el-submenu>
                            <el-submenu index="3-2">
                                <template slot="title">入库管控</template>
                                <el-menu-item index="3-2-1">入库</el-menu-item>
                                <el-menu-item index="3-2-2">入库流水</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                销售
                            </template>
                            <el-menu-item index="4-1">新增订单</el-menu-item>
                            <el-submenu index="4-2">
                                <template slot="title">订单管控</template>
                                <el-menu-item index="4-2-1">订单流水</el-menu-item>
                                <el-menu-item index="4-2-2">挂弹管理</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                会员中心
                            </template>
                            <el-menu-item index="5-1">新增会员</el-menu-item>
                            <el-submenu index="5-2">
                                <template slot="title">会员管控</template>
                                <el-menu-item index="5-2-1">会员详细</el-menu-item>
                                <el-menu-item index="5-2-2">积分设置</el-menu-item>
                                <el-menu-item index="5-2-3">会员等级设定</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                货物管控
                            </template>
                            <el-menu-item index="6-1">新建货品</el-menu-item>
                            <el-submenu index="6-2">
                                <template slot="title">货品控制</template>
                                <el-menu-item index="6-2-1">上架货物</el-menu-item>
                                <el-menu-item index="6-2-2">下架货物</el-menu-item>
                                <el-menu-item index="6-2-3">修改货物属性</el-menu-item>
                            </el-submenu>
                            <el-submenu index="6-3">
                                <template slot="title">货品属性管理</template>
                                <el-menu-item index="6-3-1">货品分类管理</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-menu>
                    <!--右侧内容开始-->
                </el-aside>
                <div class="rightdiv">
                    <transition name="move" mode="out-in">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "base"
    }
</script>

<style scoped>
    .fatherbox{
        background: #fff;
    }
    .leftdiv {
        background: #fff;
        border: 1px solid red;
        height: 700px;

    }
    .list:after{
        background-color: #f4f6f9;
        border-radius: 5px;
    }
    .rightdiv{
        background: #fff;
        width: 80vw;
    }
</style>
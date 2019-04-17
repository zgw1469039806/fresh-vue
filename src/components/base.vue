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
                                <el-menu-item index="1-1-1"
                                              @click="$router.push({name: 'storeinsert',params:{type:'insert'}})">添加门店
                                </el-menu-item>
                                <el-menu-item index="1-1-2" @click="$router.push({path:'/storeedit'})">编辑门店
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
                                <template slot="title">员工流水管理</template>
                                <el-menu-item index="2-1-1" @click="$router.push({path:'/stafflog'})">查看操作日志
                                </el-menu-item>
                                <el-menu-item index="2-1-2">员工流水报表</el-menu-item>
                            </el-submenu>
                            <el-submenu index="2-2">
                                <template slot="title">员工管理</template>
                                <el-menu-item index="2-2-1"
                                              @click="$router.push({name:'staffinsert',params:{type:'insert'}})">新增员工
                                </el-menu-item>
                                <el-menu-item index="2-2-2" @click="$router.push({path:'/staffedit'})">编辑员工
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                进存管控
                            </template>
                            <el-submenu index="3-1">
                                <template slot="title">进货管控</template>
                                <el-menu-item index="3-1-1" @click="$router.push({path:'/purchasereport'})">进货流水
                                </el-menu-item>
                            </el-submenu>
                            <el-submenu index="3-2">
                                <template slot="title">入库管控</template>
                                <el-menu-item index="3-2-1" @click="$router.push({path:'/depositwarehousing'})">入库</el-menu-item>
                                <el-menu-item index="3-2-2">入库流水</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                销售
                            </template>
                            <el-menu-item index="4-1" @click="$router.push({path:'/orderinsert'})">新增订单</el-menu-item>
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
                            <el-menu-item index="5-1" @click="$router.push({path:'/vipinsert'})">新增会员</el-menu-item>
                            <el-submenu index="5-2">
                                <template slot="title">会员管控</template>
                                <el-menu-item index="5-2-1" @click="$router.push({path:'/vipdetails'})">会员详细
                                </el-menu-item>
                                <el-menu-item index="5-2-2" @click="$router.push({path:'/vipintegral'})">积分设置
                                </el-menu-item>
                                <el-menu-item index="5-2-3" @click="$router.push({path:'/viplevel'})">会员等级设定
                                </el-menu-item>
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
                                <el-menu-item index="6-2-3" @click="$router.push({path:'/commodityattribute'})">货品详细
                                </el-menu-item>
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
                    <span id="head"><span id="huanying">欢迎您，<span id="name">郭狗屎</span></span></span>
                    <transition name="move" mode="out-in">
                            <router-view></router-view>
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
    .fatherbox {
        background: #fff;
    }

    .leftdiv {
        background: #fff;
        border: 1px solid red;
        height: 700px;

    }

    .list:after {
        background-color: #f4f6f9;
        border-radius: 5px;
    }

    .rightdiv {
        background: #fff;
        width: 80vw;
    }

    #head {
        display: block;
        height: 50px;
        border-radius: 2px;
        width: 79vw;
        background: #67c23a;
        margin-bottom: 15px;
    }

    #huanying {
        display: block;
        text-align: center;
        line-height: 50px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    }
</style>
<template>
    <div class="fatherbox">
        <div>
            <el-container>
                <el-aside width="15vw" class="leftdiv">
                    <!--默认展开项 :default-openeds="['1', '3']"-->
                    <!--左侧导航开始-->
                    <el-menu class="list" background-color="rgb(48, 65, 86)" text-color="#fff">
                        <span class="version">果易联盟 <span style="font-size: 10px">v1.0.1</span></span>
                        <div v-for="(qx,index) in quanxian" :key="index">
                            <el-submenu v-if="qx=='ROLE_MD'" index="1">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    门店管理
                                </template>
                                <el-submenu index="1-1">
                                    <template slot="title">门店信息编辑</template>
                                    <el-menu-item index="1-1-1"
                                                  @click="$router.push({name: 'storeinsert',params:{type:'insert'}})">
                                        添加门店
                                    </el-menu-item>
                                    <el-menu-item index="1-1-2" @click="$router.push({path:'/storeedit'})">编辑门店
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="1-2">
                                    <template slot="title">切换店铺</template>
                                    <span v-for="(list,index) in mendianlist" :key="index">
                                  <el-menu-item index='index' @click="clickMd(list.storename,list.storeid)">{{list.storename}}</el-menu-item>
                                </span>
                                </el-submenu>
                                <!--                                <el-submenu index="1-3">-->
                                <!--                                    <template slot="title">小程序管理</template>-->
                                <!--                                    <el-menu-item index="1-3-1">Banner设置</el-menu-item>-->
                                <!--                                    <el-menu-item index="1-3-2">Banner设置</el-menu-item>-->
                                <!--                                    <el-menu-item index="1-3-3">Banner设置</el-menu-item>-->
                                <!--                                </el-submenu>-->
                            </el-submenu>
                            <el-submenu v-if="qx=='ROLE_YUANGONG'" index="2">
                                <template slot="title">
                                    <i class="el-icon-share"></i>
                                    员工管理
                                </template>
                                <el-submenu index="2-1">
                                    <template slot="title">员工流水管理</template>
                                    <el-menu-item index="2-1-1" @click="$router.push({path:'/stafflog'})">查看操作日志
                                    </el-menu-item>
                                    <el-menu-item index="2-1-2" @click="$router.push({path:'/water'})">员工流水报表
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="2-2">
                                    <template slot="title">员工管理</template>
                                    <el-menu-item index="2-2-1"
                                                  @click="$router.push({name:'staffinsert',params:{type:'insert'}})">
                                        新增员工
                                    </el-menu-item>
                                    <el-menu-item index="2-2-2" @click="$router.push({path:'/staffedit'})">编辑员工
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu v-if="qx=='ROLE_JINCUN'" index="3">
                                <template slot="title">
                                    <i class="el-icon-sold-out"></i>
                                    进存管控
                                </template>
                                <el-submenu index="3-1">
                                    <template slot="title">进货管控</template>
                                    <el-menu-item index="3-1-1" @click="$router.push({path:'/purchasereport'})">进货流水
                                    </el-menu-item>
                                </el-submenu>
                                <!--                                <el-submenu index="3-2">-->
                                <!--                                    <template slot="title">入库管控</template>-->
                                <!--                                    &lt;!&ndash;<el-menu-item index="3-2-1" @click="$router.push({path:'/depositwarehousing'})">入库</el-menu-item>&ndash;&gt;-->
                                <!--                                    <el-menu-item index="3-2-1" @click="$router.push({path:'/depositrepost'})">入库流水-->
                                <!--                                    </el-menu-item>-->
                                <!--                                </el-submenu>-->
                            </el-submenu>
                            <el-submenu v-if="qx == 'ROLE_XIAOSHOU'" index="4">
                                <template slot="title">
                                    <i class="el-icon-goods"></i>
                                    销售管理
                                </template>
                                <el-menu-item index="4-1"
                                              @click="$router.push({name:'orderinsert',params:{md : mendian.id}})">
                                    新增订单
                                </el-menu-item>
                                <el-submenu index="4-2">
                                    <template slot="title">订单管控</template>
                                    <!--<el-menu-item index="4-2-1" @click="$router.push({path:'/orderrepost'})">订单</el-menu-item>-->
                                    <el-submenu index="4-2-1">
                                        <template slot="title">订单</template>
                                        <el-menu-item index="4-2-1-1"
                                                      @click="$router.push({name:'orderrepost',params:{md : mendian.id}})">
                                            线上订单
                                        </el-menu-item>
                                        <el-menu-item index="4-2-1-2"
                                                      @click="$router.push({name:'orderoffline',params:{md : mendian.id}})">
                                            线下订单
                                        </el-menu-item>
                                    </el-submenu>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu v-if="qx == 'ROLE_VIP'" index="5">
                                <template slot="title">
                                    <i class="el-icon-star-off"></i>
                                    会员中心
                                </template>
                                <el-menu-item index="5-1" @click="$router.push({path:'/vipinsert'})">新增会员</el-menu-item>
                                <el-submenu index="5-2">
                                    <template slot="title">会员管控</template>
                                    <el-menu-item index="5-2-1" @click="$router.push({path:'/vipdetails'})">会员详细
                                    </el-menu-item>
                                    <el-menu-item v-if="qx!='ROLE_VIPGK'" index="5-2-2"
                                                  @click="$router.push({path:'/vipintegral'})">积分设置
                                    </el-menu-item>
                                    <el-menu-item v-if="qx!='ROLE_VIPGK'" index="5-2-3"
                                                  @click="$router.push({path:'/viplevel'})">会员等级设定
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-submenu v-if="qx == 'ROLE_HUOWU'" index="6">
                                <template slot="title">
                                    <i class="el-icon-news"></i>
                                    货物管控
                                </template>
                                <el-submenu index="6-1">
                                    <template slot="title">货品控制</template>
                                    <el-menu-item index="6-1-1" @click="$router.push({path:'/commodityUpDown'})">上\下架货物
                                    </el-menu-item>
                                    <el-menu-item index="6-1-2" @click="$router.push({path:'/commodityattribute'})">货品详细
                                    </el-menu-item>
                                </el-submenu>
                                <el-submenu index="6-3">
                                    <template slot="title">货品属性管理</template>
                                    <el-menu-item index="6-2-1" @click="$router.push({path:'/commoditytype'})">货品分类管理
                                    </el-menu-item>
                                </el-submenu>
                            </el-submenu>
                        </div>

                    </el-menu>
                    <!--右侧内容开始-->
                </el-aside>
                <div class="rightdiv">
                    <span id="head">
                        <span id="huanying">欢迎您，
                        <span id="name">{{username}}</span>
                        当前所在店铺:{{mendian.name}}
                            <span style="margin-left: 30px">
                            <el-button @click="clearCookie">注销</el-button>
                                </span>
                        </span>
                    </span>
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </el-container>
        </div>
    </div>
</template>

<script>

    import mendianC from "../Constant.js";

    export default {
        name: "master",
        data() {
            return {
                username: '',
                mendian: {
                    name: '测试门店',
                    id: '1'
                },
                mendianlist: new Array(),
                quanxian: []
            }
        }, methods: {
            clickMd: function (name, id) {
                this.mendian.name = name;
                this.mendian.id = id;
                mendianC.id = id;
            },
            clearCookie: function () {
                this.axios.get("http://localhost:8111/exitUser").then(() => {
                    window.location.href = "http://localhost:8111/reUrl";
                });
            }
        }, created() {
            var demo = 'ROLE_USER-ROLE_ACCOUNTING-ROLE_YUANGONG-ROLE_JINCUN-ROLE_XIAOSHOU-ROLE_VIP-ROLE_HUOWU-ROLE_MD-ROLE_VIPGK'
            let q1 = demo.split('-');
            for (let i = 0; i < q1.length; i++) {
                this.quanxian.push(q1[i]);
            }
            this.axios.get("/getPrinciple").then((response) => {
                let data = response.data;
                let oauth = data['OAuth2'];
                oauth = oauth.replace("[", "");
                oauth = oauth.replace("]", "");
                let q = oauth.split('-');
                for (let i = 0; i < q.length; i++) {
                    this.quanxian.push(q[i]);
                }
                this.username = data['name'];
            });
            this.axios.post('/GdStoreQueryAll', {}).then((response) => {
                if (response.data.msg == "处理成功") {
                    var data = response.data.data;
                    this.mendianlist = data;
                    this.mendian.name = data[0].storename;
                    this.mendian.id = data[0].storeid;
                    mendianC.id = data[0].storeid;
                }
            });
        }
    }
</script>

<style scoped>
    .fatherbox {
        background: #fff;
        height: 100%;
    }

    .leftdiv {
        background: rgb(48, 65, 86);
        border-bottom: 0px;
        height: 50vw;
        border-radius: 3px;
        /*letter-spacing:2px;*/
    }

    .list:after {
        background-color: #fff;
        border-radius: 5px;
    }

    .rightdiv {
        background: #fff;
        width: 83vw;
    }

    #head {
        margin: 0 auto;
        display: block;
        height: 50px;
        border-radius: 2px;
        width: 81vw;
        /*background: #409EFF;*/
        border-bottom: 1px solid #409EFF;
        margin-bottom: 15px;
    }

    #huanying {
        display: block;
        text-align: center;
        line-height: 50px;
    }

    template {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .version {
        width: 100%;
        text-align: center;
        color: white;
        font-size: 20px;
        line-height: 50px;
        height: 50px;
        display: block;
    }
</style>

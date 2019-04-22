import vue from 'vue'
import Router from 'vue-router'

//将router注册到全局变量中
//use 是vue中的静态方法。用于将组建注册进vue中
vue.use(Router);

const routes = [
    {
        path: '/master',
        component: () => import("./components/master.vue"),
        meta: {
            title: "格调生鲜"
        },
        children: [
            {
                path: '/storeedit',
                component: () => import("./view/store/storeedit.vue"),
                meta: {
                    title: "门店信息管理"
                },
                props : true
            },
            {
                name:'storeinsert',
                path: '/storeinsert',
                component: () => import("./view/store/storeinsert.vue"),
                meta: {
                    title: "添加页面"
                },
                props : true
            },
            {
                path: '/staffedit',
                component: () => import("./view/staff/staffedit.vue"),
                meta: {
                    title: "设置员工职位"
                }
            },
            {
                path: '/stafflog',
                component: () => import("./view/staff/stafflog.vue"),
                meta: {
                    title: "员工日志"
                }
            },
            {
                name: 'staffinsert',
                path: '/staffinsert',
                component: () => import("./view/staff/staffinsert.vue"),
                meta: {
                    title: "新增员工"
                }
            },
            {
                path: '/staffedit',
                component: () => import("./view/staff/staffedit.vue"),
                meta: {
                    title: "员工编辑"
                }
            },
            {
                path: '/purchaseinsert',
                component: () => import("./view/purchase/purchaseinsert.vue"),
                meta: {
                    title: "进货"
                }
            },
            {
                path: '/purchasereport',
                component: () => import("./view/purchase/purchasereport.vue"),
                meta: {
                    title: "进货流水"
                }
            },
            {
                path: '/depositwarehousing',
                component: () => import("./view/deposit/depositwarehousing.vue"),
                meta: {
                    title: "入库"
                }
            },
            {
                path: '/orderinsert',
                component: () => import("./view/order/orderinsert.vue"),
                meta: {
                    title: "新增订单"
                }
            },
            {
                path: '/orderrepost',
                component: () => import("./view/order/orderrepost.vue"),
                meta: {
                    title: "线上订单"
                }
            },
            {
                path: '/orderoffline',
                component: () => import("./view/order/orderoffline.vue"),
                meta: {
                    title: "线下订单"
                }
            },
            {
                path: '/orderlist',
                component: () => import("./view/order/orderlist.vue"),
                meta: {
                    title: "挂单管理"
                }
            },
            {
                path: '/vipinsert',
                component: () => import("./view/vip/vipinsert.vue"),
                meta: {
                    title: "新增会员"
                }
            },
            {
                path: '/vipdetails',
                component: () => import("./view/vip/vipdetails.vue"),
                meta: {
                    title: "会员详情"
                }
            },
            {
                path: '/vipintegral',
                component: () => import("./view/vip/vipintegral.vue"),
                meta: {
                    title: "会员积分"
                }
            },
            {
                path: '/viplevel',
                component: () => import("./view/vip/viplevel.vue"),
                meta: {
                    title: "会员等级"
                }
            },
            {
                path: '/commodityattribute',
                component: () => import("./view/commodity/commodityattribute.vue"),
                meta: {
                    title: "修改商品属性"
                }
            },
            {
                path: '/commoditytype',
                component: () => import("./view/commodity/commoditytype.vue"),
                meta: {
                    title: "商品分类管理"
                }
            },
            {
                path: '/add_viplevel',
                component: () => import("./view/vip/vip_level_crud/add_viplevel.vue"),
                meta: {
                    title: "增加会员等级"
                }
            },
            {
                path: '/upd_viplevel/:vipleaveid',
                name:'upd_viplevel',
                component: () => import("./view/vip/vip_level_crud/upd_viplevel.vue"),
                meta: {
                    title: "修改会员等级"
                }
            },
            {
                path: '/vipedit/:vipId',
                name:'vipedit',
                component: () => import("./view/vip/vipedit.vue"),
                meta: {
                    title: "编辑会员信息"
                }
            }
        ]
    },
    {path: '/*',component:()=> import("./components/master.vue")}

];

routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});
const router = new Router({routes});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
})

export {
    router
};

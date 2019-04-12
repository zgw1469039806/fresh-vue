import vue from 'vue'
import Router from 'vue-router'

//将router注册到全局变量中
//use 是vue中的静态方法。用于将组建注册进vue中
vue.use(Router);

const routes = [
    {
        path: '/base',
        component: () => import("./components/base.vue"),
        meta: {
            title: "格调生鲜"
        }
    },
];

routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
    alert(route.path);
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

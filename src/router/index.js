import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var routes = [
    {
        path: '/',
        component: res => require(['~/components/main.vue'],res),
        children: [
            {
                path: 'taskList',
                component: aaa => require(['~/components/taskList.vue'],aaa)
            },
            {
                path: 'errorList',
                component: aaa => require(['~/components/errorList.vue'],aaa)
            },
            {
                path: 'sqlAnalysis',
                component: bbb => require(['~/components/sqlAnalysis.vue'],bbb)
            }
        ]
    },
]
var router = new VueRouter({
    routes
})

export default router
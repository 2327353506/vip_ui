<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark header">
                    <el-button type="text" class="nav_brand">{{title}}</el-button>
                </div>
            </el-col>
        </el-row>
        <el-container class="main" :style="{height:height}">
            <el-aside width="250px" style="background-color: rgb(238, 241, 246);" :style="{height:height}">
                <el-menu>
                    <el-menu-item v-for="(menu,index) in menus" :index="index+''" @click="menu_click(menu.url)">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{menu.name}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main style="position: absolute;left: 250px;padding: 0px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: 'Project name',
                menus: [
                    {name:'任务调度',icon:'el-icon-time',url:'/taskList'},
                    {name:'异常日志',icon:'el-icon-setting',url:'/errorList'},
                    {name:'SQL分析',icon:'el-icon-menu',url:'/sqlAnalysis'}
                ],
                height:(document.documentElement.clientHeight-50)+'px',
                width:document.documentElement.clientWidth
            }
        },
        methods: {
            menu_click(url){
                this.$router.push(url)
            }
        },
        mounted() {
            const that = this;
            window.onresize = function temp() {
                that.height = (document.documentElement.clientHeight-50)+'px';
            };
        }
    }
</script>
<style>
.header {
    height: 50px;
    background-color: black;
}
.main {
    width: 100%;
}
.nav_brand {
    font-size: 20px;
    margin-left: 20px;
}
</style>
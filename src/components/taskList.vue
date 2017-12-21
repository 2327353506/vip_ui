<template>
    <div style="padding: 20px">
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="任务名称">
                <el-input  placeholder="任务名称" v-model="page.jobName"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select  placeholder="状态" v-model="page.status">
                    <el-option label="" value=""></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="initTable()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="add()">新增</el-button>
        <el-table
                :data="taskList"
                border
                stripe
                style="width: 1150px">
            <el-table-column
                    fixed
                    type="index"
                    width="50"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="jobName"
                    label="任务名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="jobClass"
                    label="任务class"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="jobCronExpression"
                    label="任务时间"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="60"
                    >
                <template slot-scope="scope">
                    {{scope.row.status | convStatus}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="updateDt"
                    label="更新时间"
                    width="200">
                <templete slot-scope="scope">
                    {{ scope.row.updateDt |dateFilter}}
                </templete>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="350">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row.id)">修改</el-button>
                    <el-button type="success" size="mini" v-if="scope.row.status == 1" @click="stop(scope.row.id)">停止</el-button>
                    <el-button type="info"size="mini" v-if="scope.row.status == 0" @click="open(scope.row.id)">启动</el-button>
                    <el-button type="warning" size="mini" @click="del(scope.row.id)">删除</el-button>
                    <el-button type="danger" size="mini" @click="mul(scope.row.id)">手动执行</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.offset+1"
                :page-sizes="[15, 20, 30, 50]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <el-dialog
                title="任务"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form ref="form"  label-width="90px">
                <el-form-item label="任务名称"  required>
                    <el-input v-model="task.jobName"></el-input>
                </el-form-item>
                <el-form-item label="任务Class" required>
                    <el-input v-model="task.jobClass" ></el-input>
                </el-form-item>
                <el-form-item label="任务时间" required >
                    <el-col :span="4">
                        <el-input  style="width: 95%;" v-model="expression.a1" ></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input   style="width: 95%;"  v-model="expression.a2"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input   style="width: 95%;"  v-model="expression.a3"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input   style="width: 95%;"  v-model="expression.a4"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input   style="width: 95%;"  v-model="expression.a5"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {formatDate} from '~/common/date.js'
    export default {
       data(){
           return {
               taskList: [],
               total:0,
               page:{
                   offset: 0,
                   limit: 15,
                   jobName: "",
                   status: ""
               },
               dialogVisible: false,
               expression: {
                   "a1":'*',
                   "a2":'*',
                   "a3":'*',
                   "a4":'*',
                   "a5":'*',
               },
               task:{
                   id: "",
                   jobName: "",
                   jobCronExpression: "",
                   jobClass: "",
               }
           }
       },
       created(){
            this.$post(this.$store.state.root +"/task/list",this.page,(res) => {
                this.taskList = res.data.rows;
                this.total = res.data.total;
            })
       },
       methods: {
           handleSizeChange: function(val){
               this.page.limit = val;
               this.initTable();
           },
           handleCurrentChange: function(val){
               this.page.offset = val;
               this.initTable();
           },
           handleClose: function(done){
               this.$confirm('确认关闭？')
                   .then(_ => {
                       done();
                   })
                   .catch(_ => {});
           },
           initTable: function(){
               this.$post(this.$store.state.root +"/task/list",this.page,(res) => {
                   this.taskList = res.data.rows;
                   this.total = res.data.total;
               })
           },
           mul: function(id){
               this.$post(this.$store.state.root +"/task/manual",{id:id},(res) => {
                   if(res.code==0){
                       this.$alert("拉取成功");
                   }else{
                       this.$alert(res.msg);
                   }
               })
           },
           open: function(id){
               this.$get(this.$store.state.root + "/task/open",{id:id},(res)=>{
                   if(res.code==0){
                       this.initTable();
                   }else{
                       this.$alert(res.msg);
                   }
               })
           },
           stop: function(id){
               this.$get(this.$store.state.root + "/task/stop",{id:id},(res)=>{
                   if(res.code==0){
                       this.initTable();
                   }else{
                       this.$alert(res.msg);
                   }
               })
           },
           add: function(){
               this.dialogVisible = true;
               this.task={
                   id: "",
                   jobName: "",
                   jobCronExpression: "",
                   jobClass: "",
               }
               this.expression= {
                   "a1":'*',
                   "a2":'*',
                   "a3":'*',
                   "a4":'*',
                   "a5":'*',
               }
           },
           edit: function(id){
               this.$get(this.$store.state.root + "/task/detail",{id:id},(res) =>{
                   if(res.code==0){
                       this.task = res.data;
                       var arr = res.data.jobCronExpression.split(" ");
                       this.expression["a1"]= arr[0];
                       this.expression["a2"]= arr[1];
                       this.expression["a3"]= arr[2];
                       this.expression["a4"]= arr[3];
                       this.expression["a5"]= arr[4];
                       this.dialogVisible=true;
                   }else{
                       this.$alert(res.msg);
                   }
               })
           },
           save: function(){
               this.task.jobCronExpression = "";
               for(var key in this.expression){
                   this.task.jobCronExpression=this.task.jobCronExpression+this.expression[key]+" ";
               }
               this.task.jobCronExpression=this.task.jobCronExpression+"?"
               //this.task.jobCronExpression = this.expression["a1"]+" "+this.expression["a1"]+" "+this.expression["a1"]+" "+this.expression["a1"]+" "+this.expression["a1"]+" ?"
               this.$post(this.$store.state.root+"/task/save",this.task,(res) => {
                   if(res.code==0){
                       this.dialogVisible=false;
                       this.$alert("保存成功");
                       this.initTable();
                   }else{
                       this.$alert(res.msg);
                   }
               })
           },
           del: function(id){
               this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
               }).then(() => {
                   this.$get(this.$store.state.root + "/task/del",{id:id},(res)=>{
                       if(res.code==0){
                           this.initTable();
                           this.$message({
                               type: 'success',
                               message: '删除成功!'
                           });
                       }else{
                           this.$alert(res.msg);
                       }
                   })
               }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除'
                   });
               });
           },

       },
       filters: {
            convStatus: function(value){
                switch (value){
                    case 0 :
                        return "禁用";
                    case 1 :
                        return "启用";
                    case 2 :
                        return "删除";
                }
            },
           dateFilter: function(value){
                if(value){
                    var date = new Date(value);
                    return formatDate(date,"yyyy-MM-dd hh:mm:ss");
                }
                return value;
           }
        },
    }

</script>
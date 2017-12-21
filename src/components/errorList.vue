<template>
    <div style="padding: 20px">
        <el-table
                :data="errorList"
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
                    prop="jobClass"
                    label="任务名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="开始时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="errorInfo"
                    label="错误日志"
                    width="300"
            >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" >查看错误日志</el-button>
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
    </div>
</template>
<script>
    export default {
        data(){
           return {
               errorList: [],
               total:0,
               page:{
                   offset: 0,
                   limit: 15,
               },
           }
        },
        created: function(){
            this.$post(this.$store.state.root +"/errorCentre/list",this.page,(res) => {
                this.errorList = res.data.rows;
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
            initTable: function(){
                this.$post(this.$store.state.root +"/errorCentre/list",this.page,(res) => {
                    this.errorList = res.data.rows;
                    this.total = res.data.total;
                })
            }
        }
    }
</script>
<!-- 学生管理 -->
<template>
    <el-page-header @back="goBack">
        <template #content>
            <span class="text-large font-600 mr-3"> 商品管理 </span>
        </template>
    </el-page-header>
    <main>
        <el-table :data="filterTableData" border>
            <el-table-column label="考生号" prop="cid" align="center"/>
            <el-table-column label="姓名" prop="sname" align="center" width="120"/>
            <el-table-column label="专业" prop="profession" align="center" width="160"/>
            <el-table-column label="性别" prop="sex" align="center" width="80"/>
            <el-table-column label="电话" prop="tel" align="center"/>
            <el-table-column label="身份证" prop="idcard" align="center"/>

            <el-table-column align="right" width="200">
                <template #header>
                    <div class="function_header">
                        <el-button type="primary" size="small" plain class="add_item">添加用户</el-button>
                        <el-input v-model="search" size="small" placeholder="Type to search"/>
                    </div>
                </template>
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-popconfirm title="Are you sure to delete this?"
                    @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
    </main>
</template>

<script setup>
import {computed, ref} from 'vue'

const tableData = [
    {
        cid:1008611,
        sname:"陈冠希",
        profession:"移动开发",
        sex:"男",
        tel:13900000000,
        idcard:4000000000000000001
    },
    {
        cid:1008611,
        sname:"陈冠希",
        profession:"移动开发",
        sex:"男",
        tel:13900000000,
        idcard:4000000000000000001
    },
    {
        cid:1008611,
        sname:"陈冠希",
        profession:"移动开发",
        sex:"男",
        tel:13900000000,
        idcard:4000000000000000001
    },
    {
        cid:1008612,
        sname:"哈喽",
        profession:"移动开发",
        sex:"男",
        tel:13900000001,
        idcard:4000000000000000001
    }
]

const search = ref('')
const filterTableData = computed(() =>
        tableData.filter((data) => !search.value ||
                (data.cid+"").includes(search.value)||
                (data.tel+"").includes(search.value)||
                (data.sname+"").includes(search.value))
)
const handleEdit = (index, row) => {
    console.log(index, row)
}
const handleDelete = (index, row) => {
    console.log(index, row);
}
const goBack = () => {
    console.log('go back')
}

/*是否删除*/
</script>

<style scoped>
main {
    padding: 20px;
    position: relative;
    width: 1200px;
    margin: 0 auto;
}

.add_item {
    position: relative;
    margin-right: 10px;
}

.function_header {
    display: flex;
}
</style>

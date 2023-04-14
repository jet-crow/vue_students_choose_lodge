<!-- 学生管理 -->
<template>
    <el-page-header @back="goBack">
        <template #content>
            <span class="text-large font-600 mr-3"> 房间管理 </span>
        </template>
    </el-page-header>
    <main>
        <el-table :data="filterTableData" border>
            <el-table-column label="房间号" prop="roomId" align="center" />
            <el-table-column label="一号床铺" prop="bed1" align="center" width="200" />
            <el-table-column label="二号床铺" prop="bed2" align="center" width="200" />
            <el-table-column label="三号床铺" prop="bed3" align="center" width="200" />
            <el-table-column label="四号床铺" prop="bed4" align="center" width="200" />

            <el-table-column align="right" width="200">
                <template #header>
                    <div class="function_header">
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </div>
                </template>
                <template #default="scope">
                    <div style="text-align: center;">
                        <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                            Update
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </main>
    <!-- 学生信息弹窗 -->
    <el-dialog v-model="showStudent" :title="roomInfo.title" width="1190"  @close="closeRoomInfo">
        <el-table :data="roomInfo.beds" border>
            <el-table-column label="床位" prop="id" align="center" width="80" />
            <el-table-column label="考生号" prop="studentId" align="center" width="120" />
            <el-table-column label="姓名" prop="name" align="center" width="120" />
            <el-table-column label="专业" prop="professional" align="center" width="150" />
            <el-table-column label="性别" prop="sex" align="center" width="80" />
            <el-table-column label="电话" prop="tel" align="center" width="200" />
            <el-table-column label="身份证" prop="idCard" align="center" width="200" />
            <el-table-column label="取消宿舍" align="center" width="200">
                <template #default="scope">
                    <el-button type="danger" @click="cancel(scope.$index, scope.row)">取消选择</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'

const tableData = reactive([
    {
        roomId: 1008611,
        bed1: "陈冠希 sadqwe",
        bed2: "陈冠希 22215150317",
        bed3: "陈冠希 22215150317",
        bed4: "陈冠希 22215150317",
    },
    {
        roomId: 1008611,
        bed1: "陈冠希 22215150317",
        bed2: "陈冠希 22215150317",
        bed3: "陈冠希 22215150317",
        bed4: "陈冠希 22215150317",
    },
    {
        roomId: 1008611,
        bed1: "2131232",
        bed2: "",
        bed3: "",
        bed4: "",
    },
    {
        roomId: 1008612,
        bed1: "陈冠希 22215150317",
        bed2: "陈冠希 22215150317",
        bed3: "陈冠希 22215150317",
        bed4: "陈冠希 22215150317",
    }
]);
const goBack = () => {
    console.log('go back')
}
const search = ref('')
const filterTableData = computed(() =>
    tableData.filter((data) => !search.value ||
        (data.roomId + "").includes(search.value) ||
        (data.bed1).includes(search.value) ||
        (data.bed2).includes(search.value) ||
        (data.bed3).includes(search.value) ||
        (data.bed4).includes(search.value))
)
//取消学生的选择
const showStudent = ref(false);
//请求这个房间的信息==>用房间的唯一id请求
const roomInfo = ref({
    title: "26栋A103",
    beds: [
        {
            id: 1,
            studentId: 123456789,
            name: "陈冠希",
            professional: "软件工程",
            sex: "男",
            tel: "12345678978",
            idCard: "123456789123456789"
        }, {
            id: 2,
            studentId: 123456789,
            name: "陈冠希",
            professional: "软件工程",
            sex: "男",
            tel: "12345678978",
            idCard: "123456789123456789"
        }, {
            id: 3,
            studentId: 123456789,
            name: "陈冠希",
            professional: "软件工程",
            sex: "男",
            tel: "12345678978",
            idCard: "123456789123456789"
        }, {
            id: 4,
            studentId: 123456789,
            name: "陈冠希",
            professional: "软件工程",
            sex: "男",
            tel: "12345678978",
            idCard: "123456789123456789"
        }
    ]
})
let selectRoomIndex;
const handleEdit = (index, row) => {
    //在这里请求
    selectRoomIndex = index;
    showStudent.value = true;
    // console.log(index, row)
}

const cancel = (index, data) => {
    //删除弹窗的单行
    tableData[selectRoomIndex]['bed' + data.id] = "";
    //在删除的时候 将外面表格的床铺置为空
    roomInfo.value.beds.splice(index, 1);
    ElMessage({
        type:'success',
        message:"取消选择成功"
    })
}
//关闭房间信息弹窗
const closeRoomInfo = () => {
    //关闭弹窗检测是否所有床铺都为空 若为空则删除这行数据 
    // console.log(tableData[selectRoomIndex]);
    let room = null;
    for (let i = 1; i <= 4; i++) {
        room = tableData[selectRoomIndex]['bed' + i]
        if (room != "") return;
    }
    tableData.splice(selectRoomIndex,1);
}

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

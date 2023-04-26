<!-- 学生管理 -->
<template>
    <el-page-header @back="$router.back()">
        <template #content>
            <span class="text-large font-600 mr-3"> 学生管理 </span>
        </template>
    </el-page-header>
    <main>
        <el-table :data="filterTableData" border>
            <el-table-column label="考生号" prop="studentId" align="center" />
            <el-table-column label="姓名" prop="name" align="center" width="120" />
            <el-table-column label="专业" prop="professional" align="center" width="160" />
            <el-table-column label="性别" prop="sex" align="center" width="80" />
            <el-table-column label="电话" prop="tel" align="center" />
            <el-table-column label="身份证" prop="idCard" align="center" />

            <el-table-column align="right" width="200">
                <template #header>
                    <div class="function_header">
                        <el-button type="primary" size="small" plain class="add_item" @click="addUserShow">添加用户</el-button>
                        <el-input v-model="search" size="small" placeholder="Type to search" />
                    </div>
                </template>
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index, scope.row)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗 -->
        <el-dialog v-model="show" @close="close" :title="isAdd ? '新增用户信息' : '修改用户信息'" width="60%" align-center>
            <div>学生账号：</div>
            <el-input size="large" placeholder="请输入用户名" v-model="userData.user">
                <template #prepend>账号:</template>
            </el-input>
            <el-input size="large" placeholder="请输入密码" v-model="userData.password">
                <template #prepend>密码:</template>
            </el-input>
            <div style=" height: 20px;"></div>
            <div>学生信息：</div>
            <el-input size="large" placeholder="请输入考生号" v-model="userData.studentId">
                <template #prepend>
                    <p style="width: 40px;">考生号:</p>
                </template>
            </el-input>
            <el-input size="large" placeholder="请输入姓名" v-model="userData.name">
                <template #prepend>
                    <p style="width: 40px;">姓名:</p>
                </template>
            </el-input>
            <el-input size="large" placeholder="请输入专业" v-model="userData.professional">
                <template #prepend>
                    <p style="width: 40px;">专业:</p>
                </template>
            </el-input>
            <el-input size="large" placeholder="请输入电话" v-model="userData.tel">
                <template #prepend>
                    <p style="width: 40px;">电话:</p>
                </template>
            </el-input>
            <el-input size="large" placeholder="请输入身份证" v-model="userData.idCard">
                <template #prepend>
                    <p style="width: 40px;">身份证:</p>
                </template>
            </el-input>
            <div style=" height: 10px;"></div>
            <div class="options_box">
                <label class="item">
                    <span>性别：</span>
                    <el-radio-group v-model="userData.sex">
                        <el-radio-button label="男" />
                        <el-radio-button label="女" />
                    </el-radio-group>
                </label>
                <label class="item">
                    <span>是否确认信息:</span>
                    <el-radio-group v-model="userData.isConfirmUserInfo">
                        <el-radio-button label="未确认" />
                        <el-radio-button label="已确认" />
                    </el-radio-group>
                </label>
                <label class="item">
                    <span>是否可以修改Tag:</span>
                    <el-radio-group v-model="userData.isUpdateTag">
                        <el-radio-button label="可修改" />
                        <el-radio-button label="不可修改" />
                    </el-radio-group>
                </label>
            </div>
            <template #footer>
                <el-button type="primary" v-show="isAdd" @click="addUser">
                    新增
                </el-button>
                <el-button type="primary" v-show="!isAdd" @click="updateUser">
                    修改
                </el-button>
            </template>
        </el-dialog>
    </main>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();
const tableData = ref([])

//请求所有用户信息
proxy.$api.get("/userInfo/allUser").then(r => {
    console.log(r.data);
    tableData.value = r.data;
})
//搜索功能
const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter((data) => !search.value ||
        (data.studentId + "").includes(search.value) ||
        (data.name + "").includes(search.value) ||
        (data.professional + "").includes(search.value) ||
        (data.sex + "").includes(search.value) ||
        (data.tel + "").includes(search.value) ||
        (data.idCard + "").includes(search.value))
)
//删除用户
const handleDelete = (index, row) => {
    tableData.value.splice(index, 1);
    proxy.$api("/account/delUser?uid=" + row.uid).then(r => {
        if (r.data) {
            ElMessage({
                type: "success",
                message: '添加用户成功',
            })
        }
    })
    console.log(index, row);
}

//弹窗
const show = ref(false);
const isAdd = ref(false);
const userData = ref({
    user: "",
    password: "",
    idCard: "",
    isConfirmUserInfo: 0,
    isUpdateTag: 0,
    name: "",
    professional: "",
    sex: "男",
    studentId: '',
    tel: "",
    uid: 0,
    userInfoId: 0
})
const textGoState = () => {
    userData.value.isConfirmUserInfo = userData.value.isConfirmUserInfo == '未确认' ? 0 : 1;
    userData.value.isUpdateTag = userData.value.isUpdateTag == '可修改' ? 0 : 1;
}
//修改用户
const handleEdit = (index, row) => {
    show.value = true;
    isAdd.value = false;
    userData.value = row;
    userData.value.index = index;//选中的下标
    userData.value.isConfirmUserInfo = userData.value.isConfirmUserInfo == 0 ? '未确认' : '已确认';
    userData.value.isUpdateTag = userData.value.isUpdateTag == 0 ? '可修改' : '不可修改';
    //查询用户的账号密码
    proxy.$api.get('/account/getUserById?uid=' + row.uid).then(r => {
        userData.value.user = r.data.user;
        userData.value.password = r.data.password;
    })
}
const updateUser = () => {
    textGoState();
    tableData.value[userData.value.index] = userData.value;
    proxy.$api.post("/userInfo/updateUser", proxy.$qs.stringify(userData.value)).then(r => {
        if (r.data == true) {
            ElMessage({
                type: "success",
                message: "修改成功"
            })
        }
    })
    show.value = false;
}
//添加用户
const addUserShow = () => {
    show.value = true;
    isAdd.value = true;
    userData.value = {
        user: "",
        password: "",
        idCard: "",
        isConfirmUserInfo: 0,
        isUpdateTag: 0,
        name: "",
        professional: "",
        sex: "男",
        studentId: '',
        tel: "",
        uid: 0,
        userInfoId: 0
    }
    userData.value.isConfirmUserInfo = userData.value.isConfirmUserInfo == 0 ? '未确认' : '已确认';
    userData.value.isUpdateTag = userData.value.isUpdateTag == 0 ? '可修改' : '不可修改';
}
const addUser = () => {
    textGoState();
    tableData.value.push(userData.value);
    proxy.$api.post("/userInfo/addUser", proxy.$qs.stringify(userData.value)).then(r => {
        ElMessage({
            type: "success",
            message: "添加成功"
        })
    })
    show.value = false;
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

.options_box {
    display: flex;
}

.item {
    height: 40px;
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.item span {
    justify-content: center;
    border: 1px solid #dcdfe6;
    display: inline-flex;
    color: #909399;
    padding: 0 20px;
    background-color: #f5f7fa;
    line-height: 40px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
</style>

<template>
    <main class="tac">
        <div class="menu_box">
            <Logo />
            <el-menu default-active="studentManagement" :router="true" @open="handleOpen" @close="handleClose">
                <el-menu-item index="studentManagement">
                    <el-icon>
                        <user />
                    </el-icon>
                    <span>学生管理</span>
                </el-menu-item>
                <el-menu-item index="buildingManagement">
                    <el-icon>
                        <school />
                    </el-icon>
                    <span>宿楼管理</span>
                </el-menu-item>
                <el-menu-item index="roomManagement">
                    <el-icon>
                        <house />
                    </el-icon>
                    <span>房间管理</span>
                </el-menu-item>
            </el-menu>
            <el-button type="primary" plain class="exit" @click="exit">退出</el-button>
        </div>
        <div class="view_item">
            <router-view />
        </div>
    </main>
</template>

<script setup>
import {
    User,House,School
} from '@element-plus/icons-vue'
import Logo from "@/components/Logo.vue";
import router from '@/router';

const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
const exit = () => {
    localStorage.removeItem("adminToken");
    router.replace("/admin/login")
}
</script>
<style scoped>
.tac {
    display: flex;
}

.menu_box {
    min-height: 100vh;
    background-color: white;
    padding-top: 4rem;
    position: relative;
    width: 180px;
    min-width: 180px;
}

.view_item {
    flex: 1;
    box-sizing: border-box;
    position: relative;
}

.exit {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
}
</style>
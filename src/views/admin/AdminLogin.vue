<template>
    <Logo />
    <main>
        <section class="login_box">
            <el-text class="title" type="primary">东软选舍管理端</el-text>
            <el-input class="font_size-2xl" v-model="input" placeholder="请输入您的管理员账号" clearable />
            <el-input class="font_size-2xl" v-model="password" type="password" placeholder="请输入您的管理员密码" show-password />
            <el-button class="font_size-2xl btn" type="primary" round @click="login">登录</el-button>
        </section>
    </main>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import Logo from '@/components/Logo.vue'
import router from '@/router';
const { proxy } = getCurrentInstance();
const input = ref('');
const password = ref('');

const login = () => {
    proxy.$api.post("/account/login", proxy.$qs.stringify({
        user: input.value,
        password: password.value
    })).then(r => {
        if (r.data.data != null && r.data.data.level == 1) {
            ElMessage({
                message: '登录成功',
                type: 'success',
            });
            localStorage.setItem("adminToken", r.data.data.token);
            router.push("/admin/studentManagement");
        } else {
            ElMessage({
                message: '登录失败',
                type: 'error',
            });
        }
    })
}
</script>

<style scoped src="../../assets/css/views/admin/adminLogin.css"></style>

<style scoped>
.font_size-2xl {
    font-size: var(--text-2xl) !important;
}
</style>
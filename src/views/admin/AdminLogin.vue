<template>
    <Logo />
    <main>
        <section class="login_box">
            <el-text class="title" type="primary">广职选舍管理端</el-text>
            <el-input class="font_size-2xl" v-model="input" placeholder="请输入您的管理员账号" clearable />
            <el-input class="font_size-2xl" v-model="password" type="password" placeholder="请输入您的管理员密码"
                show-password />
            <el-button class="font_size-2xl btn" type="primary" round>登录</el-button>
        </section>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import Logo from '@/components/Logo.vue'

const input = ref('');
const password = ref('');


</script>

<style scoped src="../../assets/css/views/admin/adminLogin.css"></style>

<style scoped>
.font_size-2xl{
    font-size: var(--text-2xl) !important;
}
</style>
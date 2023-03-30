<!-- ConfirmationInfo 确认信息页 -->
<template>
    <div id="Bg">
       <nav/>
        <main>
            <div class="confirmationInfo_from">
                <div>
                    <span>专业</span>
                    <input type="text" readonly="readonly" value="软件工程">
                </div>
                <div>
                    <span>考生号</span>
                    <input type="text" readonly="readonly" value="33212223">
                </div>
                <div>
                    <span>姓名</span>
                    <input type="text" readonly="readonly" value="小明">
                </div>
                <div>
                    <span>性别</span>
                    <input type="text" readonly="readonly" value="男">
                </div>
                <div>
                    <span>电话</span>
                    <input type="text" readonly="readonly" value="13900000000">
                </div>
                <div class="id_card">
                    <span>身份证</span>
                    <input type="text" readonly="readonly" value="4210000000000000000">
                </div>
                <div class="submit">
                    <div id="Submit">确认无误</div>
                    <span style="color:#c81623">注: 如信息有误，请联系教务处。</span>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import Nav from "../components/Nav.vue"

</script>

<style scoped>
@import url(../assets/css/views/confirmationInfo.css);
</style>
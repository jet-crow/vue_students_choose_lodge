<!-- 宿楼管理 -->
<template>
      <el-button type="primary" class="">新建宿舍楼</el-button>
      <main>
        <section class="new_building_btn">
            +
        </section>
        <div class="building_box"></div>
      </main>
</template>
<script setup></script>
<style scoped>
main{
    padding: 20px 60px 0px;

}
.new_building_btn{
    background-color: var(--color-blue-dark);
    text-align: center;
    font-size: var(--text-2xl);
    color: #fff;
    border-radius: 20px;
    transition: all .2s;
}
.new_building_btn:hover{
    background-color: var(--color-blue-light);

}

</style>
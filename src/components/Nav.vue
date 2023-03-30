<template>
    <nav>
        <h1>{{ props.title }}</h1>
    </nav>
</template>

<script setup>
const props = defineProps(['title'])

</script>
<style scoped>
/* nav Start */
nav {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: stretch;
    height: 6vh;
    width: 100vw;
    padding-right: 2vw;
    background-color: #1C4C8C;
    background-image: url(../assets/images/logoCenter.png);
    background-position: 1vw center;
    background-repeat: no-repeat;
    background-size: auto 90%;
}

nav h1 {
    position: relative;
    font-size: 1.3em;
    line-height: 6vh;
    font-weight: 600;
    color: #FFFFFF;
}

nav h1::before {
    content: "";
    position: absolute;
    left: -2vw;
    top: 20%;
    background-color: #FFF;
    display: block;
    width: 0.2vw;
    height: 60%;

}

/* nav End */
</style>
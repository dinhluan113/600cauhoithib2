<template>
    <div>
        <LessonList />

        <div class="donate" style="display:block;text-align: left">
            <h3 style="margin: 15px 5px 0;">Buy me a coffee (donation)</h3>
            <img src="./assets/Donate_Momo.png" style="width: 320px;max-width: 100%;">
        </div>
    </div>
</template>

<script>
    import LessonList from './components/LessonList.vue'

    export default {
        name: 'App',
        components: {
            LessonList
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        background-color: #f8f8f8;
    }

    a {
        color: #333;
        text-decoration: none;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #fff;
        padding: 10px;
        max-width: 1170px;
        margin: auto;
    }
</style>

<template>
    <div class="site">
        <h1>To-Do list</h1>
        <List></List>
    </div>
</template>
<script>
import List from '../components/List'

export default {
    components: {
        List
    }
}
</script>
<style lang="scss" scoped>
    h1 {
        margin: 60px 0 40px;
    }
</style>
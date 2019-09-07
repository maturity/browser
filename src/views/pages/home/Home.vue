<template>
  <div>
    Home

    <router-link :to="{ name: 'index' }">
      Index
    </router-link>

    <router-link :to="{ name: 'home' }">
      Home
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>

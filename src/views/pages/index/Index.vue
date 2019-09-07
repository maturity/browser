<template>
  <div class="f-page-index">
    {{ $t("index.index") }}

    <router-link :to="{ name: 'login' }">
      login
    </router-link>
    <router-link :to="{ name: 'register' }">
      register
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',

  metaInfo () {
    return { title: this.$t('index.pageTitle') }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="f-layout-auth">
    <Layout>
      <Content class="f-layout-auth-content">
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
